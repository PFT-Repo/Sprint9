import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { auto } from '@popperjs/core';
import jsQR from 'jsqr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrReaderComponent implements OnInit {

  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('loadingMessage') loadingMessage!:ElementRef<HTMLBodyElement>;
  @ViewChild('output') outputContainer!: ElementRef<HTMLElement>;
  @ViewChild('outputMessage') outputMessage!: ElementRef<HTMLElement>;
  @ViewChild('outputData') outputData!: ElementRef<HTMLElement>;

  private video!: HTMLVideoElement;
  private canvas!: CanvasRenderingContext2D;
  isLoggedIn: boolean = false;
  CanvaReady: boolean = false;
  OutputReady:boolean = false;

  constructor() { 
    if (this.hasGetUserMedia()) {
     
  } else {
      Swal.fire('getUserMedia() is not supported in your browser');
  }
  }

  ngOnInit(): void {
      this.video = <HTMLVideoElement> document.createElement('video');
      navigator.mediaDevices
        .getUserMedia({ video:{ facingMode: "environment" } })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.height=500;
          this.video.width= 500;
          this.video.setAttribute("playsinline", "true");
          this.video.play();
          requestAnimationFrame(() => this.tick());
        });
  }

  private drawBox(
    begin: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number },
    d: { x: number; y: number },
    color: string
  ) {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(b.x, b.y);
    this.canvas.lineTo(c.x, c.y);
    this.canvas.lineTo(d.x, d.y);
    this.canvas.lineTo(begin.x, begin.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }

  private tick() {
    this.isLoggedIn = false;
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.isLoggedIn = true;
      this.CanvaReady = true
      this.OutputReady = true;
      this.canvas?.drawImage(this.video, 0, 0, 500, 500);
      const imageData = this.canvas?.getImageData(
        0,
        0,
       500,
        500
      );
      if(imageData){
        const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        this.drawBox(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        this.outputMessage.nativeElement.hidden = true;
        this.outputData.nativeElement.parentElement!.hidden = false;
        this.outputData.nativeElement.innerText = code.data;
      } else {
        this.outputMessage.nativeElement.hidden = false;
        this.outputData.nativeElement.parentElement!.hidden = true;
      }
      }
      
    }
    requestAnimationFrame(() => this.tick());
  }
  hasGetUserMedia() {
    return !!(window.navigator.mediaDevices.getUserMedia);
}

}
