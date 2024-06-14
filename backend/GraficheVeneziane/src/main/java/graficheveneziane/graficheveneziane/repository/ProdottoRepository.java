package graficheveneziane.graficheveneziane.repository;


import graficheveneziane.graficheveneziane.model.OrdineProdotto;
import graficheveneziane.graficheveneziane.model.Prodotto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdottoRepository extends CrudRepository<Prodotto, Long> {

    @Query(value = "select * from prodotto where id_fornitore = ?1", nativeQuery = true)
    public List<Prodotto> getProdottiFornitore(Long id_fornitore);

}
