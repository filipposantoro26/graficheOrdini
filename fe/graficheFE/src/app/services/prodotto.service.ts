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

  public getProdotto(id_prodotto:number):Observable<Prodotto>{
    return this.http.get<Prodotto>(url+"/prodotto/"+id_prodotto);
  }

  public editProdotto(prodotto:Prodotto):Observable<string>{
    return this.http.put<string>(url+"/prodotto",prodotto,{responseType:'text' as 'json'});
  }

  public createProdotto(prodotto:Prodotto):Observable<string>{
    return this.http.get<string>(url+"/prodotto");
  }



}
