import { Component, OnDestroy, OnInit,LOCALE_ID, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../base/modal/modal.component';
import { OrdineService } from 'src/app/services/ordine.service';
import { Subject, takeUntil } from 'rxjs';
import { Ordine } from 'src/app/model/Ordine';
import { TableAction, TableRow } from '../base/table/table.component';
import { ProdottoTable } from 'src/app/model/tableModel/ProdottoTable';
import { OrdineTable } from 'src/app/model/tableModel/OrdineTable';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-storico',
  templateUrl: './storico.component.html',
  styleUrls: ['./storico.component.css']
})
export class StoricoComponent implements OnInit,OnDestroy{
  private destroy$ = new Subject<void>(); 
  ordini:Ordine[]=[];
  tableData:TableRow<OrdineTable>[]=[];
  columns: Array<keyof OrdineTable> = ['id_ordine', 'fornitore','dateCreated'];
  
  constructor(private ordineService:OrdineService,@Inject(LOCALE_ID) public locale: string){}
  
  ngOnInit(): void {
    this.ordineService.getAll()
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((ordini:Ordine[])=>{
      this.ordini=ordini;
      this.tableData=this.updateTableData(this.tableData);
  })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  updateTableData(tableData:TableRow<OrdineTable>[]){
    let locale=this.locale;
    this.ordini.forEach(function (value) {
      tableData.push({data:{dateCreated:formatDate(value.dateCreated,'yyyy-dd-MM, HH:mm',locale),fornitore:value.fornitore.nome_fornitore,id_ordine:value.id_ordine}})
    }); 
    return tableData;
  }
 
  actions: TableAction<OrdineTable>[] = [
    {
      label: 'Download',
      action: (row: TableRow<OrdineTable>) => this.downloadOrdine(row)
    },
    {
      label: 'Delete',
      action: (row: TableRow<OrdineTable>) => this.deleteOrdine(row)
    },
    {
      label: 'View',
      action: (row: TableRow<OrdineTable>) => this.viewOrdine(row)
    }
  ];

  downloadOrdine(row: TableRow<OrdineTable>) {
    this.ordineService.getPDF(row.data.id_ordine)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((pdf:any)=>{
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ordine_${row.data.id_ordine}.pdf`; // Nome del file da scaricare
    document.body.appendChild(a);
    a.click();

    // Rimuovi il link temporaneo dal DOM
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  })
  }

  deleteOrdine(row: TableRow<OrdineTable>) {
    // Logica per eliminare il prodotto
    console.log('Deleting prodotto', row);
  }

  viewOrdine(row: TableRow<OrdineTable>) {
    // Logica per visualizzare il prodotto
    console.log('Viewing prodotto', row);
  }

  
}
