//Importar modulos de router de angular
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';


//import
import {LoginComponent} from './component/seguridad/login/login.component';
import { AppComponent } from './app.component';
import { DashboadComponent} from './component/general/dashboard/dashboad/dashboad.component';
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
import { TragrupoComponent } from './component/asignacion/tragrupo/tragrupo.component';
import { ImportacionLineaComponent } from './component/importacion-linea/importacion-linea.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { ImportacionSuministrosComponent } from './component/importacion-suministros/importacion-suministros.component';
import { ImportacionMontajeComponent } from './component/importacion-montaje/importacion-montaje.component';
import { TipoelementoComponent } from './component/configGeneral/tipoelemento/tipoelemento.component';
import { CategoriatipomontajeComponent } from './component/configGeneral/categoriatipomontaje/categoriatipomontaje.component';
import { ElementoComponent } from './component/elemento/elemento.component';
import { ArmadoComponent } from './component/armado/armado.component';
import { MetradoComponent } from './component/metrado/metrado.component';
import { MetradomontajeComponent } from './component/metradomontaje/metradomontaje.component';
import { FichaComponent } from './component/ficha/ficha.component';
import { PeriodoComponent } from './component/configGeneral/periodo/periodo.component';
import { PartidamontajeComponent } from './component/configGeneral/partidamontaje/partidamontaje.component';
import { DataUsuarioProComponent } from './component/data-usuario-pro/data-usuario-pro.component';
import { DatosMonitoreoComponent } from './component/datos-monitoreo/datos-monitoreo.component';
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
    {path:'zonas',component:ZonaComponent},
    {path:'confproyecto',component:ConfproyectoComponent},
    {path:'tipofoto',component:TipofotoComponent},
    {path:'tipoempresa',component:TipoempresaComponent},
    {path:'almacen',component:AlmacenComponent},
    {path:'importacionplanilla',component:ImportacionPlanillaComponent},
    {path:'importacionlinea',component:ImportacionLineaComponent},
    {path:'mapalinea/:n_idpl_linea/:c_nombre/:c_nombrez/:c_nombret',component:MapaLineaComponent},
    {path:'mapageneral',component:MapaGeneralComponent},
    {path:'proyectoseleccion',component:ProyectoSeleccionComponent},
    {path:'guia/:n_idalm_almacen/:c_nombre',component:GuiaComponent},
    {path:'guiadetalle/:n_idalm_guia/:c_nombre/:c_nombreAlmacen/:n_idalm_almacen',component:GuiadetalleComponent},
    {path:'AdmArchivos',component:AdmiArchivosComponent},    
    {path:'valoresGenerales',component:ValoresGeneralesComponent}, 
    {path:'tragrupos',component:TragrupoComponent},
    {path:'principal',component:PrincipalComponent},
    {path:'importacionsuministros',component:ImportacionSuministrosComponent}, 
    {path:'importacionmontaje',component:ImportacionMontajeComponent}, 
    {path:'tipoelemento',component:TipoelementoComponent},
    {path:'tipomontaje',component:CategoriatipomontajeComponent}, 
    {path:'elemento',component:ElementoComponent},
    {path:'armado',component:ArmadoComponent}, 
    {path:'metrado/:n_idpl_linea/:n_idpl_tipolinea',component:MetradoComponent},
    {path:'metradomon/:n_idpl_linea/:n_idpl_tipolinea',component:MetradomontajeComponent},
    {path:'ficha',component:FichaComponent},
    {path:'periodo',component:PeriodoComponent},
    {path:'partidamontaje',component:PartidamontajeComponent},
    {path:'data_usuario_pro',component:DataUsuarioProComponent},
    {path:'datosMonitoreo',component:DatosMonitoreoComponent},
    {path:'**',component:LoginComponent},    
     
]
export const appRoutingProviders: any[]=[];
export const routing1:ModuleWithProviders=RouterModule.forRoot(appRoutes)