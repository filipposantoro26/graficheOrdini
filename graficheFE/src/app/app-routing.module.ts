import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FornitoriComponent } from './components/fornitori/fornitori.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { StoricoComponent } from './components/storico/storico.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component:DashboardComponent},
  {path: 'fornitori', component:FornitoriComponent},
  {path: 'prodotti', component:ProdottiComponent},
  {path: 'ordini', component:OrdiniComponent},
  {path: 'storico', component:StoricoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
