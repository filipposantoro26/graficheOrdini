package graficheveneziane.graficheveneziane.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "fornitori")
@AllArgsConstructor
@NoArgsConstructor
public class Fornitore {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_fornitore;

    @Column
    private String nome_fornitore;
    @Column
    private String email;

    @Column
    private String referente;

    @Column
    private String numero_cellulare;

    @Column
    private String numero_fisso;

    @Column
    private String via;

    @Column
    private String cap;

    @Column
    private String provincia;

    @Column
    private String p_iva;

}
