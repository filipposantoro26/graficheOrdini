export class Fornitore {
    id_fornitore: number | undefined;
    nome_fornitore: string;
    email: string;
    referente: string;
    numero_cellulare: string;
    numero_fisso: string;
    via: string;
    cap: string;
    provincia: string;
    p_iva: string;
  
    constructor(
      id_fornitore?: number,
      nome_fornitore: string = '',
      email: string = '',
      referente: string = '',
      numero_cellulare: string = '',
      numero_fisso: string = '',
      via: string = '',
      cap: string = '',
      provincia: string = '',
      p_iva: string = ''
    ) {
      this.id_fornitore = id_fornitore;
      this.nome_fornitore = nome_fornitore;
      this.email = email;
      this.referente = referente;
      this.numero_cellulare = numero_cellulare;
      this.numero_fisso = numero_fisso;
      this.via = via;
      this.cap = cap;
      this.provincia = provincia;
      this.p_iva = p_iva;
    }
  }
  