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
    const imgUrlInput = document.getElementById('paketImgUrl').value;
    const imgFileInput = document.getElementById('paketImgFile').files[0];
    const videoUrl = document.getElementById('paketVideo').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!title || !description || !videoUrl || (!imgUrlInput && !imgFileInput)) {
        errorMessage.textContent = 'Please fill in the empty field.';
        return;
    }

    if (imgUrlInput && imgFileInput) {
        errorMessage.textContent = 'You can only upload one file.';
        return;
    }

    errorMessage.textContent = ''; // Clear any previous error messages

    if (imgFileInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            addPackage(title, description, e.target.result, videoUrl);
        };
        reader.readAsDataURL(imgFileInput);
    } else {
        addPackage(title, description, imgUrlInput, videoUrl);
    }
});

// Function to add package to storage and render
function addPackage(title, description, imgUrl, videoUrl) {
    const packages = getPackages();
    packages.push({ title, description, imgUrl, videoUrl });
    savePackages(packages);
    renderPackages('paket-container-admin');
    renderPackages('paket-container'); // Render on customer page as well
    
    // Clear form inputs
    document.getElementById('addPaketForm').reset();
}

// Initial render on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('paket-container-admin')) {
        renderPackages('paket-container-admin');
    }
    if (document.getElementById('paket-container')) {
        renderPackages('paket-container');
    }
});
