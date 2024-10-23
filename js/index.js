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


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("hero-canvas"),
  alpha: true, 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); // Fond transparent

const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32); 
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a9a9b, 
  opacity: 1,
});

const spheres = [];
const speeds = []; 

for (let i = 0; i < 11; i++) {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4
  );
  scene.add(sphere);
  spheres.push(sphere);

  speeds.push({
    x: Math.random() * 0.02 - 0.01, // Vitesse sur l'axe X
    y: Math.random() * 0.02 - 0.01, // Vitesse sur l'axe Y
    z: Math.random() * 0.02 - 0.01, // Vitesse sur l'axe Z
  });
}

const light1 = new THREE.PointLight(0x1a9a9b, 1, 50); // Lumière 1
light1.position.set(0, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x1a9a9b, 0.5, 50); // Lumière 2
light2.position.set(5, 0, 0);
scene.add(light2);

const light3 = new THREE.PointLight(0x1a9a9b, 0.5, 50); // Lumière 3
light3.position.set(-5, 0, 0);
scene.add(light3);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  spheres.forEach((sphere, index) => {
    sphere.position.x += speeds[index].x; // Mouvement sur l'axe X
    sphere.position.y += speeds[index].y * 0.5; // Mouvement limité sur l'axe Y
    sphere.position.z += speeds[index].z * 0.5; // Mouvement limité sur l'axe Z

    if (sphere.position.x > 4 || sphere.position.x < -4)
      speeds[index].x *= -1;
    if (sphere.position.y > 4 || sphere.position.y < -4)
      speeds[index].y *= -1;
    if (sphere.position.z > 4 || sphere.position.z < -4)
      speeds[index].z *= -1;
  });

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();