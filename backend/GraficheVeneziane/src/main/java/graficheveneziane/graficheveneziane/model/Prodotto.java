package graficheveneziane.graficheveneziane.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Prodotto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_prodotto;

    @Column
    private String nome_prodotto;

    @Column
    private String descrizione_prodotto;

    @JsonIgnore
    @OneToMany(mappedBy = "prodotto")
    private Set<OrdineProdotto> ordini;


    @ManyToOne()
    @JoinColumn(name = "id_fornitore")
    private Fornitore fornitore;

    @Column
    private int prezzo;
}
