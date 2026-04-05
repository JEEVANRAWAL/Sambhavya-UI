const TOTAL = 8;
let current = 0;
let selections = new Array(TOTAL).fill(null);
let goingBack = false;

const dots = document.getElementById("fh-dots");
for (let i = 0; i < TOTAL; i++) {
  const d = document.createElement("div");
  d.className = "fh-dot" + (i === 0 ? " active" : "");
  d.id = "dot-" + i;
  dots.appendChild(d);
}

function select(el, slide) {
  const opts = el.parentElement.querySelectorAll(".fh-option");
  opts.forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");
  selections[slide] = el.textContent.trim();
  document.getElementById("btn-next").disabled = false;
}

function toggleMulti(el, slide) {
  el.classList.toggle("selected");
  const anySelected = el.parentElement.querySelector(
    ".fh-option-multi.selected",
  );
  document.getElementById("btn-next").disabled = !anySelected;
  selections[slide] = anySelected ? "selected" : null;
}

function updateUI() {
  document.getElementById("fh-prog-label").textContent =
    current < TOTAL
      ? "Question " + (current + 1) + " of " + TOTAL
      : "Complete!";
  const pct = ((current + 1) / TOTAL) * 100;
  document.getElementById("fh-prog-fill").style.width =
    Math.min(pct, 100) + "%";

  for (let i = 0; i < TOTAL; i++) {
    const d = document.getElementById("dot-" + i);
    if (d) d.className = "fh-dot" + (i === current ? " active" : "");
  }

  const backBtn = document.getElementById("btn-back");
  const nextBtn = document.getElementById("btn-next");
  const nav = document.getElementById("fh-nav");

  if (current >= TOTAL) {
    nav.style.display = "none";
    return;
  } else {
    nav.style.display = "flex";
  }

  backBtn.disabled = current === 0;
  const isMulti = current === 3 || current === 5;
  if (isMulti) {
    const slide = document.getElementById("slide-" + current);
    const anySelected =
      slide && slide.querySelector(".fh-option-multi.selected");
    nextBtn.disabled = !anySelected;
  } else {
    nextBtn.disabled = selections[current] === null;
  }
}

function goNext() {
  const nextSlide = current + 1;
  const cur = document.getElementById("slide-" + current);
  cur.className = "fh-slide";

  if (nextSlide >= TOTAL) {
    current = TOTAL;
    const fin = document.getElementById("slide-final");
    fin.className = "fh-slide active";
    updateUI();
    return;
  }

  current = nextSlide;
  const next = document.getElementById("slide-" + current);
  next.className = "fh-slide active";
  updateUI();
}

function goBack() {
  if (current === 0) return;
  const cur =
    current >= TOTAL
      ? document.getElementById("slide-final")
      : document.getElementById("slide-" + current);
  cur.className = "fh-slide";

  current--;
  const prev = document.getElementById("slide-" + current);
  prev.className = "fh-slide back active";
  updateUI();
}

function restart() {
  const fin = document.getElementById("slide-final");
  fin.className = "fh-slide";
  selections = new Array(TOTAL).fill(null);
  current = 0;
  document
    .querySelectorAll(".fh-option, .fh-option-multi")
    .forEach((o) => o.classList.remove("selected"));
  const first = document.getElementById("slide-0");
  first.className = "fh-slide active";
  document.getElementById("fh-nav").style.display = "flex";
  updateUI();
}

updateUI();
