import { Injectable } from '@angular/core';
import { Prodotto } from '../model/Prodotto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const url="http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  public prodotti:Prodotto[] | undefined;
  constructor( private http: HttpClient) {}


  public getAll():Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(url+"/prodotto");
  }

  public getAllByFornitoreId(id_fornitore:number):Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(url+"/fornitore/prodotti/"+id_fornitore);
  }





}
