import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent {
  finish:number = 97;
  constructor(private rs:Router){

  }
  audioPath =
  `../../../assets/The Weeknd - Blinding Lights (Official Audio).mp3#t=0.1,${this.finish}`;
  @ViewChild('audio')
  audio!: ElementRef;

ngAfterViewInit(): void {
  Swal.fire({
    icon:'success',
    title: 'Gracias por llegar hasta acá',
    html: 'se cerrará automaticamente',
    timer: 2000,
  })
  let audio = <HTMLAudioElement> document.getElementById('audio');
  if(audio){
    audio.volume = 0.5;
  }
  this.audio.nativeElement.volume= 0.5;
  this.audio.nativeElement.play();
  this.audio.nativeElement.play();

  setTimeout(() => {
    this.goHome();
  }, this.finish*1000);
}

goHome():void{
  this.rs.navigateByUrl("/");
}
}
