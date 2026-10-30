var CHARS = "";
for (var c = 32; c <= 126; c++) { CHARS += String.fromCharCode(c); }
var SIZE = CHARS.length; // 95

// Check every character
function findBadChar(text) {
  for (var i = 0; i < text.length; i++) {
    if (CHARS.indexOf(text[i]) === -1) { return text[i]; }
  }
  return null;
}

// ENCRYPT
function encrypt(text, key) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var textPos = CHARS.indexOf(text[i]);
    var keyPos = CHARS.indexOf(key[i % key.length]);
    var newPos = (textPos + keyPos) % SIZE;
    result += CHARS[newPos];
  }
  return result;
}

// DECRYPT
function decrypt(text, key) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var textPos = CHARS.indexOf(text[i]);
    var keyPos = CHARS.indexOf(key[i % key.length]);
    var newPos = (textPos - keyPos + SIZE) % SIZE;
    result += CHARS[newPos];
  }
  return result;
}

//UI
var inputBox = document.getElementById("input");
var outputBox = document.getElementById("output");
var keyBox = document.getElementById("key");
var msg = document.getElementById("msg");

function show(text, type) { msg.textContent = text; msg.className = type || ""; }
// Check input and key. Returns true if okay.
function validate() {
  var text = inputBox.value.replace(/\r?\n/g, " ");
  var key = keyBox.value;
  if (text === "") { show("Please type some text first.", "err"); return false; }
  if (key === "") { show("Please enter a key.", "err"); return false; }
  var bad = findBadChar(text);
  if (bad !== null) { show("Unsupported character in input: \u201C" + bad + "\u201D", "err"); return false; }
  bad = findBadChar(key);
  if (bad !== null) { show("Unsupported character in key: \u201C" + bad + "\u201D", "err"); return false; }
  return true;
}

function run(mode) {
  outputBox.value = "";
  if (!validate()) { return; }
  var text = inputBox.value.replace(/\r?\n/g, " ");
  var key = keyBox.value;
  if (mode === "enc") {
    outputBox.value = encrypt(text, key);
    show("Encrypted. You can copy the output below.", "ok");
  } else {
    outputBox.value = decrypt(text, key);
    show("Decrypted.", "ok");
  }
}

document.getElementById("enc").onclick = function () { run("enc"); };
document.getElementById("dec").onclick = function () { run("dec"); };
document.getElementById("clear").onclick = function () {
  inputBox.value = "";
  outputBox.value = "";
  show("");
};