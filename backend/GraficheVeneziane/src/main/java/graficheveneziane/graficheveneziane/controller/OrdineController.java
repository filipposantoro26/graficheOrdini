package graficheveneziane.graficheveneziane.controller;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import graficheveneziane.graficheveneziane.form.OrdineForm;
import graficheveneziane.graficheveneziane.model.Fornitore;
import graficheveneziane.graficheveneziane.model.Ordine;
import graficheveneziane.graficheveneziane.model.OrdineProdotto;
import graficheveneziane.graficheveneziane.model.Prodotto;
import graficheveneziane.graficheveneziane.repository.OrdineProdottoRepository;
import graficheveneziane.graficheveneziane.service.OrdineService;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/ordini")
@RestController
public class OrdineController {

    @Autowired
    private OrdineService ordineService;
    @Autowired
    private OrdineProdottoRepository ordp;


    @PostMapping
    public Ordine createOrder(@RequestBody OrdineForm ordine) {
        return ordineService.createOrder(ordine.getProdottiQuantita(),ordine.getId_fornitore());
    }

    @GetMapping
    public List<Ordine> getOrders() {
        return ordineService.getOrders();
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<InputStreamResource> generateOrderPdf(@PathVariable Long id) throws IOException {
        Ordine ordine = ordineService.getOrderById(id);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf, PageSize.A4);
        document.setMargins(20, 20, 20, 20);


        PdfFont font = PdfFontFactory.createFont("Helvetica");
        PdfFont bold = PdfFontFactory.createFont("Helvetica-Bold");

        // Intestazione dell'azienda
        Table headerTable = new Table(UnitValue.createPercentArray(new float[]{1, 2}));
        headerTable.setWidth(UnitValue.createPercentValue(100));

        // Logo (cambiare il percorso con quello del vostro logo)
        /*String logoPath = "path/to/your/logo.png";
        Cell logoCell = new Cell().add(new Paragraph("LOGO").setFont(font).setFontSize(12))
                .setBorder(Border.NO_BORDER);
        headerTable.addCell(logoCell);
*/
        // Dati dell'azienda
        document.add(new Paragraph("GRAFICHE VENEZIANE")
                .setFont(bold).setFontSize(12));
        Cell companyDataCell = new Cell().add(new Paragraph("Nome Azienda\nIndirizzo\nTelefono: 123456789\nEmail: info@azienda.com")
                        .setFont(font).setFontSize(12))
                .setBorder(Border.NO_BORDER);
        headerTable.addCell(companyDataCell);

        document.add(headerTable);

        // Dati dell'azienda destinataria dell'ordine
        document.add(new Paragraph("\n"));
        document.add(new Paragraph(ordine.getFornitore().getNome_fornitore())
                .setFont(bold).setFontSize(12));
        document.add(new Paragraph(ordine.getFornitore().getNome_fornitore()+"\nIndirizzo\nTelefono: 987654321\nEmail: contatto@destinatario.com")
                .setFont(font).setFontSize(12));

        // Tabella dei prodotti da ordinare
        document.add(new Paragraph("\n"));
        Table table = new Table(UnitValue.createPercentArray(new float[]{3, 4, 1}));
        table.setWidth(UnitValue.createPercentValue(100));

        // Intestazioni delle colonne
        table.addHeaderCell(new Cell().add(new Paragraph("Nome Prodotto").setFont(bold).setFontSize(12)));
        table.addHeaderCell(new Cell().add(new Paragraph("Descrizione").setFont(bold).setFontSize(12)));
        table.addHeaderCell(new Cell().add(new Paragraph("Quantità").setFont(bold).setFontSize(12)));

        // Esempio di righe di prodotti
       /* for (int i = 0; i < 5; i++) {
            table.addCell(new Cell().add(new Paragraph("Prodotto " + (i + 1)).setFont(font).setFontSize(12)));
            table.addCell(new Cell().add(new Paragraph("Descrizione del prodotto " + (i + 1)).setFont(font).setFontSize(12)));
            table.addCell(new Cell().add(new Paragraph("" + (i + 1)).setFont(font).setFontSize(12)));
        }*/
        List<OrdineProdotto> op= ordp.getProductOrder(id);
        for (OrdineProdotto p:op) {
            table.addCell(new Cell().add(new Paragraph(p.getProdotto().getNome_prodotto()).setFont(font).setFontSize(12)));
            table.addCell(new Cell().add(new Paragraph(p.getProdotto().getDescrizione_prodotto()).setFont(font).setFontSize(12)));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(p.getQuantita())).setFont(font).setFontSize(12)));
        }
        document.add(table);

        // Footer
        document.add(new Paragraph("\n"));
        document.add(new Paragraph("GRAFICHE VENEZIANE")
                .setFont(bold).setFontSize(12)
                .setTextAlignment(TextAlignment.CENTER)
                .setFontColor(ColorConstants.GRAY));

        document.close();
        ByteArrayInputStream bis = new ByteArrayInputStream(baos.toByteArray());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=order_" + ordine.getId_ordine() + ".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

}



