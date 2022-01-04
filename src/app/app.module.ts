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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { MatTabsModule } from '@angular/material/tabs';
import { ConfirmComponent } from './component/general/confirm/confirm.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProyectousuarioComponent } from './component/seguridad/proyectousuario/proyectousuario.component';
import { ExportperfilxlsComponent } from './component/exportar/exportperfilxls/exportperfilxls.component';
import { ProgramaComponent } from './component/general/programa/programa.component';
import { ExportControlObraXlsComponent } from './component/exportar/export-control-obra-xls/export-control-obra-xls.component';
import {MatChipsModule} from '@angular/material/chips';
import { ExportControlSupervisorComponent } from './component/exportar/export-control-supervisor/export-control-supervisor.component';;
import { ExportalldataComponent } from './component/exportar/exportalldata/exportalldata.component';
import { Exportalldata2Component } from './component/exportar/exportalldata2/exportalldata2.component';
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
import { ImportacionPlanillaComponent } from './component/importacion-planilla/importacion-planilla.component';
import { ProyectoSeleccionComponent } from './component/proyecto-seleccion/proyecto-seleccion.component';
import { AdmiArchivosComponent } from './component/archivos/admi-archivos/admi-archivos.component';
import { AdmiArchivosEditarComponent } from './component/archivos/admi-archivos-editar/admi-archivos-editar.component';
import { ArchivosEditarComponent } from './component/archivos/archivos-editar/archivos-editar.component';



@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    DashboadComponent,
    SnackComponent,
    UsuarioComponent,
    UsuarioeditarComponent,
    ResetearclaveComponent,
    ConfirmarComponent,
    ConfirmComponent,
    ProyectousuarioComponent,
    ExportperfilxlsComponent,
    ProgramaComponent,
    ExportControlObraXlsComponent,
    ExportControlSupervisorComponent,
    ExportalldataComponent,
    Exportalldata2Component,
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
    ImportacionPlanillaComponent, 
    ProyectoSeleccionComponent,   
    GuiadetalleeditarComponent, 
    AdmiArchivosComponent, 
    AdmiArchivosEditarComponent, 
<<<<<<< HEAD
    ArchivosEditarComponent, 
    UsuarioproyectoComponent, 
    ValoresGeneralesComponent, 
    ValoresGeneralesEditarComponent, 
    TragrupoComponent, 
    TragrupoEditarComponent, ProyectousuaioComponent,   
=======
    ArchivosComponent, 
    ArchivosEditarComponent, ImportacionLineaComponent, MapaLineaComponent,   
>>>>>>> b480092b0830b9518c6a67aa86f4dcb690c72431
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
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpcWweoH2IqPSGvBX91N46EsIdY-IfNiY'
    })
  ],
  entryComponents: [
    SnackComponent,
    ResetearclaveComponent,
    UsuarioeditarComponent,
    ConfirmComponent,
    ProyectousuarioComponent,
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
