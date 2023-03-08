import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainpipePipe } from './pipes/mainpipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaygroundComponent } from './pages/playground/playground.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from './components/components.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainpipePipe,
    PlaygroundComponent,
    InicioComponent,
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ComponentsModule,
    MatDialogModule,
    MatButtonModule,
    QRCodeModule,HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
