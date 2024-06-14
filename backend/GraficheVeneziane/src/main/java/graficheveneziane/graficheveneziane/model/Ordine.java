package graficheveneziane.graficheveneziane.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ordine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_ordine;


    @JsonIgnore
    @OneToMany(mappedBy = "ordine")
    private Set<OrdineProdotto> prodotti;

    @ManyToOne()
    @JoinColumn(name = "id_fornitore")
    private Fornitore fornitore;
    private LocalDateTime dateCreated;

    public Ordine(LocalDateTime dateCreated,Fornitore fornitore){
        this.setFornitore(fornitore);
        this.setDateCreated(dateCreated);
    }
}
