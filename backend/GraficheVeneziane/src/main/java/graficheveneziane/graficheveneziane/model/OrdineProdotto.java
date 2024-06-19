package graficheveneziane.graficheveneziane.model;

import graficheveneziane.graficheveneziane.PK.OrdineProdottoKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrdineProdotto {
    @EmbeddedId
    private OrdineProdottoKey id;

    @ManyToOne
    @MapsId("id_ordine")
    @JoinColumn(name = "id_ordine")
    private Ordine ordine;

    @ManyToOne
    @MapsId("id_prodotto")
    @JoinColumn(name = "id_prodotto")
    private Prodotto prodotto;

    @Column
    private double quantita;


}
