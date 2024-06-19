package graficheveneziane.graficheveneziane.service;



import graficheveneziane.graficheveneziane.PK.OrdineProdottoKey;
import graficheveneziane.graficheveneziane.form.ProdottiQuantita;
import graficheveneziane.graficheveneziane.model.Fornitore;
import graficheveneziane.graficheveneziane.model.Ordine;
import graficheveneziane.graficheveneziane.model.OrdineProdotto;
import graficheveneziane.graficheveneziane.model.Prodotto;
import graficheveneziane.graficheveneziane.repository.FornitoreRepository;
import graficheveneziane.graficheveneziane.repository.OrdineProdottoRepository;
import graficheveneziane.graficheveneziane.repository.OrdineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrdineServiceImpl implements OrdineService {

    @Autowired
    private OrdineRepository ordineRepository;

    @Autowired
    private OrdineProdottoRepository ordineProdottoRepository;

    @Autowired
    private FornitoreRepository fornitoreRepository;

    public Ordine createOrder(List<ProdottiQuantita>prodottiQuantita, Long id_fornitore) { //Da passargli una List di prodotti
        Ordine ordine= this.createOrdine(id_fornitore);

        if(ordine!= null){

            ordineRepository.save(ordine);
            for(ProdottiQuantita p:prodottiQuantita){
                ordineProdottoRepository.save(new OrdineProdotto(new OrdineProdottoKey(id_fornitore,p.getProdotto().getId_prodotto()),ordine,p.getProdotto(),p.getQuantita()));

            }
            return ordineRepository.findById(ordine.getId_ordine()).get();
        }
       return null;
    }

    public List<Ordine> getOrders() {
        return (List<Ordine>) ordineRepository.findAllByOrderByDateCreatedDesc();
    }

    public Ordine getOrderById(Long id) {
        return ordineRepository.findById(id).orElse(null);
    }

    private Ordine createOrdine(Long id_fornitore){
        Optional<Fornitore> fornitore = fornitoreRepository.findById(id_fornitore);
        if(fornitore.isPresent()){
            return ordineRepository.save(new Ordine(LocalDateTime.now(),fornitore.get()));
        }else{
            return null;
        }
    }
}

