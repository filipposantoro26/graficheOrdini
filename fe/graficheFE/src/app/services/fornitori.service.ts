import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornitore } from '../model/Fornitore';
import { Prodotto } from '../model/Prodotto';

const url = 'http://localhost:8080/fornitore';

@Injectable({
  providedIn: 'root'
})
export class FornitoriService {
  constructor( private http: HttpClient) {}

  public getAll():Observable<Fornitore[]>{
    return this.http.get<Fornitore[]>(url);
  }

  public getFornitore(id_fornitore:number):Observable<Fornitore>{
    return this.http.get<Fornitore>(url+'/'+id_fornitore);
  }


  public getProdottiFornitore(id_fornitore:number):Observable<Prodotto[]>{
    return this.http.get<Prodotto[]>(url+'/prodotti/'+id_fornitore);
  }

  public editFornitore(fornitore:Fornitore):Observable<string>{
    return this.http.put<string>(url,fornitore,{responseType:'text' as 'json'});
  }
  public createFornitore(fornitore:Fornitore):Observable<string>{
    return this.http.post<string>(url,fornitore,{responseType:'text' as 'json'});
  }
}
