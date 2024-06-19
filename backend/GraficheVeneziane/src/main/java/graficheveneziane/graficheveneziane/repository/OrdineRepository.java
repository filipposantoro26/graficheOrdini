package graficheveneziane.graficheveneziane.repository;

import graficheveneziane.graficheveneziane.model.Ordine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdineRepository extends CrudRepository<Ordine, Long> {

    List<Ordine> findAllByOrderByDateCreatedDesc();

}
