const animateOnScrollElements =
document.querySelectorAll(".animate-on-scroll");

const animateElements = () => {
animateOnScrollElements.forEach((element) => {
  const elementPosition = element.getBoundingClientRect().top;
  const viewportHeight = window.innerHeight;

  if (elementPosition < viewportHeight - 100) {
    gsap.to(element, { opacity: 1, y: 0, duration: 1 });
  }
});
};


window.addEventListener("load", animateElements);
window.addEventListener("scroll", animateElements);
