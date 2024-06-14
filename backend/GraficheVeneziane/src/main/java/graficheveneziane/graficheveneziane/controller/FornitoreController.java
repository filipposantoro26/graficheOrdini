package graficheveneziane.graficheveneziane.controller;

import graficheveneziane.graficheveneziane.model.Fornitore;
import graficheveneziane.graficheveneziane.model.Prodotto;
import graficheveneziane.graficheveneziane.service.FornitoreService;
import graficheveneziane.graficheveneziane.service.ProdottoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornitore")
@CrossOrigin("*")
public class FornitoreController {

    @Autowired
    private FornitoreService fornitoreService;

    @Autowired
    private ProdottoService prodottoService;

    @PostMapping
    public Fornitore createFornitore (@RequestBody Fornitore fornitore){
        return fornitoreService.createFornitore(fornitore);
    }

    @GetMapping
    public List<Fornitore> getFornitori (){
        return fornitoreService.getFornitori();
    }

    @GetMapping("/prodotti/{id}")
    public List<Prodotto> getProdottiFornitore (@PathVariable Long id){
        return prodottoService.getProdottiFornitore(id);
    }

}
