package graficheveneziane.graficheveneziane.service;

import graficheveneziane.graficheveneziane.form.ProdottiQuantita;
import graficheveneziane.graficheveneziane.model.Ordine;
import graficheveneziane.graficheveneziane.model.OrdineProdotto;
import graficheveneziane.graficheveneziane.model.Prodotto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OrdineService {

    public Ordine createOrder(List<ProdottiQuantita>prodottiQuantita, Long id_fornitore);

    public List<Ordine> getOrders();

    public Ordine getOrderById(Long id);
}
