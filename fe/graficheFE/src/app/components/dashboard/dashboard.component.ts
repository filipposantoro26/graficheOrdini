import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../base/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
constructor(private router:Router,public dialog: MatDialog){}
  ngOnInit(): void {
   
  }

gotoStorico() {
  this.router.navigate(['/storico']);
}
gotoCreaOrdine() {
  this.router.navigate(['/ordini']);
}
gotoProdotti() {
  this.router.navigate(['/prodotti']);
}

gotoFornitori(){
  this.router.navigate(['/fornitori']);
}
  
}
