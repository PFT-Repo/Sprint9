import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThreejsComponent } from './threejs/threejs.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CreditsComponent } from './credits/credits.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ImageGenComponent } from './image-gen/image-gen.component';
import { ImageCardsComponent } from './image-cards/image-cards.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { QrReaderComponent } from './qr-reader/qr-reader.component';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent,
    NavbarComponent,ThreejsComponent, FooterComponent, CreditsComponent, PresupuestoComponent, SignInComponent, SignOutComponent, ImageGenComponent, ImageCardsComponent, MultiplayerComponent, QrReaderComponent, QrGeneratorComponent, ChatbotComponent
  ],
  exports:[
    HomeComponent,
    ModalComponent,
    NavbarComponent,ThreejsComponent, FooterComponent, CreditsComponent, PresupuestoComponent, SignInComponent, SignOutComponent, ImageGenComponent, ImageCardsComponent, MultiplayerComponent, QrReaderComponent, QrGeneratorComponent,ChatbotComponent
],
  imports: [
    CommonModule,AppRoutingModule,RouterModule,QRCodeModule,FormsModule,HttpClientModule
  ]
})
export class ComponentsModule { }
