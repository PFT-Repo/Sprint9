import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ThreejsService } from 'src/app/services/threejs.service';
import * as THREE from 'three';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements AfterViewInit {
  
  private renderer: THREE.WebGLRenderer|null= new THREE.WebGLRenderer;
  private scene:any| THREE.Scene = new THREE.Scene;
  private camera:any| THREE.PerspectiveCamera = new THREE.PerspectiveCamera;
  private torus!:any|THREE.Mesh;
  @ViewChild('bg')
  mapCanvasRef!: ElementRef;
constructor( private threeServ:ThreejsService, private rs:Router){
}

ngAfterViewInit(): void {
  this.threeServ.createScene(this.mapCanvasRef);
  this.threeServ.animate();
  /*
this.scene = new THREE.Scene();
this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
console.log(this.mapCanvasRef);
  this.renderer = new THREE.WebGLRenderer({
    
    canvas: this.mapCanvasRef.nativeElement ,
  })
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(window.innerWidth,window.innerHeight);
  this.camera.position.setZ(30);
  let geometry = new THREE.TorusGeometry(10,3,16,100);
  let material = new THREE.MeshBasicMaterial({color: 0xFF6347})
  let torus = new THREE.Mesh(geometry,material);
  this.scene.add(torus)
  this.animate(torus);

}
animate(torus:THREE.Mesh){
  requestAnimationFrame(()=>this.animate);
  torus.rotation.x += 0.01;
  torus.rotation.z += 0.01;
  torus.rotation.y += 0.005;

this.renderer?.render(this.scene,this.camera); */
}
goHome():void{
  this.rs.navigateByUrl("/home");
}
}