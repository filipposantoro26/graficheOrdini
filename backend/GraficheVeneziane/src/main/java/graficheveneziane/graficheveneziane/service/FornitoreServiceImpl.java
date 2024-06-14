package graficheveneziane.graficheveneziane.service;

import graficheveneziane.graficheveneziane.model.Fornitore;
import graficheveneziane.graficheveneziane.repository.FornitoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornitoreServiceImpl implements FornitoreService{

    @Autowired
    private FornitoreRepository fornitoreRepository;

    @Override
    public Fornitore createFornitore(Fornitore fornitore) {
        return fornitoreRepository.save(fornitore);
    }

    @Override
    public List<Fornitore> getFornitori() {
        return (List<Fornitore>) fornitoreRepository.findAll();
    }
}
