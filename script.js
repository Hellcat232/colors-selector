const wrap = document.querySelectorAll(".wrap");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    randomColor();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const cheking =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    cheking.classList.toggle("fa-lock-open");
    cheking.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyText(event.target.textContent);
  }
});

function genRandomColor() {
  const hexColor = "0123456789ABCDEF";
  let incomeColors = "";
  for (let i = 0; i < 6; i++) {
    incomeColors += hexColor[Math.floor(Math.random() * hexColor.length)];
  }

  return "#" + incomeColors;
}

function copyText(text) {
  return navigator.clipboard.writeText(text);
}

function randomColor(initial) {
  const colors = initial ? getColHash() : [];
  wrap.forEach((wp, idx) => {
    const locked = wp.querySelector("i").classList.contains("fa-lock");
    const text = wp.querySelector("h2");
    const button = wp.querySelector("button");

    if (locked) {
      colors.push(text.textContent);
      return;
    }

    const color = initial
      ? colors[idx]
        ? colors[idx]
        : chroma.random()
      : chroma.random();

    if (!initial) {
      colors.push(color);
    }

    text.textContent = color;
    wp.style.backgroundColor = color;

    textColor(text, color);
    textColor(button, color);
  });

  updLocHash(colors);
}

function textColor(text, color) {
  const lum = chroma(color).luminance();

  text.style.color = lum > 0.5 ? "black" : "white";
}

function updLocHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

randomColor(true);
