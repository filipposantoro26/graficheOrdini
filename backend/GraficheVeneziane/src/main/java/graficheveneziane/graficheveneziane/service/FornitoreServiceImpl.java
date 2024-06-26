package graficheveneziane.graficheveneziane.service;

import graficheveneziane.graficheveneziane.model.Fornitore;
import graficheveneziane.graficheveneziane.repository.FornitoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Fornitore getFornitore(Long id_fornitore) {
        return fornitoreRepository.findById(id_fornitore).get() == null? null: fornitoreRepository.findById(id_fornitore).get();
    }

    @Override
    public String editFornitore(Fornitore fornitore) {
        Optional<Fornitore> fornitoreOptional = this.fornitoreRepository.findById(fornitore.getId_fornitore());
        if(fornitoreOptional.isPresent()){
            Fornitore fornitoreToEdit=fornitoreOptional.get();
            fornitoreToEdit.setNome_fornitore(fornitore.getNome_fornitore());
            fornitoreToEdit.setEmail(fornitore.getEmail());
            fornitoreToEdit.setReferente(fornitore.getReferente());
            fornitoreToEdit.setNumero_cellulare(fornitore.getNumero_cellulare());
            fornitoreToEdit.setNumero_fisso(fornitore.getNumero_fisso());
            fornitoreToEdit.setVia(fornitore.getVia());
            fornitoreToEdit.setCap(fornitore.getCap());
            fornitoreToEdit.setProvincia(fornitore.getProvincia());
            fornitoreToEdit.setP_iva(fornitore.getP_iva());
            fornitoreRepository.save(fornitoreToEdit);
            return "Modificata l'anagrafica Fornitore correttamente";
        }else{
            return "fornitore non presente";
        }
    }
}
