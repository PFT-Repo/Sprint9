import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MultiplayerService } from 'src/app/services/multiplayer.service';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent implements AfterViewInit {
  
  constructor(private threeJsService: MultiplayerService) {
  }
  @ViewChild('bg')
  mapCanvasRef!: ElementRef;
   ngAfterViewInit(): void {
    this.threeJsService.initScene(this.mapCanvasRef);
    this.threeJsService.animate() 
  }
}
