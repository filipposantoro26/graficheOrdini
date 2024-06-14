package graficheveneziane.graficheveneziane.service;

import graficheveneziane.graficheveneziane.model.Fornitore;

import java.util.List;

public interface FornitoreService {

    public Fornitore createFornitore(Fornitore fornitore);

    List<Fornitore> getFornitori();
}
