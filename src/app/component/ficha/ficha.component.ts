import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import * as JsPDF from 'jspdf';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { FichaService } from 'src/app/service/ficha.service';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css'],
  providers: [FichaService]
})
export class FichaComponent extends BaseComponent implements OnInit {
  datos: any
  datosFotos: any
  cont: number;
  constructor(
    public _ficha_service: FichaService,
    public dialogRef: MatDialogRef<FichaComponent>,  
    @Inject(MAT_DIALOG_DATA) public data,
    public snack_1: MatSnackBar,
    public _router: Router,
  ) {
    super(snack_1, _router)
  }
  
  ngOnInit() {
    this.getDatos();
  }

  getDatos(){
    let request = {
      n_idmon_inspeccion: this.data.n_idmon_inspeccion
    }
    console.log(request);    
    this._ficha_service.get(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {          
          this.datos = resultado.data
          console.log(this.datos);      
          this._ficha_service.getFoto(request,this.getToken().token).subscribe(
            result => {
              let resultado = <ResultadoApi>result;
              if (resultado.estado) {          
                this.datosFotos = resultado.data
                console.log(this.datosFotos);      
                this.descargarpdf2();
              } else {
                this.openSnackBar(resultado.mensaje, 99);
              }
            }, error => {
              try {
                this.openSnackBar(error.error.Detail, error.error.StatusCode);
              } catch (error) {
                this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
              }
            });
        } else {
          this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  descargarpdf() {
    var doc = new JsPDF();

    let element = this.datos[0];

    let marker = element;
    const fecha = new Date();

    doc.setLineWidth(0.5);//Ancho de las lineas siguientes 
    doc.line(15, 16, 195, 16); 
    doc.setFontSize(14); 
    doc.setFontStyle('bold');      
    doc.text('FICHA REMPLATEO', 85, 23, null, null);
    doc.line(15, 26, 195, 26); 

    var espacio = 24;

    doc.setFontSize(11); // Tamaño de la fuente
    doc.text('CÓDIGO', 60, espacio + 7, null, null,'center');
    doc.setFontSize(10)
    doc.setFontStyle('Arial');//Estilo de la fuente
    doc.text(marker.c_codigo, 60, espacio + 14, null, null,'center');

    doc.line(15, espacio + 9, 195, espacio + 9); 

    doc.setFontSize(11)
    doc.setFontStyle('bold');   
    doc.text('FECHA Y HORA', 150, espacio + 7, null, null,'center');
    doc.setFontSize(10)
    doc.setFontStyle('Arial');//Estilo de la fuente
    doc.text(fecha.toLocaleDateString()+' - '+fecha.toLocaleTimeString(), 150, espacio + 14, null, null,'center');
    doc.line(15, espacio + 18, 195, espacio + 18);  

    espacio+=4;
    //linea final
    doc.line(15, espacio + 245, 195, espacio + 245);

    doc.line(15, 16, 15, espacio + 245);
    doc.line(105, espacio-2, 105, espacio + 78);
    doc.line(195, 16, 195,  espacio + 245);

    doc.setFontSize(11);
    doc.setFontStyle('bold');

    
    doc.text('DATOS DEL USUARIO', 60, espacio + 19, null, null,'center');
    
    doc.line(15, espacio + 23, 105, espacio + 23); 
    doc.line(45, espacio + 23, 45, espacio + 43); 

    doc.setFontStyle('bold');
    doc.text('USUARIO', 30, espacio + 27, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    doc.text(marker.c_username, 75, espacio + 27, null, null,'center');

    doc.line(15, espacio + 29, 105, espacio + 29); 

    doc.setFontStyle('bold');
    doc.text('NOMBRES', 30, espacio + 34, null, null,'center');
    let name = marker.c_nombre1 +' '+ marker.c_nombre1;    
    doc.setFontStyle('Arial Narrow');
    doc.text(name, 75, espacio + 34, null, null,'center');

    doc.line(15, espacio + 36, 105, espacio + 36); 

    doc.setFontStyle('bold');
    doc.text('APELLIDOS', 30, espacio + 41, null, null,'center');
    let lastname = marker.c_appaterno +' '+marker.c_apmaterno;
    doc.setFontStyle('Arial Narrow');
    doc.text(lastname, 75, espacio + 41, null, null,'center');
    
    doc.setFontStyle('bold');
    doc.text('COORDENADAS', 120, espacio + 29, null, null,'center');
    doc.line(138, espacio + 14, 138, espacio + 43); 
    
    doc.setFontStyle('Arial Narrow');
    doc.text('LATITUD: '+ marker.c_latitud, 165, espacio + 25, null, null,'center');
    doc.text('LONGITUD: '+ marker.c_longitud, 165, espacio + 31, null, null,'center');
    doc.text('ALTITUD: '+ marker.n_altitud, 165, espacio + 37, null, null,'center');

    espacio += 10;

    doc.line(15, espacio + 33, 195, espacio + 33);
    
    doc.setFontStyle('bold');
    doc.text('ESTRUCTURA', 60, espacio + 38, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    doc.text(marker.c_codigoestructura, 60, espacio + 45, null, null,'center');

    doc.line(15, espacio + 41, 195, espacio + 41);

    doc.setFontStyle('bold');
    doc.text('CÓDIGOEDE', 150, espacio + 38, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    doc.text(marker.c_codigoede, 150, espacio + 45, null, null,'center');  

    doc.line(15, espacio + 48, 195, espacio + 48);

    doc.setFontStyle('bold');
    doc.text('ARMADO', 60, espacio + 53, null, null,'center');

    doc.line(15, espacio + 56, 195, espacio + 56);
    doc.line(45, espacio + 56, 45, espacio + 68); 

    doc.setFontStyle('bold');
    doc.text('NOMBRE', 30, espacio + 60, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    doc.text(marker.c_nombrearmado, 75, espacio + 60, null, null,'center');

    doc.line(15, espacio + 62, 105, espacio + 62);
    

    doc.setFontStyle('bold');
    doc.text('CÓDIGO', 30, espacio + 66, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    doc.text(marker.c_codigoarmado, 75, espacio + 66, null, null,'center');

    doc.line(15, espacio + 68, 195, espacio + 68);

    doc.setFontStyle('bold');
    doc.text('OBSERVACIÓN: ', 150, espacio + 53, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    doc.text(marker.c_observacion, 150, espacio + 64, null, null,'center');  

    doc.setFontStyle('bold');
    doc.text('FOTOS', 105, espacio + 74, null, null,'center');
    doc.line(15, espacio + 77, 195, espacio + 77);

    espacio += 90;
    var r = 0;
    var i = 0;

    /*this.datos.forEach( async element => { 
      let imageSrcString = await this.toDataURL(environment.urlArchivo+element.c_rutafoto);    
      doc.addImage(imageSrcString,'JPEG',i + 27, espacio, 45, 45);    
      doc.text(marker.nfoto,i + 27, espacio-0.5, null, null);
      i+=55;
      if(i >= 165){        
        i = 0;
        espacio += 57;
      }
      r++;
      if(espacio >= 225){        
        doc.addPage();
        espacio = 20;
        doc.setLineWidth(0.5);
        doc.line(15, espacio, 195, espacio);   
        doc.line(15, espacio + 260, 195, espacio + 260);

        doc.line(15, espacio, 15, espacio + 260);
        doc.line(195, espacio, 195, espacio + 260);
        espacio += 15;
      }
      if(this.datos.length <= r){
        console.log(espacio)
        doc.save("PDF.pdf")
      }
    });     */
    doc.save("PDF.pdf")
  }

  descargarpdf2= async ()=> {
    var doc = new JsPDF();

    let element = this.datos[0];

    let marker = element;
    const fecha = new Date();
    doc.setDrawColor(0);
    doc.setFillColor(174, 174, 174);
    doc.rect(15, 16, 180, 10, 'F');

    doc.setFillColor(200, 200, 200);
    /*CÓDIGO FECHA HORA */
    doc.rect(15, 26, 180, 7, 'F');
    /*DATOS USUARIOS */
    doc.rect(15, 41, 180, 9, 'F');

    doc.rect(15, 50, 30, 27, 'F');
    doc.rect(105, 50, 37, 27, 'F');

    doc.rect(15, 70, 180, 8, 'F');
    doc.rect(15, 85, 180, 8, 'F');
    /*ARMADO*/
    doc.rect(15, 100, 180, 9, 'F');
    

    doc.setLineWidth(0.5);//Ancho de las lineas siguientes 
    doc.line(15, 16, 195, 16); 
    doc.setFontSize(14); 
    doc.setFontStyle('bold');      
    doc.text('FICHA MONTAJE', 85, 23, null, null);
    doc.line(15, 26, 195, 26); 

    var espacio = 24;

    doc.setFontSize(11); // Tamaño de la fuente
    doc.text('CÓDIGO', 60, espacio + 7, null, null,'center');
    doc.setFontSize(10)
    doc.setFontStyle('Arial');//Estilo de la fuente
    doc.text(marker.c_codigo, 60, espacio + 14, null, null,'center');

    doc.line(15, espacio + 9, 195, espacio + 9); 

    doc.setFontSize(11)
    doc.setFontStyle('bold');   
    doc.text('FECHA Y HORA', 150, espacio + 7, null, null,'center');
    doc.setFontSize(10)
    doc.setFontStyle('Arial');//Estilo de la fuente
    doc.text(fecha.toLocaleDateString()+' - '+fecha.toLocaleTimeString(), 150, espacio + 14, null, null,'center');
    doc.line(15, espacio + 17, 195, espacio + 17);  

    espacio+=3;
    //linea final
    doc.line(15, espacio + 245, 195, espacio + 245);

    doc.line(15, 16, 15, espacio + 245);
    doc.line(105, espacio-1, 105, espacio + 73);
    doc.line(195, 16, 195,  espacio + 245);

    doc.setFontSize(11);
    doc.setFontStyle('bold');

    
    doc.text('DATOS DEL USUARIO', 60, espacio + 20, null, null,'center');
    
    doc.line(15, espacio + 23, 195, espacio + 23); 
    doc.line(45, espacio + 23, 45, espacio + 43); 

    doc.setFontStyle('bold');
    doc.text('USUARIO', 19, espacio + 27, null, null,'left');
    doc.setFontStyle('Arial Narrow');
    doc.text(marker.c_username, 75, espacio + 27, null, null,'center');

    doc.line(15, espacio + 29, 195, espacio + 29); 

    doc.setFontStyle('bold');
    doc.text('NOMBRES', 19, espacio + 34, null, null,'left');
    let name = marker.c_nombre1 +' '+ marker.c_nombre1;    
    doc.setFontStyle('Arial Narrow');
    doc.text(name, 75, espacio + 34, null, null,'center');

    doc.line(15, espacio + 36, 195, espacio + 36); 

    doc.setFontStyle('bold');
    doc.text('APELLIDOS', 19, espacio + 41, null, null,'left');
    let lastname = marker.c_appaterno +' '+marker.c_apmaterno;
    doc.setFontStyle('Arial Narrow');
    doc.text(lastname, 75, espacio + 41, null, null,'center');
    
    doc.setFontStyle('bold');
    doc.text('COORDENADAS', 150, espacio + 20, null, null,'center');
    //doc.line(142, espacio + 14, 142, espacio + 43); 
    doc.line(142, espacio + 23, 142, espacio + 43); 

    doc.setFontStyle('bold');
    doc.text('LATITUD', 112, espacio + 27, null, null,'left');
    doc.text('LONGITUD', 112, espacio + 34, null, null,'left');
    doc.text('ALTITUD', 112, espacio + 41, null, null,'left');

    doc.setFontStyle('Arial Narrow');
    doc.text(''+marker.c_latitud, 170, espacio + 27, null, null,'center');
    doc.text(''+marker.c_longitud, 170, espacio + 34, null, null,'center');
    doc.text(''+marker.n_altitud, 170, espacio + 41, null, null,'center');

    espacio += 10;

    doc.line(15, espacio + 33, 195, espacio + 33);
    
    doc.setFontStyle('bold');
    doc.text('Zona', 60, espacio + 38, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    if (marker.c_nombrez) {
      doc.text(marker.c_nombrez, 60, espacio + 46, null, null,'center');
    } else {
      doc.text("", 60, espacio + 46, null, null,'center');
    }
    
    doc.line(15, espacio + 41, 195, espacio + 41);

    doc.setFontStyle('bold');
    doc.text('Tipo Línea: ', 150, espacio + 38, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    if (marker.c_nombretipolinea) {
      doc.text(marker.c_nombretipolinea, 150, espacio + 46, null, null,'center');  
    }else{
      doc.text("", 150, espacio + 46, null, null,'center');  
    }
    

    doc.line(15, espacio + 48, 195, espacio + 48);

    espacio += 15;
    /**153435435465465645465 */
    doc.setFontStyle('bold');
    doc.text('LÍNEA', 60, espacio + 38, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    if (marker.c_nombrelinea) {
      doc.text(marker.c_nombrelinea, 60, espacio + 46, null, null,'center'); 
    } else {
      doc.text("", 60, espacio + 46, null, null,'center');
    }
    
    doc.line(15, espacio + 41, 195, espacio + 41);

    doc.setFontStyle('bold');
    doc.text('ESTRUCTURA: ', 150, espacio + 38, null, null,'center');
    doc.setFontStyle('Arial Narrow');
    if (marker.c_codigoestructura) {
      doc.text(marker.c_codigoestructura, 150, espacio + 46, null, null,'center');  
    }else{
      doc.text("", 150, espacio + 46, null, null,'center');  
    }
    

    doc.line(15, espacio + 48, 195, espacio + 48);

    doc.setFontSize(12);
    doc.setFontStyle('bold');
    doc.text('ARMADOS', 105, espacio + 54, null, null, 'center');    
    doc.setFontSize(10);
    doc.line(15, espacio + 57, 195, espacio + 57);

    espacio += 10;
    
    doc.setFontStyle('bold');
    doc.text('CÓDIGO', 45, espacio + 54.5, null, null,'center');
    //doc.text('NOMBRE', 80, espacio + 54.5, null, null,'center');
    doc.text('CANTIDAD', 80, espacio + 54.5, null, null,'center');
    doc.text('OBSERVACIÓN', 130, espacio + 54.5, null, null,'center');
    
    
    doc.line(25, espacio + 56, 183, espacio + 56);
    
    let e = 61;
    let a = 1;
    this.datos.forEach(element => {      
      doc.setFontStyle('Arial Narrow');
      if (element.c_codigoarmado) {
        doc.text(element.c_codigoarmado, 45, espacio + e, null, null,'center');
      }else{
        doc.text("", 45, espacio + e, null, null,'center');
      }
      
      if (element.n_cantidad) {
        doc.text(''+element.n_cantidad, 80, espacio + e, null, null,'center');
      }else{
        doc.text('', 80, espacio + e, null, null,'center');
      }
      
      if (element.c_observacion && element.c_observacion != '' && element.c_observacion != null) {
        doc.text(element.c_observacion, 130, espacio + e, null, null,'center');
      } /*else {
        doc.text("", 130, espacio + e, null, null,'center');
      }*/
      
      if(element.c_observacion2){ 
        e+=4;
        if(element.c_observacion2 === ' Falta grapa “U”.'){
          doc.text("Falta grapa \"U\".", 130, espacio + e, null, null,'center');
        }else{
          doc.text(element.c_observacion2, 130, espacio + e, null, null,'center');
        }
      }      
      if(this.datos.length > a ){
        e++;
        doc.setLineWidth(0.1);
        doc.line(28, espacio + e, 179, espacio + e);
      }
      a++;
      e +=5;
      doc.setLineWidth(0.5);
      this.cont = espacio + e;
      if(this.cont >= 225){
        e = 5;
        doc.addPage();
        espacio = 20;
        doc.setLineWidth(0.5);
        doc.line(15, espacio, 195, espacio);   
        doc.line(15, espacio + 260, 195, espacio + 260);

        doc.line(15, espacio, 15, espacio + 260);
        doc.line(195, espacio, 195, espacio + 260);
    }
    }); 
    
    espacio = this.cont
    doc.setFillColor(200, 200, 200);
    doc.rect(15.5, espacio, 179.5, 8, 'F');
    doc.line(15, espacio, 195, espacio);
    doc.setFontSize(12);
    doc.setFontStyle('bold');
    doc.text('FOTOS', 105, espacio + 5, null, null,'center');
    doc.line(15, espacio + 8, 195, espacio + 8);
    doc.setFontSize(10);
    espacio += 24;
    var r = 0;
    var i = 0;
    var t = this.datosFotos.length
    this.datosFotos.forEach( async element => {
      
      if(element.nfotodetalle){
        console.log('FOTO-------'+element.nfotodetalle.substring(0,2));
        console.log(environment.urlArchivo+'inspeccion/'+element.nfotodetalle.substring(0,2)+'/'+element.nfotodetalle);
        
        let imageSrcString = await this.toDataURL(environment.urlArchivo+'inspeccion/'+element.nfotodetalle.substring(0,2)+'/'+element.nfotodetalle);    
        doc.addImage(imageSrcString,'JPG',i + 27, espacio, 45, 45);    
        doc.text(element.nfoto,i + 27, espacio-0.5, null, null);
        i+=55;
        if(i >= 165){        
          i = 0;
          espacio += 57;
        }
        
        if(espacio >= 225){        
          doc.addPage();
          espacio = 20;
          doc.setLineWidth(0.5);
          doc.line(15, espacio, 195, espacio);   
          doc.line(15, espacio + 260, 195, espacio + 260);

          doc.line(15, espacio, 15, espacio + 260);
          doc.line(195, espacio, 195, espacio + 260);
          espacio += 15;
        }
      }
      r++;
      if(t <= r){
        console.log(r);
        console.log(espacio)
        doc.save("FICHA MONTAJE.pdf")
      }
    });
    //doc.save("PDF.pdf")
    this.dialogRef.close({ flag: true });
  } 
  
  toDataURL = async (url) => {
    var res = await fetch(url);
    var blob = await res.blob();
    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    return result
  };

  
}

