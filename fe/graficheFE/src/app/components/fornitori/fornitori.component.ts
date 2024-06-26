import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fornitore } from 'src/app/model/Fornitore';
import { FornitoriService } from 'src/app/services/fornitori.service';
import { TableAction, TableRow } from '../base/table/table.component';
import { Subject, takeUntil } from 'rxjs';
import { ProdottoService } from 'src/app/services/prodotto.service';
import { Prodotto } from 'src/app/model/Prodotto';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFornitoreComponent } from './add-edit-fornitore/add-edit-fornitore.component';

@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori.component.html',
  styleUrls: ['./fornitori.component.css']
})
export class FornitoriComponent implements OnInit,OnDestroy{

  
  fornitori: Fornitore[]=[];
  tableData : TableRow<Fornitore>[]=[];
  columns: Array<keyof Fornitore> = ['id_fornitore', 'nome_fornitore','email','referente','numero_cellulare','numero_fisso','via','cap','provincia','p_iva'];
  private destroy$ = new Subject<void>(); 
  constructor(
    private fornitoreService:FornitoriService,
    private prodottiService: ProdottoService,private router:Router,
    public dialog: MatDialog
  ){
  }

  ngOnInit(): void {
    this.getFornitori();
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFornitori(){
    this.fornitoreService.getAll()
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((fornitori:Fornitore[])=>{
      this.fornitori=fornitori;
      this.tableData=[];
      this.tableData=this.updateTableData(this.tableData);
    });
  }
  updateTableData(tableData:TableRow<Fornitore>[]){
    this.fornitori.forEach(function (value) {
      tableData.push({data:value})
    }); 
    return tableData;
  }

  actions: TableAction<Fornitore>[] = [
    {
      label: 'Edit',
      action: (row: TableRow<Fornitore>) => this.editFornitore(row)
    },
    {
      label: 'Delete',
      action: (row: TableRow<Fornitore>) => this.deleteFornitore(row)
    },
    {
      label: 'Vedi Informazioni Fornitore',
      action: (row: TableRow<Fornitore>) => this.viewFornitore(row)
    },
    {
      label: 'Vedi Prodotti',
      action: (row: TableRow<Fornitore>) => this.viewProdottiFornitore(row)
    }
  ];

  editFornitore(row: TableRow<Fornitore>) {
    if(row.data.id_fornitore!=null){
      this.fornitoreService.getFornitore(row.data.id_fornitore).subscribe((fornitore:Fornitore)=>{
        this.openAddSupplierDialog('M',fornitore);
      })
    }
  }
  viewFornitore(row: TableRow<Fornitore>) {
    if(row.data.id_fornitore!=null){
      this.fornitoreService.getFornitore(row.data.id_fornitore).subscribe((fornitore:Fornitore)=>{
        this.openAddSupplierDialog('V',fornitore);
      })
    }
  }

  deleteFornitore(row: TableRow<Fornitore>) {
    // Logica per eliminare il fornitore
    console.log('Deleting fornitore', row);
  }

  viewProdottiFornitore(row: TableRow<Fornitore>) {
    if(row.data.id_fornitore!=undefined){
      this.prodottiService.getAllByFornitoreId(row.data.id_fornitore).subscribe((prodotti:Prodotto[])=>{
        this.prodottiService.prodotti=prodotti;
        this.router.navigate(['/prodotti'])
      })
     }
     console.log("id_not_valid")
}


openAddSupplierDialog(action:string,fornitore?:Fornitore): void {
  
  const data = {fornitore:fornitore,action:action}; // Dati di esempio per l'aggiunta
  const dialogRef = this.dialog.open(AddEditFornitoreComponent, {
    width:'80%',
    height:'80%',
    data: data,
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getFornitori();
  });
}

}
