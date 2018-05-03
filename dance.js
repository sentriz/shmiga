function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var renderer,
    scene,
    camera,
    mesh,
    myCanvas = document.getElementById('dance'),
    cassies = [],
    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialias: true,
        alpha: true
    });
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 100;
scene.add(camera);
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);
var material = new THREE.MeshNormalMaterial({
    wireframe: true,
    wireframeLinewidth: 6,
    transparent: false,
    opacity: 1,
});
var loader = new THREE.JSONLoader();
loader.load('https://res.cloudinary.com/dilgjzsjl/raw/upload/v1513016147/cassietutorial_ipuvym.json', handle_load);
function handle_load(geometry, materials) {
    for (var i = 0; i < 100; i++) {
        var material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = getRandomArbitrary(-40, 50);
        mesh.position.y = getRandomArbitrary(-30, 30);
        mesh.position.z = getRandomArbitrary(-100, 0);
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        scene.add(mesh);
        cassies.push(mesh);
    }
}
render();
function render() {
    camera.position.z = Math.sin(Date.now() * 0.0001) * 35;
    camera.position.x = Math.sin(Date.now() * 0.0006) * 3;
    camera.position.y = Math.sin(Date.now() * 0.0006) * 5;
    for (var i = 0; i < cassies.length; i++) {
        cassies[i].rotation.x += (0.5 / 300 * Math.PI);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
