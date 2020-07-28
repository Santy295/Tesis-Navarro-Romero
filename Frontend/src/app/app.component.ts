import { Component, Input } from '@angular/core';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP1';

  ListenedFeature = 'mapa';
  
  onNavigate(feature:string){
    this.ListenedFeature=feature;
  }

  Latitud;
  Longitud;
  Area;
  Consumo;
  Ninos;
  Adultos;
  Ancianos;
  AdultosT;
  AncianosT;
  P1;
  P2
  P3;
  P4;
  Vector;

  Latitudresi(Latitud1){
    this.Latitud=Latitud1;
  }

  Longitudresi(Longitud1){
    this.Longitud=Longitud1;
    
  }

  Arearesi(Area1){
    this.Area=Area1;
  }

  Consumoresi(Consumo1){
    this.Consumo=Consumo1;
  }

  Ninosresi(Ninos1){
    this.Ninos=Ninos1;
  }

  Adultosresi(Adultos1){
    this.Adultos=Adultos1;
  }

  Ancianosresi(Ancianos1){
    this.Ancianos=Ancianos1;
  }

  AdultosTresi(AdultosT1){
    this.AdultosT=AdultosT1;
  }

  AncianosTresi(AncianosT1){
    this.AncianosT=AncianosT1;
  }

  P1resi(P11){
    this.P1=P11;
  }

  P2resi(P21){
    this.P2=P21;
  }

  P3resi(P31){
    this.P3=P31;
  }

  P4resi(P41){
    this.P4=P41;
  }
 
  Vectorresi(Vector1){
    this.Vector=Vector1;
  }


}
