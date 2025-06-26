// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Camera ---
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-canvas'),
    alpha: true // Make canvas transparent
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// --- Geometry & Material ---
const geometry = new THREE.IcosahedronGeometry(1.5, 0); // Icosahedron for a "techy" look
const material = new THREE.MeshStandardMaterial({
    color: 0x2ea043, // Same as accent color
    metalness: 0.5,
    roughness: 0.2,
    wireframe: true, // Wireframe gives it a hacker/3D model vibe
});

// --- Mesh ---
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// --- Lights ---
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x58a6ff, 0.3); // Use header color for ambient light
scene.add(ambientLight);

// --- Animation Loop ---
let bounceDirection = 1;
const bounceSpeed = 0.001;
const bounceHeight = 0.5;
const initialY = shape.position.y;

function animate() {
    requestAnimationFrame(animate);

    // Rotation
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.005;

    // Bouncing
    shape.position.y += bounceSpeed * bounceDirection;
    if (shape.position.y > initialY + bounceHeight || shape.position.y < initialY - bounceHeight) {
        bounceDirection *= -1;
    }

    renderer.render(scene, camera);
}

animate();

// --- Handle Window Resize ---
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}); 