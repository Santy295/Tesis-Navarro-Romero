import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RadService } from '../services/rad.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Options } from 'ng5-slider';
import { Data } from '../Model/registro';
import { Router} from '@angular/router';
import { Interpolation } from '@angular/compiler';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit{

  Costo=1;
  
  options: Options = {
    floor: 0.75,
    ceil: 1.25,
    step: 0.05,
    translate: (Costo: number): string => {
      return Costo + ' USD/W<sub>pico</sub>' ;
    }
  };

  Porcinver=60;
  
  options1: Options = {
    floor: 60,
    ceil: 100,
    step: 1,
    translate: (Porcinver: number): string => {
      return Porcinver + '%' ;
    }
  };
  
  @Input() Latitud2;
  @Input() Longitud2;
  Lat;
  Long;
  @Input() Area2;
  @Input() Consumo2;
  @Input() Ninos2;
  @Input() Adultos2;
  @Input() Ancianos2;
  @Input() AdultosT2;
  @Input() AncianosT2;
  @Input() P12;
  @Input() P22;
  @Input() P32;
  @Input() P42;
  @Input() Vector2;

 

  rad: any = [];
  beta = 10;
  Area;
  tabla: number;
  latitud;
  longitud;
  WpRequerido;
  WpDisponible;
  WpRequeridoC;
  WpDisponibleC;
  GenA;
  GenM;
  Generacion=[];
  LCOE;
  i=0.13;
  n=20;
  TIR;
  N=0;
  Ij = 0.1;
  Inversion;
  balance; 
  Ahorro;
  AhorroMensual;
  FC;
  PTotal:number;
  TRI;
  mWp;

  //Variables para calculo de generacion mensual
  Gen1=[];
  Gen2=[];
  Gen3=[];
  Gen4=[];
  Gen5=[];
  Gen6=[];
  Gen7=[];
  Gen8=[];
  Gen9=[];
  Gen10=[];
  Gen11=[];
  Gen12=[];
  VectorM=[];

  data: Data = {
    ID: 0,
    Latitud: 0,
    Longitud: 0,
    Area: 0,
    AreaUtil: 0,
    Adultos: 0,
    Niños: 0,
    Ancianos: 0,
    AdultosTrabajo: 0,
    AncianosTrabajo: 0,
    CocinaInd: '',
    Lavadora: '',
    Secadora: '',
    Calefon: '',
    GenAnual: 0,
    ConsumoMensual: 0,
    Inversion: 0,
    LCOE: 0,
    TIR: 0 
  };

  constructor(private radService: RadService, private router: Router) { }

  VANS;

  //CALCULO FOTOVOLTAICO 
  calcular(){  
    this.PTotal=parseInt(this.Adultos2)+parseInt(this.Ancianos2)+parseInt(this.Ninos2);
   
    
    this.Lat=this.Latitud2.toFixed(4);
    this.Long=this.Longitud2.toFixed(4);
    
    var DHI = this.rad.map(item => item.DHI);
    var GHI = this.rad.map(item => item.GHI);
    var day = this.rad.map(item => item.Day);
    var hour = this.rad.map(item => item.Hour);
    var lat = this.Latitud2;
    
    var IdI = GHI.map(function(x, index){ 
      return DHI[index] / (x+0.0000001) 
    });

    var W = hour.map(function(x){
      return -180+15*x
    })

    var dec = day.map(function(x){ 
      return 23.45*Math.sin((Math.PI/180)*360*(284+x)/365)
    });

    var Rbnum = dec.map(function(x, index){ 
      return Math.cos(lat*Math.PI/180+10*Math.PI/180)*Math.cos(x*Math.PI/180)*Math.cos(W[index]*Math.PI/180)+Math.sin(lat*Math.PI/180+10*Math.PI/180)*Math.sin(x*Math.PI/180);
    });

    var Rbden = dec.map(function(x,index){ 
      return Math.cos(lat*Math.PI/180)*Math.cos(x*Math.PI/180)*Math.cos(W[index]*Math.PI/180)+Math.sin(lat*Math.PI/180)*Math.sin(x*Math.PI/180);
    });

    var Rb = Rbnum.map(function(x,index){ 
      return x/Rbden[index];
    });

    for(var x=0;x<8760;x++){
      if(Rb[x]>2 || Rb[x]<0){
        Rb[x]=1;
      }
    }

    var R = IdI.map(function(x,index){ 
      return -(x-1)*Rb[index]+x*((1+Math.cos(10*Math.PI/180))/2)+(0.3/2)*(1-Math.cos(10*Math.PI/180));
    });

    var Hs = GHI.map(function(x,index){ 
      return x*R[index]/1000;
    }); 
    console.log(Rb)
    
    //CALCULO DE POTENCIA 
    var HsAnual = 0;
    for(var i=0; i< Hs.length; i++) {
    HsAnual += Hs[i]
    };
    //Coeficiente PR = 72%
    this.WpRequerido = this.Consumo2*1000*12/(HsAnual*0.72)

    //AreaUtil = 0.5*AreaDisponible
    //Capacidad = 120 W/m2 policristalino
    this.WpDisponible = this.Area*120*0.5;
    
    if(this.WpRequerido>this.WpDisponible){
       var Potencia = this.WpDisponible;
      this.mWp='Se escogió la potencia instalable dado que su vivienda no cuenta con el área suficiente para satisfacer su consumo.'
    }
    if(this.WpRequerido<this.WpDisponible){
      var Potencia = this.WpRequerido;
      this.mWp='Se escogió la potencia requerida la cual satisface su consumo energético.'
    }

    this.WpRequeridoC = this.WpRequerido.toFixed();
    this.WpDisponibleC = this.WpDisponible.toFixed();
   
    var Genv = Hs.map(function(x){ 
      return Potencia*x*0.72;
    });
   
    var Gena = 0;
    for(var i=0; i< Genv.length; i++) {
    Gena += Genv[i]/1000;

    var Genm = Gena/12;
    };    
    this.Generacion=Genv; 
    this.GenA=Gena.toFixed();
    this.GenM=Genm.toFixed();

    //Calculo vector para grafico de barras mensual
    for(let x=0; x<744; x++){
    this.Gen1[x]=this.Generacion[x];
    };
    var GenEne = 0;
    for(var i=0; i< this.Gen1.length; i++) {
    GenEne += this.Gen1[i]/1000
    };

    for(let x=744; x<1416; x++){
      this.Gen2[x-744]=this.Generacion[x];
    };    
    var GenFeb = 0;
    for(var i=0; i< this.Gen2.length; i++) {
    GenFeb += this.Gen2[i]/1000
    };

    for(let x=1416; x<2160; x++){
      this.Gen3[x-1416]=this.Generacion[x];
    };
    var GenMar = 0;
    for(var i=0; i< this.Gen3.length; i++) {
    GenMar += this.Gen3[i]/1000
    };

    for(let x=2160; x<2880; x++){
      this.Gen4[x-2160]=this.Generacion[x];
    };
    var GenAbr = 0;
    for(var i=0; i< this.Gen4.length; i++) {
    GenAbr += this.Gen4[i]/1000
    };

    for(let x=2880; x<3624; x++){
      this.Gen5[x-2880]=this.Generacion[x];
    };
    var GenMay = 0;
    for(var i=0; i< this.Gen5.length; i++) {
    GenMay += this.Gen5[i]/1000
    };

    for(let x=3624; x<4344; x++){
      this.Gen6[x-3624]=this.Generacion[x];
    };
    var GenJun = 0;
    for(var i=0; i< this.Gen6.length; i++) {
    GenJun += this.Gen6[i]/1000
    };

    for(let x=4344; x<5088; x++){
      this.Gen7[x-4344]=this.Generacion[x];
    };
    var GenJul = 0;
    for(var i=0; i< this.Gen7.length; i++) {
    GenJul += this.Gen7[i]/1000
    };

    for(let x=5088; x<5832; x++){
      this.Gen8[x-5088]=this.Generacion[x];
    };
    var GenAgo = 0;
    for(var i=0; i< this.Gen8.length; i++) {
    GenAgo += this.Gen8[i]/1000
    };

    for(let x=5832; x<6552; x++){
      this.Gen9[x-5832]=this.Generacion[x];
    };
    var GenSep = 0;
    for(var i=0; i< this.Gen9.length; i++) {
    GenSep += this.Gen9[i]/1000
    };

    for(let x=6552; x<7296; x++){
      this.Gen10[x-6552]=this.Generacion[x];
    };
    var GenOct = 0;
    for(var i=0; i< this.Gen10.length; i++) {
    GenOct += this.Gen10[i]/1000
    };

    for(let x=7296; x<8016; x++){
      this.Gen11[x-7296]=this.Generacion[x];
    };
    var GenNov = 0;
    for(var i=0; i< this.Gen11.length; i++) {
    GenNov += this.Gen11[i]/1000
    };

    for(let x=8016; x<8760; x++){
      this.Gen12[x-8016]=this.Generacion[x];
    };
    var GenDic = 0;
    for(var i=0; i< this.Gen12.length; i++) {
    GenDic += this.Gen12[i]/1000
    };

    this.VectorM = [GenEne.toFixed(),GenFeb.toFixed(),GenMar.toFixed(),GenAbr,GenMay.toFixed(),GenJun.toFixed(),GenJul.toFixed(),GenAgo.toFixed(),GenSep.toFixed(),GenOct.toFixed(),GenNov.toFixed(),GenDic.toFixed()];

    console.log(this.VectorM)

    //Indicadores tecnicos y economicos
    const inv = Potencia * this.Costo;
    const inv_anu = inv * this.i * (1+this.i)**(this.n) / (((1+this.i)**(this.n))-1);
    this.LCOE = 100 * inv_anu / this.GenA;
    this.LCOE = this.LCOE.toFixed(2);
    this.Inversion = inv.toFixed();

    var ConsumoA = this.Consumo2*12;
    if(Gena>ConsumoA){
      this.balance = ConsumoA;
    };
    if (Gena<ConsumoA){
      this.balance = Gena;
    }
    //Costo de la energia 0.095 [USD/kWh]
    var AhorroAnual = this.balance*0.095
    this.Ahorro = AhorroAnual/12;
    this.AhorroMensual = this.Ahorro.toFixed(2);


    var F1 = AhorroAnual;
    var F2 = AhorroAnual;
    var F3 = AhorroAnual;
    var credito=(1-this.Porcinver/100)*inv;
    var invC=inv-credito;

    //Calculo de cuota de prestamo (Metodo frances)

    var inversion=inv;
    var tasainteres=0.12;
    var plazoaños=3;
    var pagoprin=[];
    var pagoint=[];
    var cuota=[];
    var saldo=[];

    var calc1=Math.pow(1+tasainteres,plazoaños);
    var calc2=(calc1*tasainteres)/(calc1-1);

    saldo[0]=credito;
    pagoint[0]=-saldo[0]*tasainteres;
    pagoprin[0]=((credito*calc2)-(tasainteres*saldo[0]))*-1;
    cuota[0]=pagoint[0]+pagoprin[0];
    saldo[1]=saldo[0]+pagoprin[0];

    for(var x=1;x<plazoaños;x++){
      pagoint[x]=-saldo[x]*tasainteres;
      pagoprin[x]=((credito*calc2)-(tasainteres*saldo[x]))*-1;
      cuota[x]=pagoint[x]+pagoprin[x];
      saldo[x+1]=saldo[x]+pagoprin[x];
    }

    console.log(calc2);
    console.log(pagoint);
    console.log(pagoprin);
    console.log(cuota);
    console.log(saldo);

    var FF=[];

    for(var x=plazoaños;x<20;x++){
      cuota[x]=0;
    }

    
    console.log(cuota);
    FF[0]=-inversion+credito;
    for(var x=1;x<21;x++){
      FF[x]=AhorroAnual+cuota[x-1];
    }

    console.log(FF);

    //Valuar actual neto
    var tasadesc=0.13;
    var VAN=[];
    VAN[0]=FF[0];
    for(var x=1;x<21;x++){
      VAN[x]=FF[x]/(Math.pow(tasadesc+1,x))
    }
    console.log(VAN);

    var VANS1;
    var sumf=0;
    for (var x=0; x<21; x++) {
      sumf=sumf+VAN[x];
      VANS1=sumf;
    }
    sumf=0;
    console.log(VANS1);
    this.VANS=VANS1.toFixed(2);

    //Calculo de TRI

    var TRIV=[];
    TRIV[0]=FF[0]
    for (var x=1; x<21; x++) {
     TRIV[x]=TRIV[x-1]+FF[x];
    }

    var interpol=[];
    interpol[0]=1;
    for (var x=1; x<21; x++) {
      interpol[x]=(x-1)-(((TRIV[x-1]-0)/(TRIV[x-1]-TRIV[x]))*((x-1)-x));
    }

    var val;
    for (var x=1; x<21; x++) {
      if(TRIV[x]>0){
        val=x;
        break
      }
    }

    this.TRI=interpol[val].toFixed(2);
    console.log(TRIV);
    console.log(interpol);
    console.log(val);
    console.log(this.TRI);
    
    
    

    //Calculo de TIR
    this.Ij = 0.1;
    this.N=0;
    var numI = -invC+(FF[1]/(1+this.Ij)**1)+(FF[2]/(1+this.Ij)**2)+(FF[3]/(1+this.Ij)**3)+(FF[4]/(1+this.Ij)**4)+(FF[5]/(1+this.Ij)**5)+(FF[6]/(1+this.Ij)**6)+(FF[7]/(1+this.Ij)**7)+(FF[8]/(1+this.Ij)**8)+(FF[9]/(1+this.Ij)**9)+(FF[10]/(1+this.Ij)**10)+(FF[11]/(1+this.Ij)**11)+(FF[12]/(1+this.Ij)**12)+(FF[13]/(1+this.Ij)**13)+(FF[14]/(1+this.Ij)**14)+(FF[15]/(1+this.Ij)**15)+(FF[16]/(1+this.Ij)**16)+(FF[17]/(1+this.Ij)**17)+(FF[18]/(1+this.Ij)**18)+(FF[19]/(1+this.Ij)**19)+(FF[20]/(1+this.Ij)**20);
    var denI = -(FF[1]/(1+this.Ij)**2)-(2*FF[2]/(1+this.Ij)**3)-(3*FF[3]/(1+this.Ij)**4)-(4*FF[4]/(1+this.Ij)**5)-(5*FF[5]/(1+this.Ij)**6)-(6*FF[6]/(1+this.Ij)**7)-(7*FF[7]/(1+this.Ij)**8)-(8*FF[8]*F1/(1+this.Ij)**9)-(9*FF[9]/(1+this.Ij)**10)-(10*FF[10]/(1+this.Ij)**11)-(11*FF[11]/(1+this.Ij)**12)-(12*FF[12]/(1+this.Ij)**13)-(13*FF[13]/(1+this.Ij)**14)-(14*FF[14]/(1+this.Ij)**15)-(15*FF[15]/(1+this.Ij)**16)-(16*FF[16]/(1+this.Ij)**17)-(17*FF[17]/(1+this.Ij)**18)-(18*FF[18]/(1+this.Ij)**19)-(19*FF[19]/(1+this.Ij)**20)-(20*FF[20]/(1+this.Ij)**21);
    this.TIR = this.Ij-numI/denI;
 
    while(this.Ij-this.TIR!=0){
    this.N=this.N+1
    this.Ij = this.TIR;
    numI = -invC+(FF[1]/(1+this.Ij)**1)+(FF[2]/(1+this.Ij)**2)+(FF[3]/(1+this.Ij)**3)+(FF[4]/(1+this.Ij)**4)+(FF[5]/(1+this.Ij)**5)+(FF[6]/(1+this.Ij)**6)+(FF[7]/(1+this.Ij)**7)+(FF[8]/(1+this.Ij)**8)+(FF[9]/(1+this.Ij)**9)+(FF[10]/(1+this.Ij)**10)+(FF[11]/(1+this.Ij)**11)+(FF[12]/(1+this.Ij)**12)+(FF[13]/(1+this.Ij)**13)+(FF[14]/(1+this.Ij)**14)+(FF[15]/(1+this.Ij)**15)+(FF[16]/(1+this.Ij)**16)+(FF[17]/(1+this.Ij)**17)+(FF[18]/(1+this.Ij)**18)+(FF[19]/(1+this.Ij)**19)+(FF[20]/(1+this.Ij)**20);
    denI = -(FF[1]/(1+this.Ij)**2)-(2*FF[2]/(1+this.Ij)**3)-(3*FF[3]/(1+this.Ij)**4)-(4*FF[4]/(1+this.Ij)**5)-(5*FF[5]/(1+this.Ij)**6)-(6*FF[6]/(1+this.Ij)**7)-(7*FF[7]/(1+this.Ij)**8)-(FF[8]*F1/(1+this.Ij)**9)-(9*FF[9]/(1+this.Ij)**10)-(10*FF[10]/(1+this.Ij)**11)-(11*FF[11]/(1+this.Ij)**12)-(12*FF[12]/(1+this.Ij)**13)-(13*FF[13]/(1+this.Ij)**14)-(14*FF[14]/(1+this.Ij)**15)-(15*FF[15]/(1+this.Ij)**16)-(16*FF[16]/(1+this.Ij)**17)-(17*FF[17]/(1+this.Ij)**18)-(18*FF[18]/(1+this.Ij)**19)-(19*FF[19]/(1+this.Ij)**20)-(20*FF[20]/(1+this.Ij)**21);
    this.TIR = this.Ij-numI/denI;
    if (this.N>500){
      break;
    }
    };

    this.FC = this.GenA/(Potencia*365*24)
    
    this.TIR = (this.TIR * 100).toFixed(2);

    this.data.Latitud = this.Latitud2
    this.data.Longitud = this.Longitud2
    this.data.Area = this.Area2
    this.data.AreaUtil = this.Area2 * 0.5
    this.data.Niños = this.Ninos2
    this.data.Adultos = this.Adultos2
    this.data.Ancianos = this.Ancianos2
    this.data.AdultosTrabajo = this.AdultosT2
    this.data.AncianosTrabajo = this.AncianosT2
    this.data.CocinaInd = this.P12
    this.data.Lavadora = this.P22
    this.data.Secadora = this.P32
    this.data.Calefon = this.P42
    this.data.GenAnual = this.GenA
    this.data.ConsumoMensual = this.Consumo2
    this.data.Inversion = inv
    this.data.LCOE = this.LCOE
    this.data.TIR = this.TIR

    console.log(this.Porcinver)

    if (this.k==0){
    this.k=this.k+1;
    this.saveNewRegistro();
    }
    //Grafico barras mensual-anual
    this.GrapBarras();

    //Análisis
   
    var anaTIRtd;
    if(this.TIR<(tasadesc*100)){
     anaTIRtd='La TIR es menor a la tasa de descuento, por lo cual el proyecto no es rentable.' 
    };
    if(this.TIR>(tasadesc*100)){
      anaTIRtd='La TIR es mayor a la tasa de descuento, por lo cual el proyecto es rentable.' 
     };
     this.ATTd=anaTIRtd;

     if(this.VANS<0){
      this.AVAN='El VAN es negativo, lo cual indica una perdida monetaria del proyecto.' 
     };
     if(this.VANS>0){
      this.AVAN='El VAN es positivo, lo cual indica una ganancia monetaria del proyecto.' 
     };
     if(this.VANS==0){
       this.VANS= 'El VAN es cero por lo cual el proyecto es indiferente, no hay perdida ni ganancia.'
     }
     if(this.TIR==(tasadesc*100)){
       this.ATTd='TIR es igual a la tasa de descuento, proyecto indiferente.'
     }

     //Recomendaciones

     if(this.TIR< (tasadesc*100) || this.VANS<0){
       this.Recom='El proyecto no es viable, se recomienda disminuir el porcentaje de inversión propia o el valor de costo de Wp.'
     }else{
       this.Recom='El proyecto es viable, no hay recomendaciones.'
     }
  };

  k=0;
  ATTd;
  AVAN;
  Recom;
  saveNewRegistro() {
    delete this.data.ID;
    this.radService.saveData(this.data)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/registro']);
        },
        err => console.error(err)
      )
  }


  ngOnInit(){
    if(this.Latitud2) {
      this.latitud = this.Latitud2;
      this.longitud = this.Longitud2;
      this.Area = this.Area2;
      
      if(this.latitud<= 0.0681 && this.latitud>0.0266){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=1
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=2
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=3
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=4
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=5
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=6
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=7
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=8
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=9
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=10
        }
      };
  
      if(this.latitud<=0.0266 && this.latitud>-0.0149){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=11
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=12
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=13
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=14
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=15
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=16
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=17
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=18
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=19
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=20
        }
      };
  
      if(this.latitud<=-0.0149 && this.latitud>-0.0564){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=21
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=22
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=23
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=24
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=25
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=26
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=27
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=28
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=29
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=30
        }
      };
  
      if(this.latitud<=-0.0564 && this.latitud>-0.0979){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=31
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=32
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=33
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=34
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=35
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=36
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=37
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=38
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=39
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=40
        }
      };
  
      if(this.latitud<=-0.0979 && this.latitud>-0.1394){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=41
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=42
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=43
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=44
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=45
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=46
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=47
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=48
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=49
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=50
        }
      };
  
      if(this.latitud<=-0.1394 && this.latitud>-0.1809){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=51
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=52
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=53
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=54
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=55
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=56
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=57
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=58
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=59
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=60
        }
      };
  
      if(this.latitud<=-0.1809 && this.latitud>-0.2224){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=61
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=62
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=63
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=64
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=65
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=66
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=67
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=68
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=69
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=70
        }
      };
  
      if(this.latitud<=-0.2224 && this.latitud>-0.2639){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=71
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=72
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=73
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=74
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=75
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=76
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=77
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=78
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=79
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=80
        }
      };
  
      if(this.latitud<=-0.2639 && this.latitud>-0.3054){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=81
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=82
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=83
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=84
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=85
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=86
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=87
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=88
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=89
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=90
        }
      };
  
      if(this.latitud<=-0.3054 && this.latitud>-0.3469){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=91
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=92
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=93
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=94
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=95
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=96
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=97
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=98
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=99
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=100
        }
      };
  
      if(this.latitud<=-0.3469 && this.latitud>-0.3884){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=101
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=102
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=103
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=104
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=105
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=106
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=107
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=108
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=109
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=110
        }
      };
  
      if(this.latitud<=-0.3884 && this.latitud>=-0.4299){
        if(this.longitud>=-78.607 && this.longitud<-78.5655){
          this.tabla=111
        }
        else if(this.longitud>=-78.5655 && this.longitud<-78.5240){
          this.tabla=112
        }
        else if(this.longitud>=-78.5240 && this.longitud<-78.4825){
          this.tabla=113
        }
        else if(this.longitud>=-78.4825 && this.longitud<-78.4410){
          this.tabla=114
        }
        else if(this.longitud>=-78.4410 && this.longitud<-78.3995){
          this.tabla=115
        }
        else if(this.longitud>=-78.3995 && this.longitud<-78.3580){
          this.tabla=116
        }
        else if(this.longitud>=-78.3580 && this.longitud<-78.3165){
          this.tabla=117
        }
        else if(this.longitud>=-78.3165 && this.longitud<-78.2750){
          this.tabla=118
        }
        else if(this.longitud>=-78.2750 && this.longitud<-78.2335){
          this.tabla=119
        }
        else if(this.longitud>=-78.2335 && this.longitud<-78.1920){
          this.tabla=120
        }
      };
  
      this.radService.recibirDatos(this.tabla);
      console.log('Se accede al TMY '+this.tabla);
    };

    if(this.tabla) {
      this.radService.getRad().subscribe(
        res=> {
          this.rad = res;
        },
        err=> console.error(err)
      )
    };
    
  };
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  Label=['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21', '22', '23','24'];
  label=[];

  Mes;
  Vector3=[];
  Genera=[];

  Enero(){
    this.Mes='Enero';
    this.Dibujar();
  }

  Febrero(){
    this.Mes='Febrero';
    this.Dibujar();
  }

  Marzo(){
    this.Mes='Marzo';
    this.Dibujar();
  }

  Abril(){
    this.Mes='Abril';
    this.Dibujar();
  }

  Mayo(){
    this.Mes='Mayo';
    this.Dibujar();
  }

  Junio(){
    this.Mes='Junio';
    this.Dibujar();
  }

  Julio(){
    this.Mes='Julio';
    this.Dibujar();
  }

  Agosto(){
    this.Mes='Agosto';
    this.Dibujar();
  }

  Septiembre(){
    this.Mes='Septiembre';
    this.Dibujar();
  }

  Octubre(){
    this.Mes='Octubre';
    this.Dibujar();
  }

  Noviembre(){
    this.Mes='Noviembre';
    this.Dibujar();
  }

  Diciembre(){
    this.Mes='Diciembre';
    this.Dibujar();
  }
  Dias=[];

  Dibujar(){
    this.Vector3=[];
    this.Genera=[];
    this.Label=['24','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13','14', '15', '16', '17', '18', '19', '20', '21', '22','23'];
    this.label=[];
    console.log(this.Vector2);
    var contador=1;

    if(this.Mes==='Enero'){
      for(let x = 0; x<31; x++){
       for (let i = 0; i < 24; i++) {
       this.Vector3[this.Vector3.length]=this.Vector2[i];
       this.label[this.label.length]=this.Label[i];
       this.Dias[this.Dias.length]=contador;
       }
       contador=contador+1;
      }
      for(let x=0; x<744; x++){
        this.Genera[x]=this.Generacion[x];
      }
    } 
    if(this.Mes==='Febrero'){
      for(let x = 0; x<28; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
        this.label[this.label.length]=this.Label[i];
        this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=744; x<1416; x++){
        this.Genera[x-744]=this.Generacion[x];
      }
    } 

    if(this.Mes==='Marzo'){
      for(let x = 0; x<31; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=1416; x<2160; x++){
        this.Genera[x-1416]=this.Generacion[x];
      }
    } 

    if(this.Mes==='Abril'){
      for(let x = 0; x<30; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=2160; x<2880; x++){
        this.Genera[x-2160]=this.Generacion[x];
      }
    } 

    if(this.Mes==='Mayo'){
      for(let x = 0; x<31; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=2880; x<3624; x++){
        this.Genera[x-2880]=this.Generacion[x];
      }
    } 

    if(this.Mes==='Junio'){
      for(let x = 0; x<30; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=3624; x<4344; x++){
        this.Genera[x-3624]=this.Generacion[x];
      }
    } 

    if(this.Mes==='Julio'){
      for(let x = 0; x<31; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=4344; x<5088; x++){
        this.Genera[x-4344]=this.Generacion[x];
      }
    } 

    if(this.Mes==='Agosto'){
      for(let x = 0; x<31; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=5088; x<5832; x++){
        this.Genera[x-5088]=this.Generacion[x];
      }
    }

    if(this.Mes==='Septiembre'){
      for(let x = 0; x<30; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=5832; x<6552; x++){
        this.Genera[x-5832]=this.Generacion[x];
      }
    }

    if(this.Mes==='Octubre'){
      for(let x = 0; x<31; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=6552; x<7296; x++){
        this.Genera[x-6552]=this.Generacion[x];
      }
    }

    if(this.Mes==='Noviembre'){
      for(let x = 0; x<30; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=7296; x<8016; x++){
        this.Genera[x-7296]=this.Generacion[x];
      }
    }

    if(this.Mes==='Diciembre'){
      for(let x = 0; x<31; x++){
        for (let i = 0; i < 24; i++) {
        this.Vector3[this.Vector3.length]=this.Vector2[i];
         this.label[this.label.length]=this.Label[i];
         this.Dias[this.Dias.length]=contador;
        }
        contador=contador+1;
      }
      for(let x=8016; x<8760; x++){
        this.Genera[x-8016]=this.Generacion[x];
      }
    }
    
    this.chart.datasets[0].data=this.Vector3
    this.chart.datasets[1].data=this.Genera

    for(let x=0 ; x<this.label.length;x++){
      
      this.chart.labels[x]=[this.label[x],this.Dias[x]];
     
    }
   
    this.chart.update();
  }
    
  

  // Grafico
  lineChartData: ChartDataSets[] = [
    { data: this.Vector3, label: 'Consumo' },
    { data: this.Genera, label: 'Generación' },
  ];

  lineChartLabels: Label[] = this.label;

  lineChartOptions = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    { //  red
     
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // green
      backgroundColor: '#effcef',
      borderColor: '#21bf73',
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
    }
  ];
  

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  // Vector de grafico de barras
  VGB=[];
  VC=[];
  GrapBarras(){
    
    for (let i = 0; i < 12; i++) {
      this.VGB[i]=this.Consumo2;
    }
    console.log(this.VGB);
    for (let i = 0; i < 12; i++) {
      this.VC[i]=this.VectorM[i];
    }
  }
  
  // Grafico de barras //npm uninstall chartjs-plugin-datalabels --save
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], 
      yAxes: [{
        ticks: {
        min: 0
      },
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiebre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: this.VGB, label: 'Consumo [kWh]' },
    { data: this.VC, label: 'Generación [kWh]' }
  ];
};

