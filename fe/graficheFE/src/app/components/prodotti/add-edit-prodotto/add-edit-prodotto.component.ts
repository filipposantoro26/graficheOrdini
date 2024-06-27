import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fornitore } from 'src/app/model/Fornitore';
import { Prodotto } from 'src/app/model/Prodotto';
import { FornitoriService } from 'src/app/services/fornitori.service';
import { ProdottoService } from 'src/app/services/prodotto.service';

@Component({
  selector: 'app-add-edit-prodotto',
  templateUrl: './add-edit-prodotto.component.html',
  styleUrls: ['./add-edit-prodotto.component.css']
})
export class AddEditProdottoComponent {

  prodottoForm !:FormGroup;
  fornitori:Fornitore[]=[];
  constructor(
    public dialogRef: MatDialogRef<String>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private prodottoService:ProdottoService,
    private fornitoriService:FornitoriService,
    public snackBar: MatSnackBar
  ) {
   
  }
  onNoClick():void{
    this.dialogRef.close("closed");
  }

  ngOnInit(): void {
    
    if(this.data.action==='M'){
      if (this.data.prodotto) {
        this.createForm(this.data.prodotto);
        console.log(this.data.prodotto.id_prodotto)
        this.populateForm(this.data.prodotto);
      }
    }else if(this.data.action==='I'){

      this.fornitoriService.getAll().subscribe((fornitori:Fornitore[])=>{
        this.fornitori=fornitori;
      })
      this.createForm();
    }else if(this.data.action==='V'){
      this.createForm(this.data.prodotto);
      console.log(this.data.prodotto.id_prodotto)
      this.populateForm(this.data.prodotto);
      this.prodottoForm.disable();
    }
  }

  createForm(prodotto?:Prodotto):void{
    if(prodotto!==undefined){
    this.prodottoForm=this.fb.group({
      id_prodotto: [ prodotto.id_prodotto,  ],
      nome_prodotto:[prodotto.nome_prodotto, Validators.required],
      descrizione_prodotto: [prodotto.descrizione_prodotto,],
      prezzo: [prodotto.prezzo, Validators.min(0)]
    }) 
  }else{
    this.prodottoForm=this.fb.group({
      id_prodotto: [ null,  ],
      nome_prodotto:[null, Validators.required],
      descrizione_prodotto: [null,],
      prezzo: [null, Validators.min(0)],
      fornitore: [null, Validators.required],
    })
    }
  }
  populateForm(prodotto:Prodotto):void{
    this.prodottoForm=this.fb.group({
      id_prodotto: [ prodotto.id_prodotto,  ],
      nome_prodotto:[prodotto.nome_prodotto, Validators.required],
      descrizione_prodotto: [prodotto.descrizione_prodotto,],
      prezzo: [prodotto.prezzo, Validators.min(0)]
    }) 
  }

  onSubmit(){
    console.log(this.prodottoForm.value)
    if(this.data.action==='M'){
      this.prodottoService.editProdotto(this.prodottoForm.value).subscribe((message:string)=>{
        this.snackBar.open(message, "x", {
          duration: 5000,
        });
      })
    }else if(this.data.action==='I'){
      console.log('created')
      this.prodottoService.createProdotto(this.prodottoForm.value).subscribe((message:string)=>{
        this.snackBar.open(message, "x", {
          duration: 5000,
        });
      })
    }

    this.dialogRef.close("s");
  }
}
