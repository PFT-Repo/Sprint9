import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent {
  @Input() value: string = '';
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  in!: HTMLInputElement;
  constructor() { }

  ngAfterViewInit(): void {
  }

  generateQRCode(): void {
    this.in = <HTMLInputElement> document.getElementById('genval');
    this.value = this.in.value;
  }
}
