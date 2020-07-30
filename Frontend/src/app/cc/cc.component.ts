import { Component, OnInit,ViewChild, Output, EventEmitter } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.css']
})
export class CCComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Output() Consumoenv = new EventEmitter<{Consumo}>();
  @Output() Ninosenv = new EventEmitter<{Ninos}>();
  @Output() Adultosenv = new EventEmitter<{Adultos}>();
  @Output() Ancianosenv = new EventEmitter<{Ancianos}>();
  @Output() AdultosTenv = new EventEmitter<{AdultosT}>();
  @Output() AncianosTenv = new EventEmitter<{AncianosT}>();
  @Output() P1env = new EventEmitter<{P1}>();
  @Output() P2env = new EventEmitter<{P2}>();
  @Output() P3env = new EventEmitter<{P3}>();
  @Output() P4env = new EventEmitter<{P4}>();
  @Output() Vectorenv = new EventEmitter<{vector}>();

   // Coneccion template
   Consumo;
   Cocina;
   TLavadora;
   Secadora;
   Calefon;
   Nninos=0;
   Adultos=0;
   TerEdad=0;
   AdultosM=0;
   TerEdadM=0;
   False=false;
 
   //Mensaje error
   AdultosMM;
   AdultosC;
   TerEdadMM;
   TerEdadC;
 
   //Variables 
   PorcentajeRefrigerador=0.208;
 
   //Resultado
   Vectorf=[];
   BT=0;
   
   Dibujar(){
//Consumo de refrigerador por hora
var CRefrigerador=(this.Consumo*1000*this.PorcentajeRefrigerador)/(30*24);
//Consumo de electrodomesticos comunes
var CElectrodomesticoscom=(this.Consumo*1000*(1-this.PorcentajeRefrigerador))/(30);


//Comportamiento clasificacion

  //Uso Común
  var FcocinaC=[0,0,0,0,0,0,0.1,0,0,0,0,0,0,0,0,0,1.5,3,3,3,3,3,1.5,0];
  var MicroondasC=[0,0,0,0,0,0,0.1,0,0,0,0,0.2,0.2,0.1,0.1,0.2,0.15,0.05,0,0.2,0,0,0,0];
  var PlancharopaC=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0.5,0,0,0,0,0,0,0.1,0];
  var PlanchapeloC=[0,0,0,0,0,0.2,0,0,0,0,0,0.1,0.1,0,0.1,0.1,0,0,0,0,0,0,0,0];
  var FcomedorC=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0.5,1,1,1,1,1,0.5,0];
  var FsalaC=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,1,1,1,1,1,0.5,0];

  //Niños

  var TelevisionN=[0,0,0,0,0,0,0,0.7,0.3,0.4,0.7,0,0,0,0,0,0,0.5,1,1,1,1,0.5,0];
  var FcuratoN=[0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0.05,0.6,0.95,1,0.95,0.1,0];
  var ComputadoraN=[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0.5,0];
  var CalefonelecN=[0,0,0,0,0,0.4,1,0.8,0.7,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var FbañosN=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0];
  var DuchaelecN=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //Adulto+Trabajo

  var TelevisionAT=[0,0,0,0,0,0,0.5,0.4,0.3,0.2,0.4,0,0,0,0,0,0,0.5,1,1,1,1,0.5,0];
  var FcuartoAT=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0.05,0.6,0.95,1,0.95,0.1,0];
  var LicuadoraAT=[0,0,0,0,0,0,0.08,0,0,0,0,0,0,0,0,0,0,0,0.1,0,0,0,0,0];
  var SandwicheraAT=[0,0,0,0,0,0,0.08,0,0,0,0,0,0,0,0,0,0,0,0.1,0,0,0,0,0];
  var FcuartolavadoAT=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0,0,0,0,0];
  var LavadoraAT=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.75,0,0,0,0,0];
  var SecadoraropaAT=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0];
  var CocinaelecAT=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0,0,0];
  var ComputadoraAT=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0.5,0];
  var CalefonelecAT=[0,0,0,0,0,0.4,1,0.8,0.7,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var FbañosAT=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0];
  var DuchaelecAT=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //Tercera edad+Trabajo

  var TelevisionTET=[0,0,0,0,0,0,1,0.7,0.3,0.2,0.5,0,0,1,0,0,0,0.5,1,1,0,0,0,0];
  var FcuartoTET=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0.05,0.6,0.95,1,0.95,0.1,0];
  var LicuadoraTET=[0,0,0,0,0,0,0.17,0,0,0,0,0,0.17,0,0,0,0,0.1,0.5,0,0,0,0,0];
  var SandwicheraTET=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0.1,0.5,0,0,0,0,0];
  var FcuartolavadoTET=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var LavadoraTET=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var SecadoraropaTET=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var CocinaelecTET=[0,0,0,0,0,0,0.17,0,0,0,0,0,0.5,0,0,0,0,0,0.17,0,0,0,0,0];
  var CalefonelecTET=[0,0,0,0,0,0.4,1,0.8,0.7,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var FbañosTET=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0];
  var DuchaelecTET=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //Adultos+Casa

  var TelevisionAC=[0,0,0,0,0,0,0.5,0,0.2,0.3,0.7,1,1,1,1,1,0,0,0,1,1,1,0.5,0];
  var FcuartoAC=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0.05,0.6,0.95,1,0.95,0.1,0];
  var LicuadoraAC=[0,0,0,0,0,0,0.08,0.1,0,0,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0];
  var SandwicheraAC=[0,0,0,0,0,0,0.08,0.1,0,0,0,0,0.2,0,0,0,0,0,0,0,0,0,0,0];
  var FcuartolavadoAC=[0,0,0,0,0,0,0,0,0.4,0.5,0.5,0,0,0,0,0,0,0,1,1,1,0,0,0];
  var LavadoraAC=[0,0,0,0,0,0,0,0,0.5,1,0.5,0,0,0,0,0,0,0,1,1,1,0,0,0];
  var SecadoraropaAC=[0,0,0,0,0,0,0,0,0,0,0.2,0,0,0,0,0,0,0,1,1,1,0,0,0];
  var CocinaelecAC=[0,0,0,0,0,0,0.17,0,0,0,0,0.15,0.15,0.15,0,0,0,0,0.17,0,0,0,0,0];
  var ComputadoraAC=[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0.5,0];
  var CalefonelecAC=[0,0,0,0,0,0.4,1,0.8,0.7,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var FbañosAC=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0];
  var DuchaelecAC=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var RadioAC=[0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
  
  //Tercera edad+Casa

  var TelevisionTEC=[0,0,0,0,0,0,1,0.7,0.3,0.2,0.7,1,1,1,1,1,0,0,1,1,0,0,0,0];
  var FcuartoTEC=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0.05,0.6,0.95,1,0.95,0.1,0];
  var LicuadoraTEC=[0,0,0,0,0,0,0.17,0,0,0,0,0.2,0.17,0,0,0,0,0,0,0,0,0,0,0];
  var SandwicheraTEC=[0,0,0,0,0,0,0.17,0,0,0,0,0.2,0,0,0,0,0,0,0,0,0,0,0,0];
  var FcuartolavadoTEC=[0,0,0,0,0,0,0,1,0.4,0.5,0.5,0,0,0,0,0,0,0,1,1,1,0,0,0];
  var LavadoraTEC=[0,0,0,0,0,0,0,1,0.5,1,0.5,0,0,0,0,0,0,0,1,1,1,0,0,0];
  var SecadoraropaTEC=[0,0,0,0,0,0,0,0,0,0,0.2,0,0,0,0,0,0,0,1,1,1,0,0,0];
  var CocinaelecTEC=[0,0,0,0,0,0,0.17,0,0,0,0,0.15,0.15,0.15,0,0,0,0,0.17,0,0,0,0,0];
  var CalefonelecTEC=[0,0,0,0,0,0.4,1,0.8,0.7,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var FbañosTEC=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0];
  var DuchaelecTEC=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var RadioTEC=[0,0,0,0,0,0,0,1,0.5,0.2,1,0,0,0,0,0,0,0,0,0,0,0,0,0];

