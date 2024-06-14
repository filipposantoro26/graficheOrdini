package graficheveneziane.graficheveneziane.PK;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class OrdineProdottoKey implements Serializable {
    @Column
    private Long id_ordine;

    @Column
    private Long id_prodotto;
}
