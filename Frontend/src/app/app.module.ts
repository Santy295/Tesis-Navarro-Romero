import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapaComponent } from './mapa/mapa.component';
import { PanelComponent } from './panel/panel.component';
import { RadService } from'./services/rad.service';
import { CCComponent } from './cc/cc.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapaComponent,
    PanelComponent,
    CCComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng5SliderModule,
    ChartsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
