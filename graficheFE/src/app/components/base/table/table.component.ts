import { Component, Input, OnChanges, OnInit } from '@angular/core';
export interface TableRow<T>{
  data: T
}
export interface TableAction<T> {
  label: string;
  action: (row: TableRow<T>) => void;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit{
  @Input() tableData: TableRow<T>[] = [];
  @Input() columns: Array<keyof T> = [];
  @Input() actions: TableAction<T>[] = [];
  
  constructor() { }
  ngOnInit(): void {
   console.log(this.tableData);
  }

  // Metodi per manipolare i dati della tabella
  addRow(data: T) {
    //da fare 
  }

  deleteRow(index: number) {
   //da fare
  }

  editRow(index: number, newData: T) {
   //da fare
  }
  
}