//Potencias

 var PFcocina=20;
 var PMicroondas=1200;
 var PPlancharopa=1000;
 var PPlanchapelo=40;
 var PFcomedor=480;
 var PFsala=480;
 var PLicuadora=400;
 var PSandwichera=950;
 var PLavadora=400;
 var PSecadoraropa=3000;
 var PTelevision=120;
 var PCocinaelec=4500;
 var PComputadora=300;
 var PDuchaelec=1500;
 var PCalefonelec=2000;
 var PRadio=30;
 var PFcuarto=480;
 var PFbaños=480;
 var PFcuartolavado=480;




// Comportamiento*Potencia*#Personas

  //Uso Común
  var MFcocinaC=[];
  var MMicroondasC=[];
  var MPlancharopaC=[];
  var MPlanchapeloC=[];
  var MFcomedorC=[];
  var MFsalaC=[];

  for (let i = 0; i < 24; i++) {
  MFcocinaC[i]=FcocinaC[i]*PFcocina;
  MMicroondasC[i]=MicroondasC[i]*PMicroondas;
  MPlancharopaC[i]=PlancharopaC[i]*PPlancharopa;
  MPlanchapeloC[i]=PlanchapeloC[i]*PPlanchapelo;
  MFcomedorC[i]=FcomedorC[i]*PFcomedor;
  MFsalaC[i]=FsalaC[i]*PFsala;
  }

  
  //Niños

  var MTelevisionN=[];
  var MFcuratoN=[];
  var MComputadoraN=[];
  var MCalefonelecN=[];
  var MFbañosN=[];
  var MDuchaelecN=[];

  for (let i = 0; i < 24; i++) {
    MTelevisionN[i]=TelevisionN[i]*PTelevision*this.Nninos;
    MFcuratoN[i]=FcuratoN[i]*PFcuarto*this.Nninos;
    MComputadoraN[i]=ComputadoraN[i]*PComputadora*this.Nninos;
    MCalefonelecN[i]=CalefonelecN[i]*PCalefonelec*this.Nninos;
    MFbañosN[i]=FbañosN[i]*PFbaños*this.Nninos;
    MDuchaelecN[i]=DuchaelecN[i]*PDuchaelec*this.Nninos;
  }
  
  //Adulto+Trabajo

  var MTelevisionAT=[];
  var MFcuartoAT=[];
  var MLicuadoraAT=[];
  var MSandwicheraAT=[];
  var MFcuartolavadoAT=[];
  var MLavadoraAT=[];
  var MSecadoraropaAT=[];
  var MCocinaelecAT=[];
  var MComputadoraAT=[];
  var MCalefonelecAT=[];
  var MFbañosAT=[];
  var MDuchaelecAT=[];

  for (let i = 0; i < 24; i++) {
    MTelevisionAT[i]=TelevisionAT[i]*PTelevision*this.AdultosM;
    MFcuartoAT[i]=FcuartoAT[i]*PFcuarto*this.AdultosM;
    MLicuadoraAT[i]=LicuadoraAT[i]*PLicuadora*this.AdultosM;
    MSandwicheraAT[i]=SandwicheraAT[i]*PSandwichera*this.AdultosM;
    MFcuartolavadoAT[i]=FcuartolavadoAT[i]*PFcuartolavado*this.AdultosM;
    MLavadoraAT[i]=LavadoraAT[i]*PLavadora*this.AdultosM;
    MSecadoraropaAT[i]=SecadoraropaAT[i]*PSecadoraropa*this.AdultosM;
    MCocinaelecAT[i]=CocinaelecAT[i]*PCocinaelec*this.AdultosM;
    MComputadoraAT[i]=ComputadoraAT[i]*PComputadora*this.AdultosM;
    MCalefonelecAT[i]=CalefonelecAT[i]*PCalefonelec*this.AdultosM;
    MFbañosAT[i]=FbañosAT[i]*PFbaños*this.AdultosM;
    MDuchaelecAT[i]=DuchaelecAT[i]*PDuchaelec*this.AdultosM;
  }

  //Tercera edad+Trabajo

  var MTelevisionTET=[];
  var MFcuartoTET=[];
  var MLicuadoraTET=[];
  var MSandwicheraTET=[];
  var MFcuartolavadoTET=[];
  var MLavadoraTET=[];
  var MSecadoraropaTET=[];
  var MCocinaelecTET=[];
  var MCalefonelecTET=[];
  var MFbañosTET=[];
  var MDuchaelecTET=[];

  for (let i = 0; i < 24; i++) {
    MTelevisionTET[i]=TelevisionTET[i]*PTelevision*this.TerEdadM;
    MFcuartoTET[i]=FcuartoTET[i]*PFcuarto*this.TerEdadM;
    MLicuadoraTET[i]=LicuadoraTET[i]*PLicuadora*this.TerEdadM;
    MSandwicheraTET[i]=SandwicheraTET[i]*PSandwichera*this.TerEdadM;
    MFcuartolavadoTET[i]=FcuartolavadoTET[i]*PFcuartolavado*this.TerEdadM;
    MLavadoraTET[i]=LavadoraTET[i]*PLavadora*this.TerEdadM;
    MSecadoraropaTET[i]=SecadoraropaTET[i]*PSecadoraropa*this.TerEdadM;
    MCocinaelecTET[i]=CocinaelecTET[i]*PCocinaelec*this.TerEdadM;
    MCalefonelecTET[i]=CalefonelecTET[i]*PCalefonelec*this.TerEdadM;
    MFbañosTET[i]=FbañosTET[i]*PFbaños*this.TerEdadM;
    MDuchaelecTET[i]=DuchaelecTET[i]*PDuchaelec*this.TerEdadM;
  }


  //Adultos+Casa

  var MTelevisionAC=[];
  var MFcuartoAC=[];
  var MLicuadoraAC=[];
  var MSandwicheraAC=[];
  var MFcuartolavadoAC=[];
  var MLavadoraAC=[];
  var MSecadoraropaAC=[];
  var MCocinaelecAC=[];
  var MComputadoraAC=[];
  var MCalefonelecAC=[];
  var MFbañosAC=[];
  var MDuchaelecAC=[];
  var MRadioAC=[];

  for (let i = 0; i < 24; i++) {
    MTelevisionAC[i]=TelevisionAC[i]*PTelevision*(this.Adultos-this.AdultosM);
    MFcuartoAC[i]=FcuartoAC[i]*PFcuarto*(this.Adultos-this.AdultosM);
    MLicuadoraAC[i]=LicuadoraAC[i]*PLicuadora*(this.Adultos-this.AdultosM);
    MSandwicheraAC[i]=SandwicheraAC[i]*PSandwichera*(this.Adultos-this.AdultosM);
    MFcuartolavadoAC[i]=FcuartolavadoAC[i]*PFcuartolavado*(this.Adultos-this.AdultosM);
    MLavadoraAC[i]=LavadoraAC[i]*PLavadora*(this.Adultos-this.AdultosM);
    MSecadoraropaAC[i]=SecadoraropaAC[i]*PSecadoraropa*(this.Adultos-this.AdultosM);
    MCocinaelecAC[i]=CocinaelecAC[i]*PCocinaelec*(this.Adultos-this.AdultosM);
    MComputadoraAC[i]=ComputadoraAC[i]*PComputadora*(this.Adultos-this.AdultosM);
    MCalefonelecAC[i]=CalefonelecAC[i]*PCalefonelec*(this.Adultos-this.AdultosM);
    MFbañosAC[i]=FbañosAC[i]*PFbaños*(this.Adultos-this.AdultosM);
    MDuchaelecAC[i]=DuchaelecAC[i]*PDuchaelec*(this.Adultos-this.AdultosM);
    MRadioAC[i]=RadioAC[i]*PRadio*(this.Adultos-this.AdultosM);
  }

  //Tercera edad+Casa

  var MTelevisionTEC=[];
  var MFcuartoTEC=[];
  var MLicuadoraTEC=[];
  var MSandwicheraTEC=[];
  var MFcuartolavadoTEC=[];
  var MLavadoraTEC=[];
  var MSecadoraropaTEC=[];
  var MCocinaelecTEC=[];
  var MCalefonelecTEC=[];
  var MFbañosTEC=[];
  var MDuchaelecTEC=[];
  var MRadioTEC=[];

  for (let i = 0; i < 24; i++) {
    MTelevisionTEC[i]=TelevisionTEC[i]*PTelevision*(this.TerEdad-this.TerEdadM);
    MFcuartoTEC[i]=FcuartoTEC[i]*PFcuarto*(this.TerEdad-this.TerEdadM);
    MLicuadoraTEC[i]=LicuadoraTEC[i]*PLicuadora*(this.TerEdad-this.TerEdadM);
    MSandwicheraTEC[i]=SandwicheraTEC[i]*PSandwichera*(this.TerEdad-this.TerEdadM);
    MFcuartolavadoTEC[i]=FcuartolavadoTEC[i]*PFcuartolavado*(this.TerEdad-this.TerEdadM);
    MLavadoraTEC[i]=LavadoraTEC[i]*PLavadora*(this.TerEdad-this.TerEdadM);
    MSecadoraropaTEC[i]=SecadoraropaTEC[i]*PSecadoraropa*(this.TerEdad-this.TerEdadM);
    MCocinaelecTEC[i]=CocinaelecTEC[i]*PCocinaelec*(this.TerEdad-this.TerEdadM);
    MCalefonelecTEC[i]=CalefonelecTEC[i]*PCalefonelec*(this.TerEdad-this.TerEdadM);
    MFbañosTEC[i]=FbañosTEC[i]*PFbaños*(this.TerEdad-this.TerEdadM);
    MDuchaelecTEC[i]=DuchaelecTEC[i]*PDuchaelec*(this.TerEdad-this.TerEdadM);
    MRadioTEC[i]=RadioTEC[i]*PRadio*(this.TerEdad-this.TerEdadM);
  }

