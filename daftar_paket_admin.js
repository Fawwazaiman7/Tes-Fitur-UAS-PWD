// Function to get packages from local storage
function getPackages() {
    const packages = localStorage.getItem('packages');
    return packages ? JSON.parse(packages) : [];
}

// Function to save packages to local storage
function savePackages(packages) {
    localStorage.setItem('packages', JSON.stringify(packages));
}

// Function to render packages
function renderPackages(containerId) {
    const paketContainer = document.getElementById(containerId);
    const packages = getPackages();

    paketContainer.innerHTML = '';

    packages.forEach((paket, index) => {
        const paketElement = document.createElement('div');
        paketElement.classList.add('paket');
        
        paketElement.innerHTML = `
            <img src="${paket.imgUrl}" class="img-fluid" alt="${paket.title}">
            <h3>${paket.title}</h3>
            <p>${paket.description}</p>
            <a href="${paket.videoUrl}" target="_blank">Lihat video promosi</a>
            ${containerId === 'paket-container-admin' ? '<button class="btn btn-danger delete-paket">Hapus</button>' : ''}
        `;

        if (containerId === 'paket-container-admin') {
            paketElement.querySelector('.delete-paket').addEventListener('click', () => {
                deletePackage(index);
            });
        }

        paketContainer.appendChild(paketElement);
    });
}

// Function to delete a package
function deletePackage(index) {
    const packages = getPackages();
    packages.splice(index, 1);
    savePackages(packages);
    renderPackages('paket-container-admin');
}

// Function to add a new package
document.getElementById('addPaketButton').addEventListener('click', function() {
    const title = document.getElementById('paketTitle').value;
    const description = document.getElementById('paketDesc').value;
    const imgUrl = document.getElementById('paketImg').value;
    const videoUrl = document.getElementById('paketVideo').value;

    if (title && description && imgUrl && videoUrl) {
        const packages = getPackages();
        packages.push({ title, description, imgUrl, videoUrl });
        savePackages(packages);
        renderPackages('paket-container-admin');
        renderPackages('paket-container'); // Render on customer page as well
        
        // Clear form inputs
        document.getElementById('addPaketForm').reset();
    } else {
        alert('Please fill out all fields.');
    }
});

// Initial render on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('paket-container-admin')) {
        renderPackages('paket-container-admin');
    }
    if (document.getElementById('paket-container')) {
        renderPackages('paket-container');
    }
});
