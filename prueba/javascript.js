const productSection = document.querySelector(".product-section");
let isDragging = false;
let currentX;
let initialX;
let xOffset = 0;

productSection.addEventListener("mousedown", dragStart);
productSection.addEventListener("mouseup", dragEnd);
productSection.addEventListener("mouseleave", dragEnd);
productSection.addEventListener("mousemove", drag);

function dragStart(e) {
  initialX = e.clientX;
  isDragging = true;
}

function dragEnd(e) {
  isDragging = false;
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  currentX = e.clientX;
  xOffset = currentX - initialX;
  productSection.scrollLeft = productSection.scrollLeft - xOffset;
  initialX = currentX;
}