// Preguntas de electrodomesticos

var NumCocina

if(this.Cocina==='Si'){
  NumCocina=1;
} 
if(this.Cocina==="No"){
  NumCocina=0;
}

var NumLavadora

if(this.TLavadora==='Si'){
  NumLavadora=1;
} 
if(this.TLavadora==="No"){
  NumLavadora=0;
}

var NumSecadoraropa

if(this.Secadora==='Si'){
  NumSecadoraropa=1;
} 
if(this.Secadora==="No"){
  NumSecadoraropa=0;
}

var NumFcuartolavado

if(this.Secadora==="Si" || this.TLavadora==='Si'){
  NumFcuartolavado=1;
}else{
  NumFcuartolavado=0;
}

var NumCalefonelec
var NumDuchaelec

if(this.Calefon==='Calefonelec'){
  NumCalefonelec=1;
  NumDuchaelec=0;
} 
if(this.Calefon==="Duchaelec"){
  NumDuchaelec=1;
  NumCalefonelec=0;
}
if(this.Calefon==="Ninguna"){
  NumDuchaelec=0;
  NumCalefonelec=0;
}

//Sumatoria por electrodomestico*Preguntas de electrodomesticos

  var SLicuadora=[];
  var SSandwichera=[];
  var SLavadora=[];
  var SSecadoraropa=[];
  var STelevision=[];
  var SCocinaelec=[];
  var SComputadora=[];
  var SCalefonelec=[];
  var SFcuartolavado=[];
  var SFbaños=[];
  var SDuchaelec=[];
  var SRadio=[];

  for (let i = 0; i < 24; i++) {
    SLicuadora[i]=MLicuadoraAT[i]+MLicuadoraTET[i]+MLicuadoraAC[i]+MLicuadoraTEC[i];
    SSandwichera[i]=MSandwicheraAT[i]+MSandwicheraTET[i]+MSandwicheraAC[i]+MSandwicheraTEC[i];
    SLavadora[i]=(MLavadoraAT[i]+MLavadoraTET[i]+MLavadoraAC[i]+MLavadoraTEC[i])*NumLavadora;
    SSecadoraropa[i]=(MSecadoraropaAT[i]+MSecadoraropaTET[i]+MSecadoraropaAC[i]+MSecadoraropaTEC[i])*NumSecadoraropa;
    STelevision[i]=MTelevisionN[i]+MTelevisionAT[i]+MTelevisionTET[i]+MTelevisionAC[i]+MTelevisionTEC[i];
    SCocinaelec[i]=(MCocinaelecAT[i]+MCocinaelecTET[i]+MCocinaelecAC[i]+MCocinaelecTEC[i])*NumCocina;
    SComputadora[i]=MComputadoraN[i]+MComputadoraAT[i]+MComputadoraAC[i];
    SCalefonelec[i]=(MCalefonelecN[i]+MCalefonelecAT[i]+MCalefonelecTET[i]+MCalefonelecAC[i]+MCalefonelecTEC[i])*NumCalefonelec;
    SFcuartolavado[i]=(MFcuartolavadoAT[i]+MFcuartolavadoTET[i]+MFcuartolavadoAC[i]+MFcuartolavadoTEC[i])*NumFcuartolavado;
    SFbaños[i]=MFbañosN[i]+MFbañosAT[i]+MFbañosTET[i]+MFbañosAC[i]+MFbañosTEC[i];
    SDuchaelec[i]=(MDuchaelecN[i]+MDuchaelecAT[i]+MDuchaelecTET[i]+MDuchaelecAC[i]+MDuchaelecTEC[i])*NumDuchaelec;
    SRadio[i]=MRadioAC[i]+MRadioTEC[i];
  }

  // console.log(SLicuadora);
  // console.log(SSandwichera);
  // console.log(SLavadora);
  // console.log(SSecadoraropa);
  // console.log(STelevision);
  // console.log(SCocinaelec);
  // console.log(SComputadora);
  // console.log(SCalefonelec);
  // console.log(SFcuartolavado);
  // console.log(SFbaños);
  // console.log(SDuchaelec);
  // console.log(SRadio);
  
  
  

// Sumatoria por hora*Energía Parásita

  var Sumatoriah=[];
  var EnergiaPara=1.1;

  for (let i = 0; i < 24; i++) {
    Sumatoriah[i]=(MFcocinaC[i]+MMicroondasC[i]+MPlancharopaC[i]+MPlanchapeloC[i]+MFcomedorC[i]+MFsalaC[i]+SLicuadora[i]+SSandwichera[i]+SLavadora[i]+SSecadoraropa[i]+STelevision[i]+SCocinaelec[i]+SComputadora[i]+SCalefonelec[i]+SFcuartolavado[i]+SFbaños[i]+SDuchaelec[i]+SRadio[i])*EnergiaPara;
  }
  
  console.log(Sumatoriah);
  
//Sumatoria Total

  var Sumatoriat;
  var sumf=0;
  for (let i = 0; i < 24; i++) {
    sumf=sumf+Sumatoriah[i];
    Sumatoriat=sumf;
  }
  sumf=0;
  console.log(Sumatoriat);
// Calculo Fraccion

  var Fraccion=[];

  for (let i = 0; i < 24; i++) {
    Fraccion[i]=Sumatoriah[i]/Sumatoriat;
  }

// Calculo Vector

  var Vector=[];

  for (let i = 0; i < 24; i++) {
    Vector[i]=CRefrigerador+(Fraccion[i]*CElectrodomesticoscom);
  }
  for (let i = 0; i < 24; i++) {
  this.Vectorf[i]=Vector[i];

  }

