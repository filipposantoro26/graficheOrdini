package graficheveneziane.graficheveneziane.repository;

import graficheveneziane.graficheveneziane.PK.OrdineProdottoKey;
import graficheveneziane.graficheveneziane.model.OrdineProdotto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdineProdottoRepository extends CrudRepository<OrdineProdotto, OrdineProdottoKey> {


@Query(value = "select * from ordine_prodotto  where id_ordine= ?1  ", nativeQuery = true)
public List<OrdineProdotto> getProductOrder(Long id_ordine);

}
