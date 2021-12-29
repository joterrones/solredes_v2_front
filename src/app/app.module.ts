import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { routing1, appRoutingProviders } from './app.routing';
import {ObserversModule} from '@angular/cdk/observers';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from './component/base/base.component';
import { LoginComponent } from './component/seguridad/login/login.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './component/general/home/home.component';
import { MenuComponent } from './component/general/menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MapaComponent } from './component/general/mapa/mapa.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResumenComponent } from './component/general/resumen/resumen.component';
import { DashboadComponent } from './component/general/dashboad/dashboad.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SnackComponent } from './component/generico/snack/snack.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioComponent } from './component/seguridad/usuario/usuario.component';
import { UsuarioeditarComponent } from './component/seguridad/usuarioeditar/usuarioeditar.component';
import { ResetearclaveComponent } from './component/generico/resetarclave/resetarclave.component';
import { ConfirmarComponent } from './component/generico/confirmar/confirmar.component';

import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ProyectoComponent } from './component/visualizacion/proyecto/proyecto.component';
import { ProyectoeditComponent } from './component/visualizacion/proyectoedit/proyectoedit.component';
import { TipoproyectoComponent } from './component/configuracion/tipoproyecto/tipoproyecto.component';
import { TipoproyectoeditComponent } from './component/configuracion/tipoproyectoedit/tipoproyectoedit.component';
import { TipoproyectoconfigComponent } from './component/configuracion/tipoproyectoconfig/tipoproyectoconfig.component';
import { FaseComponent } from './component/configuracion/fase/fase.component';
import { FaseeditComponent } from './component/configuracion/faseedit/faseedit.component';
import { ActividadComponent } from './component/configuracion/actividad/actividad.component';
import { TareaComponent } from './component/configuracion/tarea/tarea.component';
import { ActividadeditComponent } from './component/configuracion/actividadedit/actividadedit.component';
import { TareaeditComponent } from './component/configuracion/tareaedit/tareaedit.component';
import { GrupoComponent } from './component/configuracion/grupo/grupo.component';
import { TareaconfigComponent } from './component/configuracion/tareaconfig/tareaconfig.component';
import { ProyectoconfigComponent } from './component/visualizacion/proyectoconfig/proyectoconfig.component';
import { ProyectoregistroComponent } from './component/visualizacion/proyectoregistro/proyectoregistro.component';

