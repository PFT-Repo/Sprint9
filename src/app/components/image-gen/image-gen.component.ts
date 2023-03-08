import { Component } from '@angular/core';
import { ImageGenService } from 'src/app/services/image-gen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-gen',
  templateUrl: './image-gen.component.html',
  styleUrls: ['./image-gen.component.scss']
})
export class ImageGenComponent {
  images:any[]=[];
  loader:boolean = false;
  imageUrl: any='';

  constructor(private imageGenService: ImageGenService) { }

  ngOnInit() {
  }

  generateImage() {
    this.loader = true;
    let prompt =<HTMLInputElement> document.getElementById('imputPrompt');
    if(prompt && prompt.value != ''){

      this.imageGenService.generateImage(prompt?.value, 'image-alpha-001')
      .then(response => {
        this.images = response.data;
        this.loader=false
      });
      Swal.fire({
        title: 'Petición enviada',
        text: 'Espere unos segundos mientras creamos las imagenes',
        timer: 3000,
        icon: 'success'
      })
    }
    else{
      Swal.fire({
        title: 'Error Error',
        text: 'Escriba algo en el prompt',
        timer: 3000,
        icon: 'error'
      })
    }
  }
}
