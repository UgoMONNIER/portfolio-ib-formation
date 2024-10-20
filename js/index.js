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




const projetsLink = document.getElementById("projetsDropdown");
const togglerIcon = document.querySelector(".navbar-collapse");
const dropdownMenu = document.querySelector(".dropdown-menu");

togglerIcon.addEventListener("click", function (event) {
  const isOpen = togglerIcon.classList.contains("show");
  console.log(isOpen);
});

projetsLink.addEventListener("click", function (event) {
  event.preventDefault();

  const isOpen = dropdownMenu.classList.contains("show");

  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.classList.remove("show");
  });

  if (!isOpen) {
    dropdownMenu.classList.add("show");
  } else {
    window.location.href = "./projets/index.html";
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-item")) {
    dropdownMenu.classList.remove("show");
  }
});

window.addEventListener("scroll", animateElements);
window.addEventListener("load", animateElements);
