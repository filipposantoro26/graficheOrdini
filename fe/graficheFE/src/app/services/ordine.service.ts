import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdineForm } from '../model/OrdineForm';
import { Ordine } from '../model/Ordine';

const url = 'http://localhost:8080/ordini';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  constructor( private http: HttpClient) {}

  public createOrdine(ordineForm:OrdineForm):Observable<any>{
    return this.http.post<any>(url,ordineForm);
  }

  public getPDF(id_ordine:number):Observable<Blob>{
    return this.http.get(url+'/'+id_ordine+'/pdf',{ responseType: 'blob' });
  }
  public getAll():Observable<Ordine[]>{
    return this.http.get<Ordine[]>(url);
  }
}
