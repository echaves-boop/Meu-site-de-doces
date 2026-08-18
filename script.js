document.addEventListener("DOMContentLoaded", () => {
    const totalPriceEl = document.getElementById("total-price");
    const sendOrderBtn = document.getElementById("send-order-btn");

    function updateTotal() {
        let total = 0;
        const itemRows = document.querySelectorAll(".item-row");

        itemRows.forEach(row => {
            const price = parseFloat(row.dataset.price) || 0;
            const qtyEl = row.querySelector(".qty");
            const qty = parseInt(qtyEl.textContent.trim()) || 0;
            total += price * qty;
        });

        totalPriceEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    document.addEventListener("click", (event) => {
        const btnPlus = event.target.closest(".btn-plus");
        const btnMinus = event.target.closest(".btn-minus");

        if (btnPlus) {
            const row = btnPlus.closest(".item-row");
            const qtyEl = row.querySelector(".qty");
            let currentQty = parseInt(qtyEl.textContent.trim()) || 0;
            qtyEl.textContent = currentQty + 1;
            updateTotal();
        }

        if (btnMinus) {
            const row = btnMinus.closest(".item-row");
            const qtyEl = row.querySelector(".qty");
            let currentQty = parseInt(qtyEl.textContent.trim()) || 0;
            if (currentQty > 0) {
                qtyEl.textContent = currentQty - 1;
                updateTotal();
            }
        }
    });

    sendOrderBtn.addEventListener("click", () => {
        let orderText = "*Novo Pedido - Doces e Salgados*\n\n";
        let hasItems = false;
        let calculatedTotal = 0;

        const itemRows = document.querySelectorAll(".item-row");

        itemRows.forEach(row => {
            const qty = parseInt(row.querySelector(".qty").textContent.trim()) || 0;
            if (qty > 0) {
                const name = row.dataset.name;
                const price = parseFloat(row.dataset.price) || 0;
                const subtotal = price * qty;
                
                calculatedTotal += subtotal;
                orderText += `• ${qty}x ${name} (R$ ${subtotal.toFixed(2).replace('.', ',')})\n`;
                hasItems = true;
            }
        });

        if (!hasItems) {
            alert("Por favor, selecione ao menos 1 item para realizar o pedido.");
            return;
        }

        orderText += `\n*Total Estimado:* R$ ${calculatedTotal.toFixed(2).replace('.', ',')}`;

        const phone = "5575982995218";
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(orderText)}`;

        window.open(whatsappUrl, "_blank");
    });
});