// Verificacion de datos

  // No #personas negativos

    //Adultos

    if (this.Adultos-this.AdultosM < 0){
      this.AdultosMM= 'Error: El número de adultos trabajando es mayor al número de adultos totales';
      this.AdultosC=0;
      for (let i = 0; i < 24; i++) {
        this.Vectorf[i]=0;
        }
    }else{
      this.AdultosC=1;
      this.AdultosMM='';
    }
    

    //Tercera Edad

    if (this.TerEdad-this.TerEdadM < 0){
      this.TerEdadMM= 'Error: El número de personas de tercera edad trabajando es mayor al número de personas de tercera edad totales';
      this.TerEdadC=0;
      for (let i = 0; i < 24; i++) {
        this.Vectorf[i]=0;
        }
    }else{
      this.TerEdadC=1;
      this.TerEdadMM='';
    }
    
    
    //  Actualizar grafico

      this.chart.update();

    // Pruebas

    //Guardado en base de datos- exportacion
    var Consumo1=this.Consumo
    this.Consumoenv.emit(Consumo1);

    this.Ninos1=this.Nninos
    this.Ninosenv.emit(this.Ninos1);

    this.Adultos1=this.Adultos
    this.Adultosenv.emit(this.Adultos1);

    this.Ancianos1=this.TerEdad
    this.Ancianosenv.emit(this.Ancianos1);

    this.AdultosT1=this.AdultosM
    this.AdultosTenv.emit(this.AdultosT1);

    this.AncianosT1=this.TerEdadM
    this.AncianosTenv.emit(this.AncianosT1);

    var P11=this.Cocina
    this.P1env.emit(P11);

    var P21=this.TLavadora
    this.P2env.emit(P21);

    var P31=this.Secadora
    this.P3env.emit(P31);

    var P41=this.Calefon
    this.P4env.emit(P41);

    this.Vector1 = this.Vectorf
    this.Vectorenv.emit(this.Vector1);

    //Bloquqo boton siguiente
     
     this.BT=1;
   }

   
   //Variable sexternas base de datos
   Ninos1;
   Adultos1;
   Ancianos1;
   AdultosT1;
   AncianosT1;
   Vector1;
  
 
   Label=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
 
   // Grafico
    lineChartData: ChartDataSets[] = [
     { data: this.Vectorf, label: 'Curva de Carga [Wh]' },
   ];
 
   lineChartLabels: Label[] = this.Label;
 
   lineChartOptions = {
     responsive: true,
   };
 
   public lineChartColors: Color[] = [
     { // grey
       backgroundColor: 'rgba(148,159,177,0.2)',
       borderColor: 'rgba(148,159,177,1)',
       pointBackgroundColor: 'rgba(148,159,177,1)',
       pointBorderColor: '#fff',
       pointHoverBackgroundColor: '#fff',
       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
     },
     { // dark grey
       backgroundColor: 'rgba(77,83,96,0.2)',
       borderColor: 'rgba(77,83,96,1)',
       pointBackgroundColor: 'rgba(77,83,96,1)',
       pointBorderColor: '#fff',
       pointHoverBackgroundColor: '#fff',
       pointHoverBorderColor: 'rgba(77,83,96,1)'
     },
     { // red
       backgroundColor: 'rgba(255,0,0,0.3)',
       borderColor: 'red',
       pointBackgroundColor: 'rgba(148,159,177,1)',
       pointBorderColor: '#fff',
       pointHoverBackgroundColor: '#fff',
       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
     }
   ];
   
 
   lineChartLegend = true;
   lineChartPlugins = [];
   lineChartType = 'line';
   
   // Cambiar pagina a calculos
   @Output() featureSelected = new EventEmitter<string>();
   onSelect(feature:string){
     this.featureSelected.emit(feature);
   }
  }
 

//   // Vector de codigo final
//   vectorf=[];

//   // Coneccion template
//   Consumo;
//   // NPer;
//   // Tarde;
//   Cocina;
//   TLavadora;
//   Secadora;
//   Calefon;
//   Nninos=0;
//   Adultos=0;
//   TerEdad=0;
 
//   // Cantidad de aparatos
//   Refrigeradora;
//   FocosCocina; 
//   Microondas;
//   Licuadora;
//   Sanduchera;
//   Lavadora;//
//   Secadora_ropa;//
//   Televisión;
//   Cocina_electrica;//
//   Computadora;
//   Plancha_ropa;
//   Ducha_electrico;//
//   Plancha_pelo;//
//   FocosComedor;
//   FocosSala;

//   Ninos1;
//   Adultos1;
//   Ancianos1;
//   Vector1;

// //  Potencia de aparatos
//   PRefrigeradora;
//   PFocosCocina; 
//   PMicroondas;
//   PLicuadora;
//   PSanduchera;
//   PLavadora;
//   PSecadora_ropa;
//   PTelevisión;
//   PCocina_electrica;
//   PComputadora;
//   PPlancha_ropa;
//   PDucha_electrico;
//   PPlancha_pelo;
//   PFocosComedor;
//   PFocosSala;

// // Consumo por hora de cada aparato(1 o fraccion)
//   CRefrigeradora=[];
//   CFocosCocina=[]; 
//   CMicroondas=[];
//   CLicuadora=[];
//   CSanduchera=[];
//   CLavadora=[];
//   CSecadora_ropa=[];
//   CTelevisión=[];
//   CCocina_electrica=[];
//   CComputadora=[];
//   CPlancha_ropa=[];
//   CDucha_electrico=[];
//   CPlancha_pelo=[];
//   CFocosComedor=[];
//   CFocosSala=[];

//   // consumo de niño/adolescente
//   NRefrigeradora=[];
//   NTelevision=[];
//   NFocoscuarto=[];
//   NComputadora=[];
//   NDucha=[];
//   NFocoBaño=[];
//   Nino=[];

//   // Consumo Adultos
//   ARefrigeradora=[];
//   ATelevisión=[];
//   AFocosCuarto=[]; 
//   ALicuadora=[]; 
//   ASanduchera=[];
//   AFocosLavado=[];
//   ALavadora=[];
//   ASecadoraRopa=[];
//   ACocinaElectrica=[];
//   AComputadora=[];
//   ADucha=[];
//   AFocosBaño=[];
//   Adult=[];

//   // Consumo tercera edad
//   ERefrigeradora=[];
//   ETelevisión=[];
//   EFocosCuarto=[];
//   ELicuadora=[]; 
//   ESanduchera=[];
//   EFocosLavado=[];
//   ELavadora=[];
//   ESecadoraRopa=[];
//   ECocinaElectrica=[];
//   EDuchaElectrico=[];
//   EFocosBaño=[];
//   TerceraEdad=[];


// // Consumo Final
//   FRefrigeradora=[];
//   FFocosCocina=[]; 
//   FMicroondas=[];
//   FLicuadora=[] ;
//   FSanduchera=[];
//   FLavadora=[];//
//   FSecadora_ropa=[];//
//   FTelevisión=[] ;
//   FCocina_electrica=[];//
//   FComputadora=[];
//   FPlancha_ropa=[];
//   FDucha_electrico=[] ;//
//   FPlancha_pelo=[];//
//   FFocosComedor=[];
//   FFocosSala=[];

//   // Vector Sumatoria 

//   Sumatoria=[];

//   // Valor de suma de Sumatoria

//   sum=0;
//   sumf=0;

//   // Vector suma en freaccion

//   Fraccion=[];

//   // Vector
//   Vector=[];
//   Label = ['0-1','1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14','14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23','23-24'];
//   label=[];

//   Dibujar(){
//     var Consumo1=this.Consumo
//     this.Consumoenv.emit(Consumo1);

//     this.Ninos1=this.Nninos
//     this.Ninosenv.emit(this.Ninos1);

//     this.Adultos1=this.Adultos
//     this.Adultosenv.emit(this.Adultos1);

//     this.Ancianos1=this.TerEdad
//     this.Ancianosenv.emit(this.Ancianos1);

//     var P11=this.Cocina
//     this.P1env.emit(P11);

//     var P21=this.TLavadora
//     this.P2env.emit(P21);

//     var P31=this.Secadora
//     this.P3env.emit(P31);

