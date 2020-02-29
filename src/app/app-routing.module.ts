import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ProspectosComponent } from './components/prospectos/prospectos.component';
import { NormasComponent } from './components/normas/normas.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { CostosComponent } from './components/costos/costos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';


const routes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'prospectos', component: ProspectosComponent },
  { path: 'normas', component: NormasComponent },
  { path: 'tipo-servicio', component: TipoServicioComponent },
  { path: 'costos', component: CostosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: '', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: 'cotizacion', component: CotizacionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
