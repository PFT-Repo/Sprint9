import { ElementRef, Injectable, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ThreejsService {
  canvas
    : HTMLCanvasElement | undefined;
  renderer!: THREE.WebGLRenderer;
  index: number;
  helper!: THREE.GridHelper;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  light!: THREE.AmbientLight;
  light2!: THREE.DirectionalLight;
  light3!: THREE.SpotLight;
  clock = new THREE.Clock();
  floor!: THREE.Mesh;
  //controles
  controls!: FirstPersonControls;
  //Objetos a renderizar
  sphere = new THREE.PlaneGeometry(80, 50);
  textureFloor = new THREE.Color('#ff0000');
  texture1 = new THREE.TextureLoader().load('../../../assets/img/urbanturpial.png');
  texture2 = new THREE.TextureLoader().load('../../../assets/img/pedidostrie.png');
  texture3 = new THREE.TextureLoader().load('../../../assets/img/Triessy.png');
  materialFloor = new THREE.MeshLambertMaterial({
    color: this.textureFloor,
    side: THREE.DoubleSide,flatShading: true,
  });
  material1 = new THREE.MeshLambertMaterial({
    map: this.texture1,
    side: THREE.DoubleSide,flatShading: true,
  });
  material2 = new THREE.MeshLambertMaterial({
    map: this.texture2,
    side: THREE.DoubleSide,flatShading: true,
  });  
  material3 = new THREE.MeshLambertMaterial({
    map: this.texture3,
    side: THREE.DoubleSide,flatShading: true,
  });
  // material1 = new THREE.MeshPhongMaterial({ map: this.texture1,color:'white', side: THREE.DoubleSide });
  //material2 = new THREE.MeshPhongMaterial({ color: 0xff2200, flatShading: true, shininess: 0, side: THREE.DoubleSide });
  //material3 = new THREE.MeshPhongMaterial({ color: 0x6622aa, flatShading: true, shininess: 0, side: THREE.DoubleSide });
  material4 = new THREE.MeshPhongMaterial({ color: "green", flatShading: true, shininess: 0, side: THREE.DoubleSide });
  material5 = new THREE.MeshPhongMaterial({ color: "grey", flatShading: true, shininess: 0, side: THREE.DoubleSide });

  meshCho: any[] = [];
  private torus!: THREE.Mesh;
  private mesh1!: THREE.Mesh;
  private mesh2!: THREE.Mesh;
  private mesh3!: THREE.Mesh;
  private mesh4!: THREE.Mesh;
  private mesh5!: THREE.Mesh;


  //para animarlo
  frameID: number | any;
  public constructor(private ngZone: NgZone, private alertService: AlertService) {
    this.index = 0;
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>) {
    // this.canvas= canvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas?.nativeElement,
      alpha: false,
      antialias: true
    })

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);


    //crear la escena
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 25, 0);
    this.scene.fog = new THREE.FogExp2('black', 0.0025);
    this.scene.add(this.camera);

    //ambient light
    this.light = new THREE.AmbientLight('white')
    this.light.position.set(0, 0, 0);
    this.scene.add(this.light);


    /*
        this.light3 = new THREE.SpotLight('white')
        this.light3.position.set(23, 0, 0);
        this.light3.intensity = 1;
        this.scene.add(this.light3);
    */


    this.light2 = new THREE.DirectionalLight('warm');
    this.light2.position.set(0, 40, 180).normalize();
    this.scene.add(this.light2);
    //controles orbitales
    this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
    this.controls.lookSpeed = 0.1;
    this.controls.movementSpeed = 20;
    this.controls.autoForward = false;
    this.controls.lookVertical = false;
    //
    this.mesh1 = new THREE.Mesh(this.sphere, this.material1);
    this.mesh1.name = this.mesh1.id.toString();
    this.mesh1.position.set(- 250, 30, 0);
    this.scene.add(this.mesh1);
    this.mesh2 = new THREE.Mesh(this.sphere, this.material2);
    this.mesh2.position.set(250, 30, 0);
    this.scene.add(this.mesh2);
    this.mesh3 = new THREE.Mesh(this.sphere, this.material3);
    this.mesh3.position.set(0, 30, - 250);
    this.scene.add(this.mesh3);
    this.mesh4 = new THREE.Mesh(this.sphere, this.material4);
    this.mesh4.position.set(250, 30, -250);
    this.scene.add(this.mesh4);
    this.mesh5 = new THREE.Mesh(this.sphere, this.material5);
    this.mesh5.position.set(0, 30, 250);
    this.scene.add(this.mesh5);
    this.mesh2.name = this.mesh2.id.toString();
    this.mesh3.name = this.mesh3.id.toString();
    this.mesh4.name = this.mesh4.id.toString();
    this.mesh5.name = this.mesh5.id.toString();
    this.meshCho.push(this.mesh1.name);
    this.meshCho.push(this.mesh2.name);
    this.meshCho.push(this.mesh3.name);
    this.meshCho.push(this.mesh4.name);
    this.meshCho.push(this.mesh5.name);

    //objeto
    let geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    let material = new THREE.MeshBasicMaterial({ color: 'gold' })
    this.torus = new THREE.Mesh(geometry, material);
    this.torus.position.set(0, 300, 0);
    this.scene.add(this.torus)
    // piso
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 100, 100),
      this.materialFloor
    );
    this.floor.rotation.x = - Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    //helper
   /* this.helper = new THREE.GridHelper(1000, 10, 0x444444, 0x444444);
    this.helper.position.y = 0.1;
    this.scene.add(this.helper);
*/
    Array(1000).fill(0).forEach(Element => this.addStars(this.index + 1));

    window.addEventListener('scroll', this.handleScroll);

  }
  handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    this.camera.position.z = scrollPosition * 0.0002;
  }

  public addStars(index: number) {
    let geometry = new THREE.SphereGeometry(0.2);
    let material = new THREE.MeshBasicMaterial({ color: 'white' });
    let star = new THREE.Mesh(geometry, material);
    let positions = createRandomPositions();
    let i: number = index;
    star.position.set(positions[i].x, positions[i].y, positions[i].z);
    if (this.scene != undefined)
      this.scene.add(star);
  }
  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      }
      else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.controls.update(this.clock.getDelta());
    requestAnimationFrame(() => this.render());
    this.mesh1.rotation.y += 0.008;
    this.mesh2.rotation.y += 0.008;
    this.mesh3.rotation.y += 0.008;
    this.mesh4.rotation.y += 0.008;
    this.mesh5.rotation.y += 0.008;


    this.torus.rotation.x += 0.01;
    this.torus.rotation.z += 0.01;
    this.torus.rotation.y += 0.005;
    this.detectCollision();

    this.renderer?.render(this.scene, this.camera);
  }
  public resize(): void {
    this.camera.aspect = (window.innerWidth) / (window.innerHeight);
    this.renderer.setSize((window.innerWidth), (window.innerHeight));
    this.camera.updateProjectionMatrix();

  }
  detectCollision() {
    // Crea un objeto Raycaster
    var raycaster = new THREE.Raycaster();
    var origin = new THREE.Vector3();
    var direction = new THREE.Vector3();

    // Establece la dirección y el origen del rayo
    direction.set(0, 0, -1);
    origin.setFromMatrixPosition(this.camera.matrixWorld);
    raycaster.near = 1;
    raycaster.far = 100;

    raycaster.set(origin, direction);

    // Verifica si el rayo intersecta con algún objeto en la escena
    var intersects = raycaster.intersectObjects(this.scene.children, true);

    // Si se detecta una colisión, muestra un mensaje
    if (intersects.length > 0) {

      let map: any[] = [];
      map[0] = lastVal(intersects);
      let choque = map[0].object.name;


      if (this.meshCho.includes(choque.toString())) {
        let i = this.meshCho.indexOf(choque.toString());
        switch (i) {
          case i = 0:
            this.alertService.openAlertWithButton("Urban Turpial", "https://www.urbanturpial.com")
            break;
          case i = 1:
            this.alertService.openAlertWithButton("Pedidos Trie", "https://triedb-8d243.web.app");
            break;
          case i = 2:
            this.alertService.openAlertWithButton("Triessy Shop", "https://triessy.com");
            break;
          case i = 3:
            this.alertService.openAlertWithButton("Proyecto 4", "https://www.pexels.com");
            break;
          case i = 4:
            this.alertService.openAlertWithButton("Proyecto 5", "https://www.apple.com");
            break;

          default:
            break;
        }
      }

    }
    // Raycasting logic here
    // If a collision is detected, show modal with URL
  }
}

function createRandomPositions(): Array<THREE.Vector3> {
  return Array(3).fill(0).map(() => new THREE.Vector3(THREE.MathUtils.randFloatSpread(800), THREE.MathUtils.randFloatSpread(200), THREE.MathUtils.randFloatSpread(800)));
}
function lastVal(o: object[]) {
  let temp = o[o.length - 1];
  return temp;
}