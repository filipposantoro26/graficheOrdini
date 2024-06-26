import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent{
 
  constructor(
    public dialogRef: MatDialogRef<String>,@Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
  }
  onNoClick():void{
    this.dialogRef.close("closed");
  }


}
