import { Component, OnDestroy, OnInit } from '@angular/core';
import { Prodotto } from 'src/app/model/Prodotto';
import { ProdottoTable } from 'src/app/model/tableModel/ProdottoTable';
import { ProdottoService } from 'src/app/services/prodotto.service';
import { TableAction, TableRow } from '../base/table/table.component';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProdottoComponent } from './add-edit-prodotto/add-edit-prodotto.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent implements OnInit,OnDestroy{
  prodotti: Prodotto[] | undefined=[];
  tableData : TableRow<ProdottoTable>[]=[];
  columns: Array<keyof ProdottoTable> = ['id_prodotto', 'nome_prodotto','descrizione_prodotto','fornitore','prezzo'];
  private destroy$ = new Subject<void>(); 
  constructor(
    private prodottoService:ProdottoService,
    public dialog: MatDialog,
  
    ){
  }

  ngOnInit(): void {
    this.prodotti=this.prodottoService.prodotti;
    if(this.prodotti==undefined){
      this.prodottoService.getAll()
      .pipe(takeUntil(this.destroy$)) 
      .subscribe((prodotti:Prodotto[])=>{
        this.prodotti=prodotti;
        this.tableData=this.updateTableData(this.tableData);
      });
    }else{
      this.tableData=this.updateTableData(this.tableData);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.prodottoService.prodotti = undefined;
  }
  updateTableData(tableData:TableRow<ProdottoTable>[]):TableRow<ProdottoTable>[]{
    if(this.prodotti!= undefined){
      this.prodotti.forEach(function (value) {
        tableData.push({data:new ProdottoTable(value.id_prodotto,value.nome_prodotto,value.descrizione_prodotto,value.fornitore.nome_fornitore,value.prezzo)})
      }); 
      return tableData;
  }
  return [];
}

  actions: TableAction<ProdottoTable>[] = [
    {
      label: 'Edit',
      action: (row: TableRow<ProdottoTable>) => this.editProdotto(row)
    },
    {
      label: 'Delete',
      action: (row: TableRow<ProdottoTable>) => this.deleteProdotto(row)
    },
    {
      label: 'View',
      action: (row: TableRow<ProdottoTable>) => this.viewProdotto(row)
    }
  ];

  editProdotto(row: TableRow<ProdottoTable>) {
    this.prodottoService.getProdotto(row.data.id_prodotto).subscribe((prodotto:Prodotto)=>{
      this.openAddSupplierDialog('M',prodotto);
    })
  }

  deleteProdotto(row: TableRow<ProdottoTable>) {
    // Logica per eliminare il prodotto
    console.log('Deleting prodotto', row);
  }

  viewProdotto(row: TableRow<ProdottoTable>) {
    if(row.data.id_prodotto!=null){
      this.prodottoService.getProdotto(row.data.id_prodotto).subscribe((prodotto:Prodotto)=>{
        this.openAddSupplierDialog('V',prodotto);
      })
    }
  }

  openAddSupplierDialog(action:string,prodotto?:Prodotto): void {
  
    const data = {prodotto:prodotto,action:action}; // Dati di esempio per l'aggiunta
    const dialogRef = this.dialog.open(AddEditProdottoComponent, {
      width:'80%',
      height:'80%',
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      this.prodottoService.getAll()
      .pipe(takeUntil(this.destroy$)) 
      .subscribe((prodotti:Prodotto[])=>{
        this.prodotti=prodotti;
        this.tableData=[];
        this.tableData=this.updateTableData(this.tableData);
      });
    });
  }
}
