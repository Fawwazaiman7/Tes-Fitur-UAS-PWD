document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('orderForm');
    const packagePriceInput = document.getElementById('packagePrice');
    const totalBillInput = document.getElementById('totalBill');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const modalBody = document.getElementById('modalBody');
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));

    function deleteOrder(index) {
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        renderOrders();
    }

    function renderOrders() {
        const orderTableBody = document.getElementById('orderTableBody');
        if (!orderTableBody) return; // Prevent error on pages without order table

        orderTableBody.innerHTML = '';
        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.name}</td>
                <td>${order.phone}</td>
                <td>${order.tripDate}</td>
                <td>${order.participantCount}</td>
                <td>${order.services}</td>
                <td>${order.packagePrice}</td>
                <td>${order.totalBill}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">Delete</button></td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    renderOrders();

    window.deleteOrder = deleteOrder;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = form.name.value;
        const phone = form.phone.value;
        const tripDate = form.tripDate.value;
        const participantCount = form.participantCount.value;
        const services = Array.from(form.service).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        const packagePrice = parseFloat(packagePriceInput.value.replace(/[^0-9]/g, '')) || 0;
        const totalBill = participantCount * packagePrice;

        const newOrder = {
            name,
            phone,
            tripDate,
            participantCount,
            services: services.join(', '),
            packagePrice: packagePrice.toLocaleString(),
            totalBill: totalBill.toLocaleString()
        };

        // Display data in modal
        modalBody.innerHTML = `
            <p>Nama Pemesan: ${newOrder.name}</p>
            <p>Nomer Telp/HP: ${newOrder.phone}</p>
            <p>Waktu Pelaksanaan Perjalanan: ${newOrder.tripDate}</p>
            <p>Jumlah Peserta: ${newOrder.participantCount}</p>
            <p>Pelayanan Paket Perjalanan: ${newOrder.services}</p>
            <p>Harga Paket Perjalanan: Rp ${newOrder.packagePrice}</p>
            <p>Jumlah Tagihan: Rp ${newOrder.totalBill}</p>
        `;

        // Show the modal
        myModal.show();

        // Add event listeners to modal buttons
        document.getElementById('pesan-lagi').addEventListener('click', () => {
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
            window.location.href = 'pemesanan.html';
        });

        document.getElementById('tidak').addEventListener('click', () => {
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
            myModal.hide();
        });
    });

    form.addEventListener('change', function () {
        const services = Array.from(form.service).filter(checkbox => checkbox.checked);
        let price = 0;

        services.forEach(service => {
            switch (service.value) {
                case 'Penginapan':
                    price += 200000;
                    break;
                case 'Transportasi':
                    price += 150000;
                    break;
                case 'Makanan':
                    price += 50000;
                    break;
            }
        });

        packagePriceInput.value = price.toLocaleString();
        totalBillInput.value = (price * (form.participantCount.value || 0)).toLocaleString();
    });

    window.closeModal = function () {
        myModal.hide();
        form.reset();
        packagePriceInput.value = '';
        totalBillInput.value = '';
    }

    document.getElementById('pesan-lagi').addEventListener('click', () => {
        window.location.href = 'pemesanan.html';
    });

    window.onclick = function (event) {
        if (event.target == document.getElementById('myModal')) {
            closeModal();
        }
    }
});
