document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById('gallery');
    const imageInput = document.getElementById('imageInput');
    const imageUrl = document.getElementById('imageUrl');
    const addImageButton = document.getElementById('addImageButton');

    // Load images from local storage and display them in the gallery
    function loadGallery() {
        gallery.innerHTML = '';
        const storedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
        storedImages.forEach((src, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('img-fluid');
            img.alt = `Galeri ${index + 1}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                deleteImage(index);
            });
            galleryItem.appendChild(img);
            galleryItem.appendChild(deleteButton);
            gallery.appendChild(galleryItem);
        });
        addGalleryItemAnimations();
    }

    // Save an uploaded image to local storage
    function saveImageToGallery() {
        const file = imageInput.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const storedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
                storedImages.push(e.target.result);
                localStorage.setItem('galleryImages', JSON.stringify(storedImages));
                loadGallery();
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid PNG or JPEG image.');
        }
    }

    // Save an image URL to local storage
    function saveImageUrlToGallery() {
        const url = imageUrl.value.trim();
        if (url && (url.endsWith('.png') || url.endsWith('.jpeg') || url.endsWith('.jpg'))) {
            const storedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
            storedImages.push(url);
            localStorage.setItem('galleryImages', JSON.stringify(storedImages));
            loadGallery();
            imageUrl.value = '';
        } else {
            alert('Please enter a valid PNG or JPEG image URL.');
        }
    }

    // Delete an image from the gallery and local storage
    function deleteImage(index) {
        const storedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
        storedImages.splice(index, 1);
        localStorage.setItem('galleryImages', JSON.stringify(storedImages));
        loadGallery();
    }

    // Add animations to newly added gallery items
    function addGalleryItemAnimations() {
        const galleryItems = document.querySelectorAll(".gallery-item");

        const options = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        galleryItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = "translateY(30px)";
            observer.observe(item);
        });
    }

    addImageButton.addEventListener('click', function () {
        if (imageInput.files.length > 0) {
            saveImageToGallery();
        } else if (imageUrl.value.trim() !== '') {
            saveImageUrlToGallery();
        } else {
            alert('Please select an image file or enter an image URL.');
        }
    });

    loadGallery();
});