//     var P41=this.Calefon
//     this.P4env.emit(P41);
//     // Cantidad de aparatos
//     this.Refrigeradora=1;
//     this.FocosCocina=1; 
//     this.Microondas=1;
//     this.Licuadora=1 ;
//     this.Sanduchera=1;
//     this.Lavadora;//
//     this.Secadora_ropa;//
//     this.Televisión=1;
//     this.Cocina_electrica;//
//     this.Computadora=1;
//     this.Plancha_ropa=1;
//     this.Ducha_electrico;//
//     this.Plancha_pelo=1;//
//     this.FocosComedor=1;
//     this.FocosSala=1;

//     // Agregar o sustraer elementos (Preguntas)
    
//     if(this.Cocina==='Si'){
//       this.Cocina_electrica=1;
//     } 
//     if(this.Cocina==="No"){
//       this.Cocina_electrica=0;
//     }
//     console.log(this.Cocina);
//     console.log(this.Cocina_electrica);
    

//     if(this.TLavadora==='Si'){
//       this.Lavadora=1;
//     } 
//     if(this.TLavadora==="No"){
//       this.Lavadora=0;
//     }

//     if(this.Secadora==='Si'){
//       this.Secadora_ropa=1;
//     } 
//     if(this.Secadora==="No"){
//       this.Secadora_ropa=0;
//     }

//     if(this.Calefon==='Si'){
//       this.Ducha_electrico=1;
//     } 
//     if(this.Calefon==="No"){
//       this.Ducha_electrico=0;
//     }



//     // Potencia de aparatos
//     this.PRefrigeradora=this.Refrigeradora*250;
//     this.PFocosCocina=this.FocosCocina*20; 
//     this.PMicroondas=this.Microondas*1200;
//     this.PLicuadora=this.Licuadora*400;
//     this.PSanduchera=this.Sanduchera*950;
//     this.PLavadora=this.Lavadora*400;
//     this.PSecadora_ropa=this.Secadora_ropa*5600;
//     this.PTelevisión=this.Televisión*120;
//     this.PCocina_electrica=this.Cocina_electrica*8240;
//     this.PComputadora=this.Computadora*300;
//     this.PPlancha_ropa=this.Plancha_ropa*1000;
//     this.PDucha_electrico=this.Ducha_electrico*1500;
//     this.PPlancha_pelo=this.Plancha_pelo*40;
//     this.PFocosComedor=this.FocosComedor*20;
//     this.PFocosSala=this.FocosSala*20;
    

//     // Consumo Vectores
//     this.CRefrigeradora=[0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3];
//     this.CFocosCocina=[0,0,0,0,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0.1,0.8,1,0.5,0.2,0,0]; 
//     this.CMicroondas=[0,0,0,0,0,0,0.1,0,0,0,0,0,0,0,0.08,0,0,0.05,0,0.1,0,0,0,0];
//     this.CLicuadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ;
//     this.CSanduchera=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CLavadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CSecadora_ropa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CTelevisión=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CCocina_electrica=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CComputadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CPlancha_ropa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1,0];
//     this.CDucha_electrico=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CPlancha_pelo=[0,0,0,0,0,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CFocosComedor=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0];
//     this.CFocosSala=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0];


//     // Consumo por habito

//     // niños/adolescentes
//     this.NRefrigeradora=[];
//     this.NTelevision=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0];
//     this.NFocoscuarto=[0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0];
//     this.NComputadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0];
//     this.NDucha=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.NFocoBaño=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0.17,0,0,0,0,0,0.17,0,0,0];

//     for (let i = 0; i < 24; i++) {
//     this.NRefrigeradora[i]=0.015*this.Nninos;
//     this.NTelevision[i]=this.NTelevision[i]*this.Nninos*120;
//     this.NFocoscuarto[i]=this.NFocoscuarto[i]*this.Nninos*20;
//     this.NComputadora[i]=this.NComputadora[i]*this.Nninos*300;
//     this.NDucha[i]=this.NDucha[i]*this.Nninos;
//     this.NFocoBaño[i]=this.NFocoBaño[i]*this.Nninos*20;
//     }

//     for (let i = 0; i < 24; i++) {
//       this.Nino[i]=this.NTelevision[i]+this.NFocoscuarto[i]+this.NComputadora[i]+this.NFocoBaño[i];
//     }

//     // Adultos

//     this.ATelevisión=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0.5,0];
//     this.AFocosCuarto=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0]; 
//     this.ALicuadora=[0,0,0,0,0,0,0.08,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
//     this.ASanduchera=[0,0,0,0,0,0,0.08,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.AFocosLavado=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0,0,0,0,0];
//     this.ALavadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.75,0,0,0,0,0];
//     this.ASecadoraRopa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0];
//     this.ACocinaElectrica=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0.33,0,0,0,0,0];
//     this.AComputadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0];
//     this.ADucha=[0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.AFocosBaño=[0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//     for (let i = 0; i < 24; i++) {
//     this.ARefrigeradora[i]=0.015*this.Adultos;
//     this.ATelevisión[i]=this.ATelevisión[i]*this.Adultos*120;
//     this.AFocosCuarto[i]=this.AFocosCuarto[i]*this.Adultos*20; 
//     this.ALicuadora[i]=this.ALicuadora[i]*this.Adultos; 
//     this.ASanduchera[i]=this.ASanduchera[i]*this.Adultos;
//     this.AFocosLavado[i]=this.AFocosLavado[i]*this.Adultos*20*this.Lavadora;
//     this.ALavadora[i]=this.ALavadora[i]*this.Adultos;
//     this.ASecadoraRopa[i]=this.ASecadoraRopa[i]*this.Adultos;
//     this.ACocinaElectrica[i]=this.ACocinaElectrica[i]*this.Adultos;
//     this.AComputadora[i]=this.AComputadora[i]*this.Adultos*300;
//     this.ADucha[i]=this.ADucha[i]*this.Adultos;
//     this.AFocosBaño[i]=this.AFocosBaño[i]*this.Adultos*20;
//     }
//     for (let i = 0; i < 24; i++) {
//     this.Adult[i]=this.ATelevisión[i]+this.AFocosCuarto[i]+this.AFocosLavado[i]+this.AComputadora[i]+this.AFocosBaño[i];
//     }

//     // Tercera Edad

//     this.ETelevisión=[0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0];
//     this.EFocosCuarto=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0];
//     this.ELicuadora=[0,0,0,0,0,0,0.17,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0]; 
//     this.ESanduchera=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.EFocosLavado=[0,0,0,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.ELavadora=[0,0,0,0,0,0,0,0,0,0.75,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.ESecadoraRopa=[0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.ECocinaElectrica=[0,0,0,0,0,0,0.17,0,0,0,0,0,0.5,0,0,0,0,0,0.17,0,0,0,0,0];
//     this.EDuchaElectrico=[0,0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.EFocosBaño=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0,0,0];

//     for (let i = 0; i < 24; i++) {
//     this.ERefrigeradora[i]=0.015*this.TerEdad;
//     this.ETelevisión[i]=this.ETelevisión[i]*this.TerEdad*120;
//     this.EFocosCuarto[i]=this.EFocosCuarto[i]*this.TerEdad*20;
//     this.ELicuadora[i]=this.ELicuadora[i]*this.TerEdad; 
//     this.ESanduchera[i]=this.ESanduchera[i]*this.TerEdad;
//     this.EFocosLavado[i]=this.EFocosLavado[i]*this.TerEdad*20*this.Lavadora;
//     this.ELavadora[i]=this.ELavadora[i]*this.TerEdad;
//     this.ESecadoraRopa[i]=this.ESecadoraRopa[i]*this.TerEdad;
//     this.ECocinaElectrica[i]=this.ECocinaElectrica[i]*this.TerEdad;
//     this.EDuchaElectrico[i]=this.EDuchaElectrico[i]*this.TerEdad;
//     this.EFocosBaño[i]=this.EFocosBaño[i]*this.TerEdad*20;
//     }

//     for (let i = 0; i < 24; i++) {
//     this.TerceraEdad[i]=this.ETelevisión[i]+this.EFocosCuarto[i]+this.EFocosLavado[i]+this.EFocosBaño[i];
//     }
 
//     console.log(this.CCocina_electrica);
    
