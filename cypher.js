let chars = "";
for (let i = 32; i <= 126; i++) {
  chars += String.fromCharCode(i);
}
const SIZE = chars.length;

// Check every character
function findBadChar(text) {
  for (let i = 0; i < text.length; i++) {
    if (chars.indexOf(text[i]) === -1) { 
      return text[i]; 
    }
  }
  return null;
}

// ENCRYPT
function encrypt(text, key) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const textPos = chars.indexOf(text[i]);
    const newPos = (textPos + key) % SIZE;

    result += chars[newPos];
  }
  return result;
}

// DECRYPT
function decrypt(text, key) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const textPos = chars.indexOf(text[i]);
    const newPos = (textPos - key + SIZE) % SIZE;

    result += chars[newPos];
  }
  return result;
}

//UI
const inputBox = document.getElementById("input");
const outputBox = document.getElementById("result");
const keyBox = document.getElementById("key");
const msg = document.getElementById("msg");

function show(text, type) { 
  msg.textContent = text;
  msg.className = type || ""; 
}

// Check input and key. Returns true if okay.
function validate() {
  const text = inputBox.value.replace(/\r?\n/g, " ");
  const key = keyBox.value.trim();

  if (text === "") { 
    show("Please type some text to encrpyt or decrypt.", "error");
    return false;
  }

  if (key === "") { 
    show("Please enter a key.", "error");
    return false;
  }

  const shift = Number(key);
  if (!Number.isInteger(shift) || shift < 0 || shift >= SIZE) {
    show("Key must be a whole number between 0 to 94.", "error");
    return false;
  }

  const bad = findBadChar(text);
  if (bad !== null) { 
    show(`The character "${bad}" is not supportted.`, "error");
    return false;
  }

  return true;
}

function run(mode) {
  outputBox.value = "";
  if (!validate()) { 
    return; 
  }

  const text = inputBox.value.replace(/\r?\n/g, " ");
  const key = Number(keyBox.value.trim());

  if (mode === "enc") {
    outputBox.value = encrypt(text, key);
    show("Encrypted. You can copy the output below.", "ok");
  } else {
    outputBox.value = decrypt(text, key);
    show("Decrypted.", "ok");
  }
}

document.getElementById("enc").onclick = function () { 
  run("enc");
};
document.getElementById("dec").onclick = function () {
  run("dec");
};
document.getElementById("clear").onclick = function () {
  inputBox.value = "";
  outputBox.value = "";
  show("");
};