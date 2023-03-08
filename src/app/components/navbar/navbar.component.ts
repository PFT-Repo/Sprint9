import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
constructor(private router:Router)
{}

goHome():void{
  this.router.navigate(['/home']);
}
goPlay():void{
  this.router.navigate(['/playground']);
}

}