//     // Condicion anterior
//     for (let i = 0; i < 24; i++) {
//       this.CRefrigeradora[i]=this.CRefrigeradora[i]+this.NRefrigeradora[i]+this.ARefrigeradora[i]+this.ERefrigeradora[i];
//       this.CDucha_electrico[i]=this.CDucha_electrico[i]+this.NDucha[i]+this.ADucha[i]+this.EDuchaElectrico[i];
//       this.CLicuadora[i]=this.CLicuadora[i]+this.ALicuadora[i]+this.ELicuadora[i];
//       this.CSanduchera[i]=this.CSanduchera[i]+this.ASanduchera[i]+this.ESanduchera[i];
//       this.CLavadora[i]=this.CLavadora[i]+this.ALavadora[i]+this.ELavadora[i];
//       this.CSecadora_ropa[i]=this.CSecadora_ropa[i]+this.ASecadoraRopa[i]+this.ESecadoraRopa[i];
//       this.CCocina_electrica[i]=this.CCocina_electrica[i]+this.ACocinaElectrica[i]+this.ECocinaElectrica[i];
//     }
//     console.log(this.ECocinaElectrica);
//     console.log(this.ACocinaElectrica);
    
//     console.log(this.CCocina_electrica);
    
//     // Calculo de Consumo Final
    
//     for (let i = 0; i < 24; i++) {
//       this.FRefrigeradora[i]=this.CRefrigeradora[i]*this.PRefrigeradora;
//       this.FFocosCocina[i]=this.CFocosCocina[i]*this.PFocosCocina;
//       this.FMicroondas[i]=this.CMicroondas[i]*this.PMicroondas;
//       this.FLicuadora[i]=this.CLicuadora[i]*this.PLicuadora;
//       this.FSanduchera[i]=this.CSanduchera[i]*this.PSanduchera;
//       this.FLavadora[i]=this.CLavadora[i]*this.PLavadora;
//       this.FSecadora_ropa[i]=this.CSecadora_ropa[i]*this.PSecadora_ropa;
//       this.FTelevisión[i]=this.CTelevisión[i]*this.PTelevisión;
//       this.FCocina_electrica[i]=this.CCocina_electrica[i]*this.PCocina_electrica;
//       this.FComputadora[i]=this.CComputadora[i]*this.PComputadora;
//       this.FPlancha_ropa[i]=this.CPlancha_ropa[i]*this.PPlancha_ropa;
//       this.FDucha_electrico[i]=this.CDucha_electrico[i]*this.PDucha_electrico;
//       this.FPlancha_pelo[i]=this.CPlancha_pelo[i]*this.PPlancha_pelo;
//       this.FFocosComedor[i]=this.CFocosComedor[i]*this.PFocosComedor;
//       this.FFocosSala[i]=this.CFocosSala[i]*this.PFocosSala;
//     }

//     // Calculo de Sumatoria
//     for (let i = 0; i < 24; i++) {
//     this.Sumatoria[i]=this.FRefrigeradora[i]+this.FFocosCocina[i]+this.FMicroondas[i]+this.FLicuadora[i]+this.FSanduchera[i]+this.FLavadora[i]+this.FSecadora_ropa[i]+this.FTelevisión[i]+this.FCocina_electrica[i]+this.FComputadora[i]+this.FPlancha_ropa[i]+this.FDucha_electrico[i]+this.FPlancha_pelo[i]+this.FFocosComedor[i]+this.FFocosSala[i]+this.Nino[i]+this.Adult[i]+this.TerceraEdad[i];
//     }
    

//     // Calculo energia parasita (10%)
//     for (let i = 0; i < 24; i++) {
//       this.Sumatoria[i]=this.Sumatoria[i]*1.10;
//     }   
    

//     // Calculo sum
//     for (let i = 0; i < 24; i++) {
//       this.sum=this.sum+this.Sumatoria[i];
//       this.sumf=this.sum;
//     }
//     this.sum=0;
    

//     // Calculo Fraccion
//     for (let i = 0; i < 24; i++) {
//       this.Fraccion[i]=this.Sumatoria[i]/this.sumf;
//     }
    
    

//     // Calculo Vector
//     for (let i = 0; i < 24; i++) {
//       this.Vector[i]=(this.Fraccion[i]*this.Consumo*1000/31);
//     }
//     // console.log(this.Vector)

    

 

//   //  Vector para codigo final
  
//   // this.vectorf=[...this.Vector,...this.Vector];
//   // for (let i = 0; i < 1; i++) {
//   //   this.vectorf=this.vectorf.concat(this.Vector);
//   //   this.label=this.label.concat(this.Label);
//   // }

// //   for(let x = 0; x<31; x++){
// //     for (let i = 0; i < 24; i++) {
// //       this.vectorf[this.vectorf.length]=this.Vector[i];
// //       this.label[this.label.length]=this.Label[i];
// //     }
// //   }
// //  console.log(this.vectorf);
 
   
    
//    //  Actualizar grafico
//    this.chart.update();

//    this.cal=this.Vector[23];
   
//    this.Vector1 = this.Vector
//    this.Vectorenv.emit(this.Vector1);
//   }
//   Vector2=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
// cal;  

//   // Grafico
//   lineChartData: ChartDataSets[] = [
//     { data: this.Vector, label: 'Curva de Carga [KWh]' },
//     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
//   ];

//   lineChartLabels: Label[] = this.Label;

//   lineChartOptions = {
//     responsive: true,
//   };

//   public lineChartColors: Color[] = [
//     { // grey
//       backgroundColor: 'rgba(148,159,177,0.2)',
//       borderColor: 'rgba(148,159,177,1)',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//     },
//     { // dark grey
//       backgroundColor: 'rgba(77,83,96,0.2)',
//       borderColor: 'rgba(77,83,96,1)',
//       pointBackgroundColor: 'rgba(77,83,96,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(77,83,96,1)'
//     },
//     { // red
//       backgroundColor: 'rgba(255,0,0,0.3)',
//       borderColor: 'red',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//     }
//   ];
  

//   lineChartLegend = true;
//   lineChartPlugins = [];
//   lineChartType = 'line';

//   // Cambiar pagina a calculos
 
//   @Output() featureSelected = new EventEmitter<string>();
//   onSelect(feature:string){
//     this.featureSelected.emit(feature);
//   }
// }





//   // Coneccion template
//   Consumo;
//   // NPer;
//   // Tarde;
//   Cocina;
//   TLavadora;
//   Secadora;
//   Calefon;
//   Nninos=0;
//   Adultos=0;
//   TerEdad=0;

//   Ninos1;
//   Adultos1;
//   Ancianos1;

//   // Cantidad de aparatos
//   Refrigeradora;
//   FocosCocina; 
//   Microondas;
//   Licuadora;
//   Sanduchera;
//   Lavadora;//
//   Secadora_ropa;//
//   Televisión;
//   Cocina_electrica;//
//   Computadora;
//   Plancha_ropa;
//   Ducha_electrico;//
//   Plancha_pelo;//
//   FocosComedor;
//   FocosSala;


// //  Potencia de aparatos
//   PRefrigeradora;
//   PFocosCocina; 
//   PMicroondas;
//   PLicuadora;
//   PSanduchera;
//   PLavadora;
//   PSecadora_ropa;
//   PTelevisión;
//   PCocina_electrica;
//   PComputadora;
//   PPlancha_ropa;
//   PDucha_electrico;
//   PPlancha_pelo;
//   PFocosComedor;
//   PFocosSala;

// // Consumo por hora de cada aparato(1 o fraccion)
//   CRefrigeradora=[];
//   CFocosCocina=[]; 
//   CMicroondas=[];
//   CLicuadora=[];
//   CSanduchera=[];
//   CLavadora=[];
//   CSecadora_ropa=[];
//   CTelevisión=[];
//   CCocina_electrica=[];
//   CComputadora=[];
//   CPlancha_ropa=[];
//   CDucha_electrico=[];
//   CPlancha_pelo=[];
//   CFocosComedor=[];
//   CFocosSala=[];

