import * as THREE from 'three';

// Basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl-canvas'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xE8C547, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xEAEAEB, 0.5);
pointLight.position.set(-5, -5, 5);
scene.add(pointLight);

// The Oracle Core
const coreGroup = new THREE.Group();
const material = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 0.5
});

const ring1 = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
const ring2 = new THREE.TorusGeometry(1.8, 0.05, 16, 100);
const ring3 = new THREE.TorusGeometry(2.1, 0.05, 16, 100);

const mesh1 = new THREE.Mesh(ring1, material);
const mesh2 = new THREE.Mesh(ring2, material);
const mesh3 = new THREE.Mesh(ring3, material);

mesh1.rotation.x = Math.PI / 2;
mesh2.rotation.y = Math.PI / 3;
mesh3.rotation.x = -Math.PI / 4;

coreGroup.add(mesh1, mesh2, mesh3);

const sphereGeom = new THREE.SphereGeometry(0.8, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xE8C547,
    metalness: 0.5,
    roughness: 0.1,
    emissive: 0xE8C547,
    emissiveIntensity: 0.1
});
const centerSphere = new THREE.Mesh(sphereGeom, sphereMat);
coreGroup.add(centerSphere);

scene.add(coreGroup);

// Mouse tracking
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Slow base rotation
    coreGroup.rotation.y = elapsedTime * 0.1;
    coreGroup.rotation.x = elapsedTime * 0.05;

    // Mouse follow
    const targetX = mouse.x * 0.2;
    const targetY = mouse.y * 0.2;
    coreGroup.rotation.y += (targetX - coreGroup.rotation.y) * 0.05;
    coreGroup.rotation.x += (targetY - coreGroup.rotation.x) * 0.05;

    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// GSAP Scroll Integration
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5
    }
});

tl.to(mesh1.rotation, { x: Math.PI * 2, y: Math.PI * 1.5, ease: 'none' }, 0);
tl.to(mesh2.rotation, { y: -Math.PI * 2.5, x: Math.PI, ease: 'none' }, 0);
tl.to(mesh3.rotation, { z: Math.PI * 2, x: -Math.PI * 2, ease: 'none' }, 0);
tl.to(centerSphere.rotation, { y: Math.PI * 3, ease: 'none' }, 0);
