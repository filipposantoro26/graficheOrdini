import { Fornitore } from "./Fornitore";

export interface Ordine{
    id_ordine:number;
    fornitore: Fornitore;
    dateCreated:Date;
    
    
}