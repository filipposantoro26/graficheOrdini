import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FornitoriComponent } from './components/fornitori/fornitori.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { StoricoComponent } from './components/storico/storico.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { TableComponent } from './components/base/table/table.component';
import { ModalComponent } from './components/base/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddEditFornitoreComponent } from './components/fornitori/add-edit-fornitore/add-edit-fornitore.component';
import { AddEditProdottoComponent } from './components/prodotti/add-edit-prodotto/add-edit-prodotto.component';
import { MatSelectModule, } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    FornitoriComponent,
    ProdottiComponent,
    OrdiniComponent,
    StoricoComponent,
    TableComponent,
    ModalComponent,
    AddEditFornitoreComponent,
    AddEditProdottoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule ,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
