import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

class BasicWorldDemo {
    constructor() {
        this.Initialize();
    }

    Initialize() {
        this.threejs = new THREE.WebGLRenderer({
            antialias: true
        });
        this.threejs.shadowMap.enabled = true;
        this.threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this.threejs.setPixelRatio(window.devicePixelRatio);
        this.threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.threejs.domElement);

        window.addEventListener('resize', () => {
            this.OnWindowResize();
        }, false);

        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(75, 20, 0);

        this.scene = new THREE.Scene();

        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        this.scene.add(light);

        light = new THREE.AmbientLight(0x101010);
        this.scene.add(light);

        const controls = new OrbitControls(
            this.camera, this.threejs.domElement);
        controls.target.set(0, 20, 0);
        controls.update();

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            './resources/posx.jpg',
            './resources/negx.jpg',
            './resources/posy.jpg',
            './resources/negy.jpg',
            './resources/posz.jpg',
            './resources/negz.jpg',
        ]);
        this.scene.background = texture;

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0xF0AFFF,
                transparent: true,
                opacity: 0.1,
              }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this.scene.add(plane);

        // const box = new THREE.Mesh(
        //     new THREE.BoxGeometry(2, 2, 2),
        //     new THREE.MeshStandardMaterial({
        //         color: 0xFFFFFF,
        //     }));
        // box.position.set(0, 1, 0);
        // box.castShadow = true;
        // box.receiveShadow = true;
        // this.scene.add(box);

        // for (let x = -8; x < 8; x++) {
        //     for (let y = -8; y < 8; y++) {
        //         const box = new THREE.Mesh(
        //             new THREE.BoxGeometry(2, 2, 2),
        //             new THREE.MeshStandardMaterial({
        //                 color: 0xF0AFFF,
        //             }));
        //         box.position.set(Math.random() + x * 5, Math.random() * 4.0 + 2.0, Math.random() + y * 5);
        //         box.castShadow = true;
        //         box.receiveShadow = true;
        //         this.scene.add(box);
        //     }
        // }

        // const box = new THREE.Mesh(
        //     new THREE.SphereGeometry(2, 32, 32),
        //     new THREE.MeshStandardMaterial({
        //         color: 0xFFFFFF,
        //         wireframe: true,
        //         wireframeLinewidth: 4,
        //     }));
        // box.position.set(0, 0, 0);
        // box.castShadow = true;
        // box.receiveShadow = true;
        // this.scene.add(box);

        this.RAF();
    }

    OnWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.threejs.setSize(window.innerWidth, window.innerHeight);
    }

    RAF() {
        requestAnimationFrame(() => {
            this.threejs.render(this.scene, this.camera);
            this.RAF();
        });
    }
}

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
_APP = new BasicWorldDemo();
});