import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../base/modal/modal.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fornitore } from 'src/app/model/Fornitore';
import { FornitoriService } from 'src/app/services/fornitori.service';
import { Prodotto } from 'src/app/model/Prodotto';
import { OrdineForm } from 'src/app/model/OrdineForm';
import { OrdineService } from 'src/app/services/ordine.service';
import { Subject, takeUntil } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Ordine } from 'src/app/model/Ordine';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.css']
})
export class OrdiniComponent implements OnInit,OnDestroy{


  constructor(private fornitoreService:FornitoriService,private ordineService:OrdineService,public dialogModule: MatDialog,public snackBar: MatSnackBar){
    
  }
 

  fornitoreForm !:FormGroup;
  fornitori:Fornitore[]=[];
  prodottiFornitoreSelezionato:Prodotto[]=[];
  idFornitoreSelezionato!:number;
  ordineForm:OrdineForm={id_fornitore:NaN,prodottiQuantita:[]};
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.fornitoreForm= new FormGroup({
      nomeFornitore: new FormControl(null,Validators.required)
    })
    this.fornitoreService.getAll()
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((fornitori:Fornitore[])=>{
      this.fornitori=fornitori;
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(){
  this.ordineService.createOrdine(this.ordineForm)
  .pipe(takeUntil(this.destroy$)) 
  .subscribe((ordine:Ordine)=>{
    console.log(ordine);
    if(ordine!== null){
      /*const dialogRef = this.dialogModule.open(ModalComponent,{
        width:"250px",
        data:"Ordine effettuato correttamente"
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ordineService.getPDF(ordine.id_ordine)
        .pipe(takeUntil(this.destroy$)) 
        .subscribe((pdf:any)=>{
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ordine_${ordine.id_ordine}.pdf`; // Nome del file da scaricare
        document.body.appendChild(a);
        a.click();
    
    // Rimuovi il link temporaneo dal DOM
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
      })
      });
      */
      
      console.log("open")
      let snackBarRef =this.snackBar.open("ordine effettuato correttamente", "scarica", {
        duration: 5000,
      });
      snackBarRef.onAction()
      .pipe(takeUntil(this.destroy$)) 
      .subscribe(() => {
        this.downloadPDF(ordine.id_ordine)
      });
    }
  })
  }
  downloadPDF(id_ordine:number){
    this.ordineService.getPDF(id_ordine)
        .pipe(takeUntil(this.destroy$)) 
        .subscribe((pdf:any)=>{
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ordine_${id_ordine}.pdf`; // Nome del file da scaricare
        document.body.appendChild(a);
        a.click();
    
        // Rimuovi il link temporaneo dal DOM
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      
  }
  onFornitoreChange(event:any){
    this.idFornitoreSelezionato = +event.target.value;
    this.getProdottiFornitore();
    this.ordineForm.prodottiQuantita=[];
    
  }

  getProdottiFornitore(){
    this.fornitoreService.getProdottiFornitore(this.idFornitoreSelezionato)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((prodotti:Prodotto[])=>{
      this.prodottiFornitoreSelezionato=prodotti;
      this.ordineForm={id_fornitore:this.idFornitoreSelezionato,prodottiQuantita:[]};
    })
  }

  onProdottoChange(event:any, prodotto:Prodotto){
    if (event.target.checked) {
      
      this.ordineForm.prodottiQuantita.push({prodotto:prodotto,quantita:1})
   
    } else {
      this.ordineForm.prodottiQuantita = this.ordineForm.prodottiQuantita.filter(
        p => p.prodotto.id_prodotto !== prodotto.id_prodotto
      );
      
    }
    console.log(this.ordineForm)
  }
  onQuantitaChange(event:any, prodotto:Prodotto){
    const newQt=event.target.value;
    if(newQt > 0 && !isNaN(newQt)){
      this.ordineForm.prodottiQuantita.map(p =>{
        if(p.prodotto.id_prodotto===prodotto.id_prodotto){
          p.quantita=newQt;
        }else{
          console.log("is "+ p.quantita)
        }
      })
    }
  }

  isChecked(prodotto:Prodotto){
    return this.ordineForm.prodottiQuantita.filter(
      p => p.prodotto.id_prodotto === prodotto.id_prodotto
    ).length > 0;
  }
}


