import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ProspectosComponent } from './components/prospectos/prospectos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule, MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddEmpresaComponent } from './components/empresas/modals/add-empresa/add-empresa.component';
import { EditEmpresaComponent } from './components/empresas/modals/edit-empresa/edit-empresa.component'; 
import { HttpClientModule } from '@angular/common/http';
import { AddProspectoComponent } from './components/prospectos/modals/add-prospecto/add-prospecto.component';
import { ValidarProspectoComponent } from './components/prospectos/modals/validar-prospecto/validar-prospecto.component';
import { NormasComponent } from './components/normas/normas.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { CostosComponent } from './components/costos/costos.component';
import { AddNormaComponent } from './components/normas/modals/add-norma/add-norma.component';
import { AddTipoServicioComponent } from './components/tipo-servicio/modals/add-tipo-servicio/add-tipo-servicio.component';
import { AddCostoComponent } from './components/costos/modals/add-costo/add-costo.component';
import { AddCotizacionComponent } from './components/cotizacion/modals/add-cotizacion/add-cotizacion.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AddServicioComponent } from './components/servicios/modals/add-servicio/add-servicio.component';
import { ValidarUnoComponent } from './components/servicios/modals/validar-uno/validar-uno.component';
import { ValidarDosComponent } from './components/servicios/modals/validar-dos/validar-dos.component';
import { ValidarTresComponent } from './components/servicios/modals/validar-tres/validar-tres.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresasComponent,
    ProspectosComponent,
    AddEmpresaComponent,
    EditEmpresaComponent,
    AddProspectoComponent,
    ValidarProspectoComponent,
    NormasComponent,
    TipoServicioComponent,
    CostosComponent,
    AddNormaComponent,
    AddTipoServicioComponent,
    AddCostoComponent,
    AddCotizacionComponent,
    ServiciosComponent,
    AddServicioComponent,
    ValidarUnoComponent,
    ValidarDosComponent,
    ValidarTresComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule, MatSidenavModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [],
  entryComponents: [
    AddEmpresaComponent, EditEmpresaComponent, AddProspectoComponent,
    ValidarProspectoComponent, AddNormaComponent, AddTipoServicioComponent, AddCostoComponent,
    AddCotizacionComponent, AddServicioComponent, ValidarUnoComponent, ValidarDosComponent,
    ValidarTresComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
