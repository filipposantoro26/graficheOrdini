package graficheveneziane.graficheveneziane.form;

import graficheveneziane.graficheveneziane.model.Prodotto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdottiQuantita{
    private Prodotto prodotto;
    private double quantita;

    private String tipo_quantita;
}