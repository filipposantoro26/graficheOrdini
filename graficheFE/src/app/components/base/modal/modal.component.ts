import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  template: ''
})
export class ModalComponent<T>{
 
  constructor(
    public dialogRef: MatDialogRef<T>,@Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
  }
  onNoClick():void{
    this.dialogRef.close("closed");
  }


}
