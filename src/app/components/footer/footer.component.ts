import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
constructor(){

}
enviarWhatsApp(){
  let input =<HTMLInputElement> document.getElementById('newsletter1');
  if(input){
    let message = input.value;
    console.log(message);
    
    if(message != ''){
       let text = 'https://wa.me/34692815608?text='+ message
       console.log(text);
       
       window.open(text, '_blank');
    }
  }
  else{
    Swal.fire({
      title: 'Error 500',
      text: ' No he podido procesar la peticion',
      icon:'error'
    })
  }
  
  
  }

}
