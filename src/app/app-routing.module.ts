import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CreditsComponent } from './components/credits/credits.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { ImageGenComponent } from './components/image-gen/image-gen.component';
import { MultiplayerComponent } from './components/multiplayer/multiplayer.component';
import { QrReaderComponent } from './components/qr-reader/qr-reader.component';
import { QrGeneratorComponent } from './components/qr-generator/qr-generator.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

const routes: Routes = [
  {path:'intro',component: HomeComponent},
  {path:'openchat', component:ChatbotComponent},
  {path:'home',component: InicioComponent},
  {path:'playground',component: PlaygroundComponent},
  {path:'credits',component:CreditsComponent},
  {path:'calculadora',component:PresupuestoComponent},
  {path:'imggen',component:ImageGenComponent},
  {path:'multiplayer', component: MultiplayerComponent},
  {path:'qrscan', component: QrReaderComponent},
  {path:'qrgen', component: QrGeneratorComponent},
  {path:'',redirectTo:'intro', pathMatch:'full'},
  {path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
