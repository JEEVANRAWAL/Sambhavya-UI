const TOTAL = 8; // question slides 0–7
const INFO_SLIDE = 8; // contact info slide
let current = 0;
let selections = new Array(TOTAL).fill(null);

// Build dots (one per question slide only)
const dotsEl = document.getElementById("fh-dots");
for (let i = 0; i < TOTAL; i++) {
  const d = document.createElement("div");
  d.className = "fh-dot" + (i === 0 ? " active" : "");
  d.id = "dot-" + i;
  dotsEl.appendChild(d);
}

function selectOption(el, slide) {
  el.parentElement
    .querySelectorAll(".fh-option")
    .forEach((o) => o.classList.remove("selected"));
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

function validateInfo() {
  const fname = document.getElementById("field-fname");
  const lname = document.getElementById("field-lname");
  const email = document.getElementById("field-email");
  const phone = document.getElementById("field-phone");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  const phoneOk = phone.value.trim().length >= 6;
  const allOk = fname.value.trim() && lname.value.trim() && emailOk && phoneOk;
  document.getElementById("btn-next").disabled = !allOk;
}

function submitInfo() {
  // Mark errors on empty required fields
  const fname = document.getElementById("field-fname");
  const lname = document.getElementById("field-lname");
  const email = document.getElementById("field-email");
  const phone = document.getElementById("field-phone");
  [fname, lname].forEach((f) => f.classList.toggle("error", !f.value.trim()));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  email.classList.toggle("error", !emailOk);
  phone.classList.toggle("error", phone.value.trim().length < 6);
  if (
    !fname.value.trim() ||
    !lname.value.trim() ||
    !emailOk ||
    phone.value.trim().length < 6
  )
    return;

  // Show completion
  document.getElementById("user-first-name").textContent = fname.value.trim();
  document.getElementById("slide-8").className = "fh-slide";
  document.getElementById("slide-final").className = "fh-slide active";
  document.getElementById("fh-nav").style.display = "none";
  document.getElementById("fh-prog-label").textContent = "Complete!";
  document.getElementById("fh-prog-fill").style.width = "100%";
}

function updateUI() {
  const isInfo = current === INFO_SLIDE;
  const isComplete = current > INFO_SLIDE;

  // Progress bar: question slides fill 0–100%, info slide stays at 100%
  const pct = isInfo || isComplete ? 100 : ((current + 1) / TOTAL) * 100;
  document.getElementById("fh-prog-label").textContent = isComplete
    ? "Complete!"
    : isInfo
      ? "Almost there!"
      : "Question " + (current + 1) + " of " + TOTAL;
  document.getElementById("fh-prog-fill").style.width = pct + "%";

  // Dots
  for (let i = 0; i < TOTAL; i++) {
    const d = document.getElementById("dot-" + i);
    if (d) d.className = "fh-dot" + (i === current ? " active" : "");
  }

  const nav = document.getElementById("fh-nav");
  if (isComplete) {
    nav.style.display = "none";
    return;
  }
  nav.style.display = "flex";

  document.getElementById("btn-back").disabled = current === 0;

  const nextBtn = document.getElementById("btn-next");

  if (isInfo) {
    // On info slide swap Continue → Submit & hook to submitInfo
    nextBtn.textContent = "Submit →";
    nextBtn.onclick = submitInfo;
    validateInfo(); // set disabled state based on current field values
  } else {
    nextBtn.textContent = "Continue →";
    nextBtn.onclick = goNext;
    const isMulti = current === 3 || current === 5;
    if (isMulti) {
      const slide = document.getElementById("slide-" + current);
      const any = slide && slide.querySelector(".fh-option-multi.selected");
      nextBtn.disabled = !any;
    } else {
      nextBtn.disabled = selections[current] === null;
    }
  }
}

function goNext() {
  const curEl = document.getElementById("slide-" + current);
  if (curEl) curEl.className = "fh-slide";
  current++;
  const nextEl = document.getElementById("slide-" + current);
  if (nextEl) nextEl.className = "fh-slide active";
  updateUI();
}

function goBack() {
  if (current === 0) return;
  const curEl = document.getElementById("slide-" + current);
  if (curEl) curEl.className = "fh-slide";
  current--;
  const prev = document.getElementById("slide-" + current);
  if (prev) prev.className = "fh-slide back active";
  updateUI();
}

function restart() {
  document.getElementById("slide-final").className = "fh-slide";
  selections = new Array(TOTAL).fill(null);
  current = 0;
  document
    .querySelectorAll(".fh-option, .fh-option-multi")
    .forEach((o) => o.classList.remove("selected"));
  // Clear form
  [
    "field-fname",
    "field-lname",
    "field-email",
    "field-phone",
    "field-address",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = "";
      el.classList.remove("error");
    }
  });
  document.getElementById("slide-0").className = "fh-slide active";
  document.getElementById("fh-nav").style.display = "flex";
  updateUI();
}

updateUI();
