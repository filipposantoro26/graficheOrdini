package graficheveneziane.graficheveneziane.service;

import graficheveneziane.graficheveneziane.model.Fornitore;
import graficheveneziane.graficheveneziane.model.Ordine;
import graficheveneziane.graficheveneziane.model.Prodotto;
import graficheveneziane.graficheveneziane.repository.FornitoreRepository;
import graficheveneziane.graficheveneziane.repository.ProdottoRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdottoServiceImpl implements ProdottoService{

    @Autowired
    private ProdottoRepository prodottoRepository;

    @Autowired
    private FornitoreRepository fornitoreRepository;
    @Override
    public Prodotto createProduct(Prodotto prodotto) {
        System.out.println(prodotto.getFornitore());
        Optional<Fornitore> fornitore =fornitoreRepository.findById(prodotto.getFornitore().getId_fornitore());
        if(fornitore.isPresent()) {
            prodotto.setFornitore(fornitore.get());
            prodotto=prodottoRepository.save(prodotto);
            return prodottoRepository.findById(prodotto.getId_prodotto()).get();
        }
        return null;
    }

    @Override
    public List<Prodotto> getAllProduct() {
       return (List<Prodotto>) prodottoRepository.findAll();
    }

    @Override
    public List<Prodotto> getProdottiFornitore(Long id_fornitore) {
        return prodottoRepository.getProdottiFornitore(id_fornitore);
    }
}
