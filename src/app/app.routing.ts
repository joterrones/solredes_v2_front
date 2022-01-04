//Importar modulos de router de angular
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';


//import
import {LoginComponent} from './component/seguridad/login/login.component';
import { AppComponent } from './app.component';
import { DashboadComponent} from './component/general/dashboad/dashboad.component';
import { UsuarioComponent } from './component/seguridad/usuario/usuario.component';
import { ExportperfilxlsComponent } from './component/exportar/exportperfilxls/exportperfilxls.component';
import { ExportControlObraXlsComponent } from './component/exportar/export-control-obra-xls/export-control-obra-xls.component';
import { ExportControlSupervisorComponent } from './component/exportar/export-control-supervisor/export-control-supervisor.component';
import { ExportalldataComponent } from './component/exportar/exportalldata/exportalldata.component';
import { ProgramaComponent} from './component/general/programa/programa.component';;
import { DashboardbolsaComponent } from './component/general/dashboardbolsa/dashboardbolsa.component';
import { RolComponent } from './component/seguridad/rol/rol.component';
import { LineaComponent } from './component/configGeneral/linea/linea.component';
import { EmpresaComponent } from './component/configGeneral/empresa/empresa.component';
import { TipolineaComponent } from './component/configGeneral/tipolinea/tipolinea.component';
import { ZonaComponent } from './component/configGeneral/zona/zona.component';
import { ConfproyectoComponent } from './component/configGeneral/confproyecto/confproyecto.component';
import { TipofotoComponent } from './component/configGeneral/tipofoto/tipofoto.component';
import { EstructuraComponent } from './component/configGeneral/estructura/estructura.component';
import { TipoempresaComponent } from './component/configGeneral/tipoempresa/tipoempresa.component';
import { AlmacenComponent } from './component/almacen/almacen/almacen.component';
import { GuiaComponent } from './component/almacen/guia/guia.component';
import { GuiadetalleComponent } from './component/almacen/detalleguia/guiadetalle.component';
import { ImportacionPlanillaComponent } from './component/importacion-planilla/importacion-planilla.component';
import { ProyectoSeleccionComponent } from './component/proyecto-seleccion/proyecto-seleccion.component';
import { AdmiArchivosComponent } from './component/archivos/admi-archivos/admi-archivos.component';
import { MapaLineaComponent } from './component/mapa-linea/mapa-linea.component';
import { MapaGeneralComponent } from './component/mapa-general/mapa-general.component';
import { ValoresGeneralesComponent } from './component/configGeneral/valores-generales/valores-generales.component'; 
import { TragrupoComponent } from './component/configGeneral/tragrupo/tragrupo.component';
import { ImportacionLineaComponent } from './component/importacion-linea/importacion-linea.component';

//Array de rutas
const appRoutes:Routes=[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'grafico',component:DashboadComponent},
    {path:'usuario',component:UsuarioComponent},
    {path:'rol',component:RolComponent}   ,
    {path:'excel',component:ExportperfilxlsComponent},
    {path:'obra',component:ExportControlObraXlsComponent},
    {path:'supervision',component:ExportControlSupervisorComponent},
    {path:'programa',component:ProgramaComponent},
    {path:'exportalldata',component:ExportalldataComponent},
    {path:'graficobolsa',component:DashboardbolsaComponent},
    {path:'app',component:AppComponent},
    {path:'linea',component:LineaComponent},
    {path:'empresa',component:EmpresaComponent},
    {path:'tipolinea',component:TipolineaComponent},
    {path:'zona',component:ZonaComponent},
    {path:'confproyecto',component:ConfproyectoComponent},
    {path:'tipofoto',component:TipofotoComponent},
    {path:'estructura',component:EstructuraComponent},
    {path:'tipoempresa',component:TipoempresaComponent},
    {path:'almacen',component:AlmacenComponent},
    {path:'importacionplanilla',component:ImportacionPlanillaComponent},
    {path:'importacionlinea',component:ImportacionLineaComponent},
    {path:'mapalinea',component:MapaLineaComponent},
    {path:'mapageneral',component:MapaGeneralComponent},
    {path:'proyectoseleccion',component:ProyectoSeleccionComponent},
    {path:'guia/:n_idalm_almacen/:c_nombre',component:GuiaComponent},
    {path:'guiadetalle/:n_idalm_guia/:c_nombre/:c_nombreAlmacen/:n_idalm_almacen',component:GuiadetalleComponent},
    {path:'AdmArchivos',component:AdmiArchivosComponent},    
    {path:'valoresGenerales',component:ValoresGeneralesComponent}, 
    {path:'tragrupos',component:TragrupoComponent},
    
    {path:'**',component:LoginComponent},    
     
]
export const appRoutingProviders: any[]=[];
export const routing1:ModuleWithProviders=RouterModule.forRoot(appRoutes)