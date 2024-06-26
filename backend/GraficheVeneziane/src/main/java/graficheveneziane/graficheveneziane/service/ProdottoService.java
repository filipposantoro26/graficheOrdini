package graficheveneziane.graficheveneziane.service;
import java.util.List;
import graficheveneziane.graficheveneziane.model.Ordine;
import graficheveneziane.graficheveneziane.model.Prodotto;

public interface ProdottoService {

    public Prodotto createProduct(Prodotto prodotto);

    public List<Prodotto> getAllProduct();

    public List<Prodotto> getProdottiFornitore(Long id_fornitore);

    Prodotto getProduct(Long id_prodotto);

    String editProdoto(Prodotto prodotto);
}
