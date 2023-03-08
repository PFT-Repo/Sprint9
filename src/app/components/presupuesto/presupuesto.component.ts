import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnChanges {
  currency : number = 0;
  numPag:number = 1;
  in: number = 0;
  constructor(private ativatedRoute:ActivatedRoute , public total:PresupuestoService) {
}
ngOnChanges(changes: SimpleChanges): void {
 this.formIsValid();
}
  sumaPag() {
    this.numPag += 1;
    this.sendPrices(4, this.numPag);
  }
  restaPag() {
    this.numPag -= 1; 
    this.sendPrices(4, this.numPag);
    if (this.numPag < 1) { this.numPag = 1 
      this.sendPrices(4, 1);}
  }
  detectValueChange(newValue: number): void {
    this.formIsValid();
    if (this.total.plata[4] !== newValue) {
      this.sendPrices(4,newValue); 
      console.log(`Value changed from ${this.total.plata[4]} to ${newValue}.`);

    } else {
      console.log(`Value did not change. Current value is ${this.total.plata[4]}.`);
    }
  }
  pagesLogic(){
    let checkbox = document.getElementById('numPages') as HTMLInputElement | null;
    if(checkbox){
    this.formIsValid();
    this.detectValueChange(checkbox?.valueAsNumber);
    this.total.getTotal();
    }
  }

  checker(id: string) {
    let checkbox = document.getElementById(id) as HTMLInputElement | null;
    if (checkbox) {
      if (id == "hasEcommerce") {
        this.in = 0;
      }
      if (id == "hasBlog") {
        this.in = 1;
      }
      if (id == "hasCMS") {
        this.in = 2;
      }
      let valor = parseInt(checkbox.value);
      if (checkbox?.checked) {
        this.sendPrices(this.in,valor); 
      } else {
        this.pagesLogic();
       this.sendPrices(this.in, 0);
       this.formIsValid();
      }
    }
  }
  sendPrices(index: number, number: number) {
    this.total.addPrice(index, number);
  }
  
  formIsValid():boolean{
    let numPages = <HTMLInputElement> document.getElementById('numPages');
    if( numPages.value > '0'){
      return true;
    }
    else{
      this.sendPrices(4,1);
    }
    return false;
  }


}
