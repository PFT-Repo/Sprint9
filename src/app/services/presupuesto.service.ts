import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  total:number = 0;
  plata:any[]=[0,0,0,15,1]
  langUpdated = new EventEmitter();
  constructor() {
    console.log(this.plata);
    this.getTotal();
   }
  addPrice(index: number, number: number):void {
    this.plata.splice(index, 1, number);
    this.getTotal();
  }
  getTotal(){
    let upd = this.plata.slice(0, 3);
    console.log(upd);
    
    this.total = upd.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    for (let index = 0; index < this.plata.length; index++) {
      console.log('in: '+ index + ' contiene: '+this.plata[index]);
    }
    
    this.total= this.total +( this.plata[3] * this.plata[4] );
    console.log(this.total);
    

  }
}
