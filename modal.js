document.addEventListener('DOMContentLoaded', () => {
    const openModalButtons = document.querySelectorAll('.open_modal');
    const closeModalButtons = document.querySelectorAll('.close_modal');
    const modals = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.classList.add("active");
                overlay.classList.remove('hidden');
                displayPics(modal);
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove("active");
                overlay.classList.add('hidden');
            }
        });
    });

    overlay.addEventListener('click', () => {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            modal.classList.remove("active");
        });
        overlay.classList.add('hidden');
    });

    // Fonction pour gérer la galerie d'images
    function displayPics(modal) {
        const photos = modal.querySelector('.modal_gallery');
        if (!photos) {
            console.error("Element with class 'modal_gallery' not found in the modal");
            return;
        }

        const links = photos.getElementsByTagName('a');

        const bigPhoto = modal.querySelector('.modal_img');

        Array.from(links).forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault(); // Empêche le comportement par défaut du lien
                const newSrc = link.getAttribute('href');
                const newAlt = link.getAttribute('title');

                // Change le `src` et le `alt` de l'image principale
                bigPhoto.src = newSrc;
                bigPhoto.alt = newAlt;

                // Log pour le débogage
                console.log("Image mise à jour :", { src: bigPhoto.src, alt: bigPhoto.alt });
            });
        });
    }

});