import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageGenService {
  images:any[]=[];

  generateImage(prompt: string, model: string): Promise<any> {
    const requestBody = {
      prompt: prompt,
      model: model,
      n:2,
      size: "1024x1024",
    };

    return axios({
      method: 'post',
      url: 'https://api.openai.com/v1/images/generations',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${environment.OpenApi}`
      },
      data: requestBody
    })
      .then(response => {
        this.images= response.data.data;
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}