//   // consumo de niño/adolescente
//   NRefrigeradora=[];
//   NTelevision=[];
//   NFocoscuarto=[];
//   NComputadora=[];
//   NDucha=[];
//   NFocoBaño=[];
//   Nino=[];

//   // Consumo Adultos
//   ARefrigeradora=[];
//   ATelevisión=[];
//   AFocosCuarto=[]; 
//   ALicuadora=[]; 
//   ASanduchera=[];
//   AFocosLavado=[];
//   ALavadora=[];
//   ASecadoraRopa=[];
//   ACocinaElectrica=[];
//   AComputadora=[];
//   ADucha=[];
//   AFocosBaño=[];
//   Adult=[];

//   // Consumo tercera edad
//   ERefrigeradora=[];
//   ETelevisión=[];
//   EFocosCuarto=[];
//   ELicuadora=[]; 
//   ESanduchera=[];
//   EFocosLavado=[];
//   ELavadora=[];
//   ESecadoraRopa=[];
//   ECocinaElectrica=[];
//   EDuchaElectrico=[];
//   EFocosBaño=[];
//   TerceraEdad=[];


// // Consumo Final
//   FRefrigeradora=[];
//   FFocosCocina=[]; 
//   FMicroondas=[];
//   FLicuadora=[] ;
//   FSanduchera=[];
//   FLavadora=[];//
//   FSecadora_ropa=[];//
//   FTelevisión=[] ;
//   FCocina_electrica=[];//
//   FComputadora=[];
//   FPlancha_ropa=[];
//   FDucha_electrico=[] ;//
//   FPlancha_pelo=[];//
//   FFocosComedor=[];
//   FFocosSala=[];

//   // Vector Sumatoria 

//   Sumatoria=[];

//   // Valor de suma de Sumatoria

//   sum=0;
//   sumf=0;

//   // Vector suma en fraccion
//   Fraccion=[];

//   // Vector
//   Vector=[];

//   Dibujar(){
//     var Consumo1=this.Consumo
//     this.Consumoenv.emit(Consumo1);

//     this.Ninos1=this.Nninos
//     this.Ninosenv.emit(this.Ninos1);

//     this.Adultos1=this.Adultos
//     this.Adultosenv.emit(this.Adultos1);

//     this.Ancianos1=this.TerEdad
//     this.Ancianosenv.emit(this.Ancianos1);

//     var P11=this.Cocina
//     this.P1env.emit(P11);

//     var P21=this.TLavadora
//     this.P2env.emit(P21);

//     var P31=this.Secadora
//     this.P3env.emit(P31);

//     var P41=this.Calefon
//     this.P4env.emit(P41);

//     // Cantidad de aparatos
//     this.Refrigeradora=1;
//     this.FocosCocina=1; 
//     this.Microondas=1;
//     this.Licuadora=1 ;
//     this.Sanduchera=1;
//     this.Lavadora;//
//     this.Secadora_ropa;//
//     this.Televisión=1;
//     this.Cocina_electrica;//
//     this.Computadora=1;
//     this.Plancha_ropa=1;
//     this.Ducha_electrico;//
//     this.Plancha_pelo=1;//
//     this.FocosComedor=1;
//     this.FocosSala=1;

//     // Agregar o sustraer elementos (Preguntas)
    
//     if(this.Cocina==='Si'){
//       this.Cocina_electrica=1;
//     } 
//     if(this.Cocina==="No"){
//       this.Cocina_electrica=0;
//     }

//     if(this.TLavadora==='Si'){
//       this.Lavadora=1;
//     } 
//     if(this.TLavadora==="No"){
//       this.Lavadora=0;
//     }

//     if(this.Secadora==='Si'){
//       this.Secadora_ropa=1;
//     } 
//     if(this.Secadora==="No"){
//       this.Secadora_ropa=0;
//     }

//     if(this.Calefon==='Si'){
//       this.Ducha_electrico=1;
//     } 
//     if(this.Calefon==="No"){
//       this.Ducha_electrico=0;
//     }



//     // Potencia de aparatos
//     this.PRefrigeradora=this.Refrigeradora*90;
//     this.PFocosCocina=this.FocosCocina*30; 
//     this.PMicroondas=this.Microondas*1250;
//     this.PLicuadora=this.Licuadora*500;
//     this.PSanduchera=this.Sanduchera*750;
//     this.PLavadora=this.Lavadora*900;
//     this.PSecadora_ropa=this.Secadora_ropa*1200;
//     this.PTelevisión=this.Televisión*80 ;
//     this.PCocina_electrica=this.Cocina_electrica*150;
//     this.PComputadora=this.Computadora*30;
//     this.PPlancha_ropa=this.Plancha_ropa*1400;
//     this.PDucha_electrico=this.Ducha_electrico*900;
//     this.PPlancha_pelo=this.Plancha_pelo*1900;
//     this.PFocosComedor=this.FocosComedor*30;
//     this.PFocosSala=this.FocosSala*30;
    

//     // Consumo Vectores
//     this.CRefrigeradora=[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
//     this.CFocosCocina=[0,0,0,0,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0.1,0.8,1,0.5,0.2,0,0]; 
//     this.CMicroondas=[0,0,0,0,0,0,0.1,0,0,0,0,0,0,0,0.08,0,0,0.05,0,0.1,0,0,0,0];
//     this.CLicuadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ;
//     this.CSanduchera=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CLavadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CSecadora_ropa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CTelevisión=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,1,1,1,0.5,1,0.5,0,0,0];
//     this.CCocina_electrica=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CComputadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0];
//     this.CPlancha_ropa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1,0];
//     this.CDucha_electrico=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CPlancha_pelo=[0,0,0,0,0,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.CFocosComedor=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0];
//     this.CFocosSala=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0];


//     // Consumo por habito

//     // niños/adolescentes
//     this.NRefrigeradora=[];
//     this.NTelevision=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0];
//     this.NFocoscuarto=[0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0];
//     this.NComputadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0];
//     this.NDucha=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.NFocoBaño=[0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0.17,0,0,0,0,0,0.17,0,0,0];

//     for (let i = 0; i < 24; i++) {
//     this.NRefrigeradora[i]=0.015*this.Nninos;
//     this.NTelevision[i]=this.NTelevision[i]*this.Nninos*86;
//     this.NFocoscuarto[i]=this.NFocoscuarto[i]*this.Nninos*30;
//     this.NComputadora[i]=this.NComputadora[i]*this.Nninos*30;
//     this.NDucha[i]=this.NDucha[i]*this.Nninos;
//     this.NFocoBaño[i]=this.NFocoBaño[i]*this.Nninos*30;
//     }

//     for (let i = 0; i < 24; i++) {
//       this.Nino[i]=this.NTelevision[i]+this.NFocoscuarto[i]+this.NComputadora[i]+this.NFocoBaño[i];
//     }

//     // Adultos

//     this.ATelevisión=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0.5,0];
//     this.AFocosCuarto=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0]; 
//     this.ALicuadora=[0,0,0,0,0,0,0.08,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
//     this.ASanduchera=[0,0,0,0,0,0,0.08,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.AFocosLavado=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0,0,0,0];
//     this.ALavadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.75,0,0,0,0,0];
//     this.ASecadoraRopa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0];
//     this.ACocinaElectrica=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0.33,0,0,0,0,0];
//     this.AComputadora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.25,0,0,0,0];
//     this.ADucha=[0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.AFocosBaño=[0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//     for (let i = 0; i < 24; i++) {
//     this.ARefrigeradora[i]=0.015*this.Adultos;
//     this.ATelevisión[i]=this.ATelevisión[i]*this.Adultos*89;
//     this.AFocosCuarto[i]=this.AFocosCuarto[i]*this.Adultos*30; 
//     this.ALicuadora[i]=this.ALicuadora[i]*this.Adultos; 
//     this.ASanduchera[i]=this.ASanduchera[i]*this.Adultos;
//     this.AFocosLavado[i]=this.AFocosLavado[i]*this.Adultos*30;
//     this.ALavadora[i]=this.ALavadora[i]*this.Adultos;
//     this.ASecadoraRopa[i]=this.ASecadoraRopa[i]*this.Adultos;
//     this.ACocinaElectrica[i]=this.ACocinaElectrica[i]*this.Adultos;
//     this.AComputadora[i]=this.AComputadora[i]*this.Adultos*30;
//     this.ADucha[i]=this.ADucha[i]*this.Adultos;
//     this.AFocosBaño[i]=this.AFocosBaño[i]*this.Adultos*30;
//     }
//     for (let i = 0; i < 24; i++) {
//     this.Adult[i]=this.ATelevisión[i]+this.AFocosCuarto[i]+this.AFocosLavado[i]+this.AComputadora[i]+this.AFocosBaño[i];
//     }

