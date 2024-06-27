package graficheveneziane.graficheveneziane.controller;

import graficheveneziane.graficheveneziane.model.Ordine;
import graficheveneziane.graficheveneziane.model.Prodotto;
import graficheveneziane.graficheveneziane.service.OrdineService;
import graficheveneziane.graficheveneziane.service.ProdottoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/prodotto")
@RestController
public class ProdottoController {

    @Autowired
    private ProdottoService prodottoService;



    @PostMapping
    public String createProduct(@RequestBody Prodotto prodotto) {

        return prodottoService.createProduct(prodotto);
    }

    @GetMapping
    public List<Prodotto> getAllProduct(){
        return prodottoService.getAllProduct();
    }

    @GetMapping("/{id}")
    public Prodotto getAllProduct(@PathVariable Long id){
        return prodottoService.getProduct(id);
    }

    @PutMapping
    public String editProdotto(@RequestBody Prodotto prodotto){
        return prodottoService.editProdoto(prodotto);
    }

}
