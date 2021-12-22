//Importar modulos de router de angular
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';


//import
import {LoginComponent} from './component/seguridad/login/login.component';
import { AppComponent } from './app.component';
import { MapaComponent} from './component/general/mapa/mapa.component';
import { DashboadComponent} from './component/general/dashboad/dashboad.component';
import { UsuarioComponent } from './component/seguridad/usuario/usuario.component';
import { ProyectoComponent } from './component/visualizacion/proyecto/proyecto.component';
import { TipoproyectoComponent } from './component/configuracion/tipoproyecto/tipoproyecto.component';
import { DiaferiadoComponent } from './component/configuracion/diaferiado/diaferiado.component';
import { GrupoComponent } from './component/configuracion/grupo/grupo.component';
import { LineatiempoComponent } from './component/visualizacion/lineatiempo/lineatiempo.component';
import { LineatiempototalComponent } from './component/visualizacion/lineatiempototal/lineatiempototal.component';
import { ExportperfilxlsComponent } from './component/exportar/exportperfilxls/exportperfilxls.component';
import { ExportControlObraXlsComponent } from './component/exportar/export-control-obra-xls/export-control-obra-xls.component';
import { ExportControlSupervisorComponent } from './component/exportar/export-control-supervisor/export-control-supervisor.component';
import { ExportalldataComponent } from './component/exportar/exportalldata/exportalldata.component';
import { BolsaproyectoComponent} from './component/general/bolsaproyecto/bolsaproyecto.component';
import { VersionComponent} from './component/general/version/version.component';
import { ProgramaComponent} from './component/general/programa/programa.component';
import { CurvasComponent} from './component/visualizacion/curvas/curvas.component';
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


//Array de rutas
const appRoutes:Routes=[
    {path:'',component:ProyectoComponent},
    {path:'login',component:LoginComponent},
    {path:'grafico',component:DashboadComponent},
    {path:'usuario',component:UsuarioComponent},
    {path:'rol',component:RolComponent}   ,
    {path:'proyecto',component:ProyectoComponent},
    {path:'tipoproyecto',component:TipoproyectoComponent},
    {path:'grupo',component:GrupoComponent},
    {path:'mapa',component:MapaComponent},
    {path:'feriado',component:DiaferiadoComponent},
    {path:'lineatiempototal/:n_idgen_proyecto/:c_nombreproyecto',component:LineatiempototalComponent},
    {path:'curvas/:n_idgen_proyecto/:c_nombreproyecto',component:CurvasComponent},
    {path:'lineatiempo',component:LineatiempoComponent},
    {path:'excel',component:ExportperfilxlsComponent},
    {path:'obra',component:ExportControlObraXlsComponent},
    {path:'supervision',component:ExportControlSupervisorComponent},
    {path:'bolsaproyecto',component:BolsaproyectoComponent},
    {path:'version/:n_idgen_proyecto',component:VersionComponent},
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
    {path:'guia/:n_idalm_almacen/:c_nombre',component:GuiaComponent},
    {path:'guiadetalle/:n_idalm_guia/:c_nombre/:c_nombreAlmacen/:n_idalm_almacen',component:GuiadetalleComponent},
    {path:'**',component:ProyectoComponent},    
     
]
export const appRoutingProviders: any[]=[];
export const routing1:ModuleWithProviders=RouterModule.forRoot(appRoutes)