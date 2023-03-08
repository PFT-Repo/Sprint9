import { Component, Input } from '@angular/core';
import { ImageGenService } from 'src/app/services/image-gen.service';

@Component({
  selector: 'app-image-cards',
  templateUrl: './image-cards.component.html',
  styleUrls: ['./image-cards.component.scss']
})
export class ImageCardsComponent {
 @Input() images:any ;
constructor(public imagens:ImageGenService){
}
}
