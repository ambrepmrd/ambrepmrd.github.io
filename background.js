import * as THREE from 'three';

//scene
const scene = new THREE.Scene()


const radius = 20;
const widthSegments = 6;
const heightSegments = 3;
const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments);
const thresholdAngle = 1;  

const geometry = new THREE.EdgesGeometry(sphereGeometry, thresholdAngle);

function addObject(x, y, obj) {
    obj.position.x = x;
    obj.position.y = y;
   
    scene.add(obj);
}

const material = new THREE.LineBasicMaterial({color: 0x2A2A2A});
const mesh = new THREE.LineSegments(geometry, material);
addObject(-10, 0, mesh);

//taille de camera
const sizes = {
    width: 800,
    height: 600
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 20

scene.add(camera)

//render de la scene par la camera
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

//clock
const  clock = new THREE.Clock()

//animations
const tick = () => {
    //time
    const elapsedTime = clock.getElapsedTime()

    //met à jour la taille de la scène et déplace la caméra pour qu'elle soit bien positionnée
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // //update les objets
    mesh.rotation.x = 0.2 * elapsedTime
    mesh.rotation.y = 0.3 * elapsedTime

    //render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()