import { ElementRef, Injectable,NgZone, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { getDatabase, ref, child, push, update, Database,set, get, onValue, remove } from "firebase/database";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { randInt } from 'three/src/math/MathUtils';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService implements OnDestroy {
  auth;
  user: any;
  uid:any;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  objects: THREE.Mesh[] = [];
  database!: Database;
  light!: THREE.AmbientLight;
  light2!: THREE.DirectionalLight;
  clock = new THREE.Clock();
  controls: any;
  helper!: THREE.GridHelper;
  p:THREE.Mesh <THREE.BufferGeometry, THREE.Material | THREE.Material[]>[]=[];
  constructor(private ngZone: NgZone) {
    const firebaseConfig = {
      // Configurar tu proyecto de Firebase aquí
      apiKey: "AIzaSyBHUFHHSPjkz54k3BljD_0talj8MEj7fyQ",
      authDomain: "portafolioturpial.firebaseapp.com",
      databaseURL: "https://portafolioturpial-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "portafolioturpial",
      storageBucket: "portafolioturpial.appspot.com",
      messagingSenderId: "116113088600",
      appId: "1:116113088600:web:48cf8aa8f33ee5f59b2a2d",
      measurementId: "G-FCZZSM2Y02"
    };
    firebase.initializeApp(firebaseConfig);
    this.auth= getAuth();
    signInAnonymously(this.auth)
  .then(() => {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user= user;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
        // ...
        this.setCamera(this.uid);
      } else {
        // User is signed out
        remove(ref(this.database,`objects/${this.uid}`));
      }
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
    this.database = getDatabase()
    console.log(this.database);
  }
  ngOnDestroy(): void {
  () => {
    remove(ref(this.database,`objects/${this.uid}`));
   }
  }
  public createScene(canvas: ElementRef<HTMLCanvasElement>) {
    // this.canvas= canvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas?.nativeElement,
      alpha: true,
      antialias: true
    })

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);


    //crear la escena
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
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


    this.light2 = new THREE.DirectionalLight('red');
    this.light2.position.set(0, 40, 180).normalize();
    this.scene.add(this.light2);
    //controles orbitales
    this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
    this.controls.lookSpeed = 0.1;
    this.controls.movementSpeed = 20;
    this.controls.autoForward = false;
    this.controls.lookVertical = true;
   

    //helper
    this.helper = new THREE.GridHelper(1000, 10, 0x444444, 0x444444);
    this.helper.position.y = 0.1;
    this.scene.add(this.helper);


  }
  public initScene(canvas: ElementRef<HTMLCanvasElement>) {

    let ambient = new THREE.AmbientLight();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = randInt(1,40);
    this.camera.position.y=1;
    this.camera.position.z = 0;
    this.listenForUpdates();
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas?.nativeElement,
      alpha: true,
      antialias: false
    });
    this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
    this.controls.lookSpeed = 0.1;
    this.controls.movementSpeed = 5;
    this.controls.fly = false;
    this.controls.enabled= true
    this.controls.autoForward = false;
    this.controls.lookVertical = false;
    
   
     //helper
     this.helper = new THREE.GridHelper(1000,1000, 0x444444, 0x444444);
     this.helper.position.y = -0.1;
     this.scene.add(this.helper);
 
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene.add(ambient);
  }
  generateKey(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  setCamera(uid: any){
    if(this.uid != undefined){
      let p = this.uid;
      set(ref(this.database, 'objects/'+p), {
        uuid: p,
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z
      });
    }
  }
  private createObject(x: number, y: number, z: number) {
    const geometry = new THREE.CylinderGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: this.obtenerColorAleatorio() });
    const object = new THREE.Mesh(geometry, material);

    object.position.set(x, y, z);

    this.objects.push(object);
    if (this.scene != undefined)
    this.scene.add(object);
    return object;
  }
  obtenerColorAleatorio(): string {
    // Genera un número aleatorio entre 0 y 16777215 (hexadecimal FFFFFF)
    const color = Math.floor(Math.random() * 16777215).toString(16);
    // Completa el color con ceros a la izquierda si es necesario
    const colorCompleto = '#' + ('000000' + color).slice(-6);
    // Devuelve el color en formato de cadena (string)
    return colorCompleto;
  }
  private listenForUpdates() {
    return onValue(ref(this.database, '/objects'), (snapshot) => {
      const positions = snapshot.val();
      if (!positions) return console.error('404');
      ;

      // Eliminar los objetos que no estén en el array de posiciones
      this.objects = this.objects.filter(object =>positions.hasOwnProperty(object.uuid));      

      // Actualizar las posiciones de los objetos existentes y agregar nuevos objetos
      Object.keys(positions).forEach(uuid => {
        const position = positions[uuid];
        console.log(position);
        
        let object = this.objects.find(object => object.uuid === uuid);
        let t= this.objects.find(object => object.uuid === this.uid);
        if(t){
          this.updateMyObjectPosition(t,this.camera);
        }
        this.p.push(t? t:t!);
        console.log(object?.uuid);
        console.log(uuid);
        
        

        if (!object) {
          console.log('intenta crear a ' + object);
          object = this.createObject(position.x, 1, position.z);
          object.uuid = uuid;
        } else {
          object.uuid = uuid;
          object.position.set(position.x, 1, position.z);
        }
      });
    }, {
      onlyOnce: false
    });


   /* this.database.ref('/objects').on('value', (snapshot: { val: () => any; }) => {
      const positions = snapshot.val();
      if (!positions) return;

      // Eliminar los objetos que no estén en el array de posiciones
      this.objects = this.objects.filter(object => positions.hasOwnProperty(object.uuid));

      // Actualizar las posiciones de los objetos existentes y agregar nuevos objetos
      Object.keys(positions).forEach(uuid => {
        const position = positions[uuid];
        let object = this.objects.find(object => object.uuid === uuid);

        if (!object) {
          object = this.createObject(position.x, position.y, position.z);
          object.uuid = uuid;
        } else {
          object.position.set(position.x, position.y, position.z);
        }
      });
    });*/
  }
  private updateMyObjectPosition(object: THREE.Mesh,camera:THREE.Camera) {
    console.log(object);
    
    console.log('Me haré update a:'+object.uuid+'con los datos de '+ camera);
    
    const postData = {
      uuid: object.uuid,
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
  
    const updates:any = {};
    updates["objects/"+object.uuid] = postData
  
    update(ref(this.database), updates);
   /* this.database.ref(`/objects/${object.uuid}`).set({
      x: object.position.x,
      y: object.position.y,
      z: object.position.z
    });*/
  }
  private updateObjectPosition(object: THREE.Mesh) {
    console.log(object);
    
    console.log('Haré update a:'+object.uuid);
    
    const postData = {
      uuid: object.uuid,
      x: object.position.x,
      y: object.position.y,
      z: object.position.z
    };
  
    const updates:any = {};
    updates["objects/"+object.uuid] = postData
  
    update(ref(this.database), updates);
   /* this.database.ref(`/objects/${object.uuid}`).set({
      x: object.position.x,
      y: object.position.y,
      z: object.position.z
    });*/
  }
  private updateObjects(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/objects/')).then((snapshot) => {
      if (snapshot.exists()) {
       this.objects = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }
  public render2(): void {
    this.controls.update(this.clock.getDelta());
    requestAnimationFrame(() => this.render2());
    this.renderer?.render(this.scene, this.camera);
  }
  /*
  getObject(uid:string){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/objects/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });


    return onValue(ref(this.database, '/objects'), (snapshot) => {
      const positions = snapshot.val();
      if (!positions) return console.error('404');
      // Actualizar las posiciones de los objetos existentes y agregar nuevos objetos
      Object.keys(positions).forEach(uuid => {
        const position = positions[uuid];
        console.log(position);
        
        let object = this.objects.find(object => object.uuid === this.uid);
        console.log(object?.uuid);
        console.log(uuid);

  }
}
}*/
  render() {
    requestAnimationFrame(() => this.render());
    console.log( this.camera.position);
    let t= this.objects.find(object => object.uuid === this.uid);
    if(t){
      this.updateMyObjectPosition(t,this.camera);
    }
    this.objects.forEach(object => {
      this.updateObjectPosition(object);
    });
    console.log(this.objects);
    
    this.controls.update(this.clock.getDelta());
    setTimeout(() => {
      this.renderer.render(this.scene, this.camera);
    }, 1000);
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

  public resize(): void {
    this.camera.aspect = (window.innerWidth) / (window.innerHeight);
    this.renderer.setSize((window.innerWidth), (window.innerHeight));
    this.camera.updateProjectionMatrix();

  }
}
