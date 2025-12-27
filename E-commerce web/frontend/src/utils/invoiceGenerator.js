export const generateInvoice = (order) => {
    const date = new Date(order.date).toLocaleDateString();

    // Create a new window
    const win = window.open('', '', 'width=800,height=600');

    const html = `
      <html>
        <head>
          <title>Facture #${order.id}</title>
          <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0058a3; padding-bottom: 20px; margin-bottom: 40px; }
            .logo { font-size: 24px; font-weight: bold; color: #0058a3; }
            .invoice-details { text-align: right; }
            .client-info { margin-bottom: 40px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            th { text-align: left; border-bottom: 1px solid #ccc; padding: 10px 0; }
            td { padding: 10px 0; border-bottom: 1px solid #eee; }
            .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; }
            .status { font-size: 12px; color: #666; margin-top: 50px; text-align: center; }
            @media print {
                .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">IKEA-ish</div>
            <div class="invoice-details">
              <h1>FACTURE</h1>
              <p>N° ${order.id}</p>
              <p>Date: ${date}</p>
            </div>
          </div>
  
          <div class="client-info">
            <h3>Facturé à :</h3>
            <p>${order.User ? order.User.nom : 'Client Inconnu'}</p>
            <p>${order.User ? order.User.email : ''}</p>
            <p>${order.User && order.User.adresse ? order.User.adresse : ''}</p>
          </div>
  
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              <!-- Mock Items since we don't fully fetch OrderItems yet, using total for demo -->
              <tr>
                <td>Commande complète (Détails non chargés)</td>
                <td>1</td>
                <td>${Number(order.total).toFixed(2)} €</td>
                <td style="text-align: right;">${Number(order.total).toFixed(2)} €</td>
              </tr>
            </tbody>
          </table>
  
          <div class="total">
            Total à payer : ${Number(order.total).toFixed(2)} €
          </div>
  
          <div class="status">
            Statut actuel : ${order.statut}
          </div>
  
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();
};
