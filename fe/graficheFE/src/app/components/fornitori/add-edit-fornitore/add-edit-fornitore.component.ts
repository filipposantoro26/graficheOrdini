import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fornitore } from 'src/app/model/Fornitore';
import { FornitoriService } from 'src/app/services/fornitori.service';

@Component({
  selector: 'app-add-edit-fornitore',
  templateUrl: './add-edit-fornitore.component.html',
  styleUrls: ['./add-edit-fornitore.component.css']
})
export class AddEditFornitoreComponent implements OnInit{
  
  fornitoreForm !:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<String>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private fornitoreService:FornitoriService
  ) {
   
  }
  onNoClick():void{
    this.dialogRef.close("closed");
  }

  ngOnInit(): void {
    
    if(this.data.action==='M'){
      if (this.data.fornitore) {
        this.createForm(this.data.fornitore);
        console.log(this.data.fornitore.id_fornitore)
        this.populateForm(this.data.fornitore);
      }
    }else if(this.data.action==='I'){
      console.log('I')
      this.createForm();
    }else if(this.data.action==='V'){
      this.createForm(this.data.fornitore);
      console.log(this.data.fornitore.id_fornitore)
      this.populateForm(this.data.fornitore);
      this.fornitoreForm.disable();
    }
  }

  createForm(fornitore?:Fornitore):void{
    if(fornitore!==undefined){
    this.fornitoreForm=this.fb.group({
      id_fornitore: [ fornitore.id_fornitore,  ],
      nome_fornitore:[fornitore.nome_fornitore, Validators.required],
      email:[fornitore.email, [Validators.required,Validators.email]],
      referente: [fornitore.referente,],
      numero_cellulare: [fornitore.numero_cellulare, ],
      numero_fisso: [fornitore.numero_fisso, ],
      via: [fornitore.via, ],
      cap: [fornitore.cap, ],
      provincia: [fornitore.provincia, ],
      p_iva: [fornitore.p_iva, ],
    }) 
  }else{
    this.fornitoreForm=this.fb.group({
      id_fornitore: [ null,  ],
      nome_fornitore:[null, Validators.required],
      email:[null, [Validators.required,Validators.email]],
      referente: [null,],
      numero_cellulare: [null, ],
      numero_fisso: [null, ],
      via: [null, ],
      cap: [null, ],
      provincia: [null, ],
      p_iva: [null, ],
    }) 
  }
  }
  populateForm(fornitore:Fornitore):void{
    this.fornitoreForm.patchValue({
      id_fornitore:fornitore.id_fornitore,
      nome_fornitore:fornitore.nome_fornitore,
      email:fornitore.email,
      referente:fornitore.referente,
      numero_cellulare:fornitore.numero_cellulare,
      numero_fisso:fornitore.numero_fisso,
      via:fornitore.via,
      cap:fornitore.cap,
      provincia:fornitore.provincia,
      p_iva:fornitore.p_iva,
    })
  }

  onSubmit(){
    console.log(this.fornitoreForm.value)
    if(this.data.action==='M'){
      this.fornitoreService.editFornitore(this.fornitoreForm.value).subscribe((message:string)=>{
        console.log(message);
      })
    }else if(this.data.action==='I'){
      this.fornitoreService.createFornitore(this.fornitoreForm.value).subscribe((message:string)=>{
        console.log(message);
      })
    }

    this.dialogRef.close("s");
  }
}
