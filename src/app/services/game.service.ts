// game.service.ts
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: FirstPersonControls;
  private floor!: THREE.Mesh;

  constructor() {}

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new FirstPersonControls(this.camera);
    this.controls.movementSpeed = 10;
    this.controls.lookSpeed = 0.1;

    this.floor = new THREE.Mesh(
      new THREE.BufferGeometry(),
      new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
    );
    this.floor.rotation.x = - Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    this.camera.position.set(0, 1, 0);
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls;
    this.renderer.render(this.scene, this.camera);
  }

  detectCollision() {
    // Crea un objeto Raycaster
var raycaster = new THREE.Raycaster();
var origin = new THREE.Vector3();
var direction = new THREE.Vector3();

// Establece la dirección y el origen del rayo
direction.set( 0, 0, -1 );
origin.setFromMatrixPosition( this.camera.matrixWorld );
raycaster.set( origin, direction );

// Verifica si el rayo intersecta con algún objeto en la escena
var intersects = raycaster.intersectObjects( this.scene.children, true );

// Si se detecta una colisión, muestra un mensaje
if ( intersects.length > 0 ) {
  console.log( "Colisión detectada" );
}
    // Raycasting logic here
    // If a collision is detected, show modal with URL
  }
}

