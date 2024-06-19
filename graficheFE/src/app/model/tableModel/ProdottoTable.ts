
export class ProdottoTable {
  id_prodotto: number;
  nome_prodotto: string;
  descrizione_prodotto: string;
  fornitore: string;
  prezzo: number;

  constructor(id_prodotto: number, nome_prodotto: string, descrizione_prodotto: string,  fornitore: string, prezzo: number) {
    this.id_prodotto = id_prodotto;
    this.nome_prodotto = nome_prodotto;
    this.descrizione_prodotto = descrizione_prodotto;
    this.fornitore = fornitore;
    this.prezzo = prezzo;
  }
}
