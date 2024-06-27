import { Prodotto } from "./Prodotto";

export interface ProdottiQuantita {
  prodotto: Prodotto;
  quantita: number;
  tipo_quantita: string;
}