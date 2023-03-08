import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
 url:string = ""
  constructor(router: Router) {
   this.url = router.url;
   }
}