//     // Tercera Edad

//     this.ETelevisión=[0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0];
//     this.EFocosCuarto=[0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0];
//     this.ELicuadora=[0,0,0,0,0,0,0.17,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0]; 
//     this.ESanduchera=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.EFocosLavado=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.ELavadora=[0,0,0,0,0,0,0,0,0,0.75,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.ESecadoraRopa=[0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.ECocinaElectrica=[0,0,0,0,0,0,0.17,0,0,0,0,0,0.5,0,0,0,0,0,0.17,0,0,0,0,0];
//     this.EDuchaElectrico=[0,0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     this.EFocosBaño=[0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0,0,0];

//     for (let i = 0; i < 24; i++) {
//     this.ERefrigeradora[i]=0.015*this.TerEdad;
//     this.ETelevisión[i]=this.ETelevisión[i]*this.TerEdad*89;
//     this.EFocosCuarto[i]=this.EFocosCuarto[i]*this.TerEdad*30;
//     this.ELicuadora[i]=this.ELicuadora[i]*this.TerEdad; 
//     this.ESanduchera[i]=this.ESanduchera[i]*this.TerEdad;
//     this.EFocosLavado[i]=this.EFocosLavado[i]*this.TerEdad*30;
//     this.ELavadora[i]=this.ELavadora[i]*this.TerEdad;
//     this.ESecadoraRopa[i]=this.ESecadoraRopa[i]*this.TerEdad;
//     this.ECocinaElectrica[i]=this.ECocinaElectrica[i]*this.TerEdad;
//     this.EDuchaElectrico[i]=this.EDuchaElectrico[i]*this.TerEdad;
//     this.EFocosBaño[i]=this.EFocosBaño[i]*this.TerEdad*30;
//     }

//     for (let i = 0; i < 24; i++) {
//     this.TerceraEdad[i]=this.ETelevisión[i]+this.EFocosCuarto[i]+this.EFocosLavado[i]+this.EFocosBaño[i];
//     }

//     // Condicion anterior
//     for (let i = 0; i < 24; i++) {
//       this.CRefrigeradora[i]=this.CRefrigeradora[i]+this.NRefrigeradora[i]+this.ARefrigeradora[i]+this.ERefrigeradora[i];
//       this.CDucha_electrico[i]=this.CDucha_electrico[i]+this.NDucha[i]+this.ADucha[i]+this.EDuchaElectrico[i];
//       this.CLicuadora[i]=this.CLicuadora[i]+this.ALicuadora[i]+this.ELicuadora[i];
//       this.CSanduchera[i]=this.CSanduchera[i]+this.ASanduchera[i]+this.ESanduchera[i];
//       this.CLavadora[i]=this.CLavadora[i]+this.ALavadora[i]+this.ELavadora[i];
//       this.CSecadora_ropa[i]=this.CSecadora_ropa[i]+this.ASecadoraRopa[i]+this.ESecadoraRopa[i];
//       this.CCocina_electrica[i]=this.CCocina_electrica[i]+this.ACocinaElectrica[i]+this.ECocinaElectrica[i];
//     }

//     // Calculo de Consumo Final
    
//     for (let i = 0; i < 24; i++) {
//       this.FRefrigeradora[i]=this.CRefrigeradora[i]*this.PRefrigeradora;
//       this.FFocosCocina[i]=this.CFocosCocina[i]*this.PFocosCocina;
//       this.FMicroondas[i]=this.CMicroondas[i]*this.PMicroondas;
//       this.FLicuadora[i]=this.CLicuadora[i]*this.PLicuadora;
//       this.FSanduchera[i]=this.CSanduchera[i]*this.PSanduchera;
//       this.FLavadora[i]=this.CLavadora[i]*this.PLavadora;
//       this.FSecadora_ropa[i]=this.CSecadora_ropa[i]*this.PSecadora_ropa;
//       this.FTelevisión[i]=this.CTelevisión[i]*this.PTelevisión;
//       this.FCocina_electrica[i]=this.CCocina_electrica[i]*this.PCocina_electrica;
//       this.FComputadora[i]=this.CComputadora[i]*this.PComputadora;
//       this.FPlancha_ropa[i]=this.CPlancha_ropa[i]*this.PPlancha_ropa;
//       this.FDucha_electrico[i]=this.CDucha_electrico[i]*this.PDucha_electrico;
//       this.FPlancha_pelo[i]=this.CPlancha_pelo[i]*this.PPlancha_pelo;
//       this.FFocosComedor[i]=this.CFocosComedor[i]*this.PFocosComedor;
//       this.FFocosSala[i]=this.CFocosSala[i]*this.PFocosSala;
//     }

//     // Calculo de Sumatoria
//     for (let i = 0; i < 24; i++) {
//     this.Sumatoria[i]=this.FRefrigeradora[i]+this.FFocosCocina[i]+this.FMicroondas[i]+this.FLicuadora[i]+this.FSanduchera[i]+this.FLavadora[i]+this.FSecadora_ropa[i]+this.FTelevisión[i]+this.FCocina_electrica[i]+this.FComputadora[i]+this.FPlancha_ropa[i]+this.FDucha_electrico[i]+this.FPlancha_pelo[i]+this.FFocosComedor[i]+this.FFocosSala[i]+this.Nino[i]+this.Adult[i]+this.TerceraEdad[i];
//     }
    

//     // Calculo energia parasita (10%)
//     for (let i = 0; i < 24; i++) {
//       this.Sumatoria[i]=this.Sumatoria[i]*1.10;
//     }   
    

//     // Calculo sum
//     for (let i = 0; i < 24; i++) {
//       this.sum=this.sum+this.Sumatoria[i];
//       this.sumf=this.sum;
//     }
//     this.sum=0;
    

//     // Calculo Fraccion
//     for (let i = 0; i < 24; i++) {
//       this.Fraccion[i]=this.Sumatoria[i]/this.sumf;
//     }
    
    

//     // Calculo Vector
//     for (let i = 0; i < 24; i++) {
//       this.Vector[i]=(this.Fraccion[i]*this.Consumo)/0.04;
//     }
//     console.log(this.Vector)

    

//   //  Actualizar grafico
//     this.chart.update();

//    this.cal=this.Vector[23];
//   }
// cal;  

//   // Grafico
//   lineChartData: ChartDataSets[] = [
//     { data: this.Vector, label: 'Curva de Carga [kWh]' },
//   ];

//   lineChartLabels: Label[] = ['0-1','1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14','14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23','23-24'];

//   lineChartOptions = {
//     responsive: true,
//   };

//   public lineChartColors: Color[] = [
//     { // grey
//       backgroundColor: 'rgba(148,159,177,0.2)',
//       borderColor: 'rgba(148,159,177,1)',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//     },
//     { // dark grey
//       backgroundColor: 'rgba(77,83,96,0.2)',
//       borderColor: 'rgba(77,83,96,1)',
//       pointBackgroundColor: 'rgba(77,83,96,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(77,83,96,1)'
//     },
//     { // red
//       backgroundColor: 'rgba(255,0,0,0.3)',
//       borderColor: 'red',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//     }
//   ];
  

//   lineChartLegend = true;
//   lineChartPlugins = [];
//   lineChartType = 'line';

//   // Cambiar pagina a calculos
//   @Output() featureSelected = new EventEmitter<string>();
//   onSelect(feature:string){
//     this.featureSelected.emit(feature);
//   }