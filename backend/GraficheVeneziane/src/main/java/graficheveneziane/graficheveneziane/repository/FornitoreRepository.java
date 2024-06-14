package graficheveneziane.graficheveneziane.repository;

import graficheveneziane.graficheveneziane.model.Fornitore;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FornitoreRepository extends CrudRepository<Fornitore, Long> {
}