import { MatTabsModule } from '@angular/material/tabs';
import { ConfirmComponent } from './component/general/confirm/confirm.component';
import { TarearegistroComponent } from './component/visualizacion/tarearegistro/tarearegistro.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProyectoubicacionComponent } from './component/visualizacion/proyectoubicacion/proyectoubicacion.component';
import { DetalleproyectoComponent } from './component/general/detalleproyecto/detalleproyecto.component';
import { VerificadorproyectoComponent } from './component/visualizacion/verificadorproyecto/verificadorproyecto.component';
import { DiaferiadoComponent } from './component/configuracion/diaferiado/diaferiado.component';
import { ProyectofechaComponent } from './component/visualizacion/proyectofecha/proyectofecha.component';
import { LineatiempoComponent } from './component/visualizacion/lineatiempo/lineatiempo.component';
import { ProyectousuarioComponent } from './component/seguridad/proyectousuario/proyectousuario.component';
import { ExportperfilxlsComponent } from './component/exportar/exportperfilxls/exportperfilxls.component';
import { BolsaproyectoComponent } from './component/general/bolsaproyecto/bolsaproyecto.component';
import { BolsaproyectoeditComponent } from './component/general/bolsaproyectoedit/bolsaproyectoedit.component';
import { BolsaproyectoubicacionComponent } from './component/general/bolsaproyectoubicacion/bolsaproyectoubicacion.component';
import { VersionComponent } from './component/general/version/version.component';
import { ProgramaComponent } from './component/general/programa/programa.component';
import { VersioneditComponent } from './component/general/versionedit/versionedit.component';
import { ExportControlObraXlsComponent } from './component/exportar/export-control-obra-xls/export-control-obra-xls.component';
import { LineatiempototalComponent } from './component/visualizacion/lineatiempototal/lineatiempototal.component';
import {MatChipsModule} from '@angular/material/chips';
import { TarearegistroguardarComponent } from './component/visualizacion/tarearegistroguardar/tarearegistroguardar.component';
import { SituacionComponent } from './component/visualizacion/situacion/situacion.component';
import { ExportControlSupervisorComponent } from './component/exportar/export-control-supervisor/export-control-supervisor.component';
import { CartafianzaComponent } from './component/visualizacion/cartafianza/cartafianza.component';
import { ExportalldataComponent } from './component/exportar/exportalldata/exportalldata.component';
import { CurvasComponent } from './component/visualizacion/curvas/curvas.component';
import { Exportalldata2Component } from './component/exportar/exportalldata2/exportalldata2.component';
import { BolsaproyectodetalleComponent } from './component/general/bolsaproyectodetalle/bolsaproyectodetalle.component';
import { ExportbolsaproyectoComponent } from './component/exportar/exportbolsaproyecto/exportbolsaproyecto.component';
import { DashboardbolsaComponent } from './component/general/dashboardbolsa/dashboardbolsa.component';
import { ExportdatoadicionalComponent } from './component/exportar/exportdatoadicional/exportdatoadicional.component';
import { RoleditarComponent } from './component/seguridad/roleditar/roleditar.component';
import { RolComponent } from './component/seguridad/rol/rol.component';
import { LineaComponent } from './component/configGeneral/linea/linea.component';
import { EmpresaComponent } from './component/configGeneral/empresa/empresa.component';
import { EmpresaeditarComponent } from './component/configGeneral/empresaeditar/empresaeditar.component';
import { LineaeditarComponent } from './component/configGeneral/lineaeditar/lineaeditar.component';
import { TipolineaComponent } from './component/configGeneral/tipolinea/tipolinea.component';
import { TipolineaeditarComponent } from './component/configGeneral/tipolineaeditar/tipolineaeditar.component';
import { ZonaComponent } from './component/configGeneral/zona/zona.component';
import { ZonaeditComponent } from './component/configGeneral/zonaedit/zonaedit.component';
import { ConfproyectoComponent } from './component/configGeneral/confproyecto/confproyecto.component';
import { ConfproyectoeditarComponent } from './component/configGeneral/confproyectoeditar/confproyectoeditar.component';
import { TipofotoComponent } from './component/configGeneral/tipofoto/tipofoto.component';
import { TipofotoeditarComponent } from './component/configGeneral/tipofotoeditar/tipofotoeditar.component';
import { EstructuraComponent } from './component/configGeneral/estructura/estructura.component';
import { EstructuraeditarComponent } from './component/configGeneral/estructuraeditar/estructuraeditar.component';
import { TipoempresaComponent } from './component/configGeneral/tipoempresa/tipoempresa.component';
import { TipoempresaeditarComponent } from './component/configGeneral/tipoempresaeditar/tipoempresaeditar.component';
import { AlmacenComponent } from './component/almacen/almacen/almacen.component';
import { AlmaceneditarComponent } from './component/almacen/almaceneditar/almaceneditar.component';
import { GuiaComponent } from './component/almacen/guia/guia.component';
import { GuiaeditarComponent } from './component/almacen/guiaeditar/guiaeditar.component';
import { GuiadetalleComponent } from './component/almacen/detalleguia/guiadetalle.component';
import { GuiadetalleeditarComponent } from './component/almacen/detalleguiaeditar/guiadetalleeditar.component';
import { AdmiArchivosComponent } from './component/archivos/admi-archivos/admi-archivos.component';
import { AdmiArchivosEditarComponent } from './component/archivos/admi-archivos-editar/admi-archivos-editar.component';
import { ArchivosComponent } from './component/archivos/archivos/archivos.component';
import { ArchivosEditarComponent } from './component/archivos/archivos-editar/archivos-editar.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    MapaComponent,
    ResumenComponent,
    DashboadComponent,
    SnackComponent,
    UsuarioComponent,
    UsuarioeditarComponent,
    ResetearclaveComponent,
    ConfirmarComponent,
    ProyectoComponent,    
    ProyectoeditComponent,
    TipoproyectoComponent,
    TipoproyectoeditComponent,
    TipoproyectoconfigComponent,
    FaseComponent,
    FaseeditComponent,
    ActividadComponent,
    ActividadeditComponent,
    TareaComponent,
    TareaeditComponent,
    GrupoComponent,
    TareaconfigComponent,
    ProyectoconfigComponent,
    ProyectoregistroComponent,
    ConfirmComponent,
    TarearegistroComponent,
    ProyectoubicacionComponent,
    DetalleproyectoComponent,
    VerificadorproyectoComponent,
    DiaferiadoComponent,
    ProyectofechaComponent,
    LineatiempoComponent,
    ProyectousuarioComponent,
    ExportperfilxlsComponent,
    BolsaproyectoComponent,
    BolsaproyectoeditComponent,
    BolsaproyectoubicacionComponent,
    VersionComponent,
    ProgramaComponent,
    VersioneditComponent,
    ExportControlObraXlsComponent,
    LineatiempototalComponent,
    TarearegistroguardarComponent,
    SituacionComponent,
    ExportControlSupervisorComponent,
    CartafianzaComponent,
    ExportalldataComponent,
    CurvasComponent,
    Exportalldata2Component,
    BolsaproyectodetalleComponent,
    ExportbolsaproyectoComponent,
    DashboardbolsaComponent,
    ExportdatoadicionalComponent,
    RoleditarComponent,
    RolComponent,
    LineaComponent,
    EmpresaComponent,
    EmpresaeditarComponent,
    LineaeditarComponent,
    TipolineaComponent,
    TipolineaeditarComponent,
    ZonaComponent,
    ZonaeditComponent,       
    ConfproyectoComponent, 
    ConfproyectoeditarComponent, 
    TipofotoComponent,
    TipofotoeditarComponent, 
    EstructuraComponent, 
    EstructuraeditarComponent, 
    TipoempresaComponent, 
    TipoempresaeditarComponent, 
    AlmacenComponent, 
    AlmaceneditarComponent, 
    GuiaComponent, 
    GuiaeditarComponent, 
    GuiadetalleComponent, 
    GuiadetalleeditarComponent, 
    AdmiArchivosComponent, 
    AdmiArchivosEditarComponent, 
    ArchivosComponent, 
    ArchivosEditarComponent,   
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    routing1,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmJsMarkerClustererModule,
    MatStepperModule,
    MatTabsModule,
    MatChipsModule,
    ObserversModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpcWweoH2IqPSGvBX91N46EsIdY-IfNiY'
    })
  ],
  entryComponents: [
    SnackComponent,
    ResetearclaveComponent,
    UsuarioeditarComponent,
    ProyectoeditComponent,
    TipoproyectoeditComponent,
    TipoproyectoconfigComponent,
    FaseeditComponent,
    ActividadeditComponent,
    TareaeditComponent,
    TareaconfigComponent,
    ProyectoconfigComponent,
    ProyectoregistroComponent,
    ConfirmComponent,
    DetalleproyectoComponent,
    ProyectofechaComponent,
    ProyectousuarioComponent,
    TarearegistroComponent,
    BolsaproyectoeditComponent,
    VersioneditComponent,
    SituacionComponent,
    CartafianzaComponent
  ],
  providers: [
    MatDatepickerModule, 
    DatePipe,
    appRoutingProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy  },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService ,multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
