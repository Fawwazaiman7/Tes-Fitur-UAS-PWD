document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('orderForm');
    const packagePriceInput = document.getElementById('packagePrice');
    const totalBillInput = document.getElementById('totalBill');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Ambil nilai dari form
        const name = form.name.value;
        const phone = form.phone.value;
        const tripDate = form.tripDate.value;
        const participantCount = form.participantCount.value;
        const services = Array.from(form.service).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        const packagePrice = parseFloat(packagePriceInput.value.replace(/[^0-9]/g, '')) || 0;
        const totalBill = participantCount * packagePrice;

        // Prepare the data object
        const orderData = {
            name,
            phone,
            tripDate,
            participantCount,
            services: services.join(', ') || 'Tidak ada',
            packagePrice: packagePrice.toLocaleString(),
            totalBill: totalBill.toLocaleString()
        };

        // Save the data to localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Kirim data ke tampilan_pemesanan.html
        const queryParams = new URLSearchParams(orderData).toString();
        window.location.href = `tampilan_pemesanan.html?${queryParams}`;

        // Tampilkan pesan
        document.getElementById('formMessage').textContent = 'Silakan lihat rangkuman reservasi Anda di halaman berikutnya.';
    });

    // Menutup modal
    window.closeModal = function () {
        document.getElementById('myModal').style.display = 'none';
        document.getElementById('formMessage').textContent = '';
        form.reset();
    }

    // Fungsi untuk mengatur harga paket berdasarkan pelayanan yang dipilih
    form.addEventListener('change', function () {
        const services = Array.from(form.service).filter(checkbox => checkbox.checked);
        let price = 0;

        services.forEach(service => {
            switch (service.value) {
                case 'Penginapan':
                    price += 200000; // Contoh harga untuk penginapan
                    break;
                case 'Transportasi':
                    price += 150000; // Contoh harga untuk transportasi
                    break;
                case 'Makanan':
                    price += 50000; // Contoh harga untuk makanan
                    break;
            }
        });

        packagePriceInput.value = price.toLocaleString();
        totalBillInput.value = (price * (form.participantCount.value || 0)).toLocaleString();
    });

    // Menampilkan modal dengan pesan
    document.getElementById('pesan-lagi').addEventListener('click', () => {
        window.location.href = 'pemesanan.html';
    });

    // Menutup modal jika diklik di luar konten modal
    window.onclick = function (event) {
        if (event.target == document.getElementById('myModal')) {
            closeModal();
        }
    }
});
