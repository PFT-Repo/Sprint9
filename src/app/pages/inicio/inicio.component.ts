import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/services/routing.service';
import {data} from '../../../public/data';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  items:any[]=[]
  constructor(private router:Router, private rs:RoutingService){}
ngOnInit(): void {
  this.rs.url = this.router.url;
  this.items= data

}
goPlay():void{
  this.router.navigate(['/playground']);
}
goCalc(){
  this.router.navigate(['/calculadora']);
}
}
