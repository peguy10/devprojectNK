document.addEventListener('DOMContentLoaded', function() {
    // Configuration des options disponibles avec leurs chemins
    const categories = {
        hair: 'images/hair',
        ears: 'images/ears',
        eyes: 'images/eyes',
        mouth: 'images/mouth',
        neck: 'images/neck',
        leg: 'images/leg',
        accessories: 'images/accessories',
        backgrounds: 'images/backgrounds'
    };

    // État actuel des sélections
    let currentSelections = {
        eyes: 'default.png',
        hair: 'default.png',
        ears: 'default.png',
        mouth: 'default.png',
        neck: 'default.png',
        leg: 'default.png',
        accessories: 'headphone.png',
        backgrounds: 'blue50.png'
    };

    // Charger toutes les options disponibles
    function loadOptionsForCategory(category) {
        const optionsContainer = document.getElementById(`${category}-options`);
        optionsContainer.innerHTML = '';
        
        const options = {
            eyes: ['angry.png', 'default.png', 'naughty.png', 'panda.png', 'smart.png', 'star.png'],
            hair: ['bang.png', 'curls.png', 'default.png', 'elegant.png', 'fancy.png', 'quiff.png', 'short.png'],
            ears: ['default.png', 'tilt-backward.png', 'tilt-forward.png'],
            mouth: ['astonished.png', 'default.png', 'eating.png', 'laugh.png', 'tongue.png'],
            neck: ['bend-backward.png', 'bend-forward.png', 'default.png', 'thick.png'],
            leg: ['bubble-tea.png', 'cookie.png', 'default.png', 'game-console.png', 'tilt-backward.png', 'tilt-forward.png'],
            accessories: ['earings.png', 'flower.png', 'glasses.png', 'headphone.png'],
            backgrounds: ['blue50.png', 'blue60.png', 'blue70.png', 'darkblue30.png', 'darkblue50.png', 'darkblue70.png', 
                         'green50.png', 'green60.png', 'green70.png', 'grey40.png', 'grey70.png', 'grey80.png',
                         'red50.png', 'red60.png', 'red70.png', 'yellow50.png', 'yellow60.png', 'yellow70.png']
        };

        options[category].forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.replace('.png', '').replace('-', ' ');
            button.dataset.option = option;
            button.addEventListener('click', () => {
                currentSelections[category] = option;
                updateAlpacaImage(category);
            });
            
            // Afficher une miniature si c'est une image
            if (category !== 'backgrounds') {
                const imgPreview = document.createElement('img');
                imgPreview.src = `${categories[category]}/${option}`;
                imgPreview.alt = option;
                imgPreview.style.width = '20px';
                imgPreview.style.height = '20px';
                imgPreview.style.marginRight = '5px';
                button.prepend(imgPreview);
            }
            
            optionsContainer.appendChild(button);
        });
    }

    // Initialiser toutes les catégories
    Object.keys(categories).forEach(category => {
        // Charger les options
        loadOptionsForCategory(category);
        
        // Ajouter un événement pour développer/réduire les options
        const title = document.querySelector(`h3[data-category="${category}"]`);
        title.addEventListener('click', () => {
            const options = document.getElementById(`${category}-options`);
            options.style.display = options.style.display === 'none' ? 'flex' : 'none';
        });
    });

    // Fonction pour mettre à jour l'image de l'alpaga
    function updateAlpacaImage(category) {
        const imgElement = document.getElementById(category === 'backgrounds' ? 'background' : category);
        if (currentSelections[category]) {
            imgElement.src = `${categories[category]}/${currentSelections[category]}`;
            imgElement.style.display = 'block';
        } else {
            imgElement.style.display = 'none';
        }
    }

    // Bouton Random
    document.getElementById('random').addEventListener('click', function() {
        Object.keys(categories).forEach(category => {
            const options = document.getElementById(`${category}-options`);
            const buttons = options.querySelectorAll('button');
            if (buttons.length > 0) {
                const randomIndex = Math.floor(Math.random() * buttons.length);
                buttons[randomIndex].click();
            }
        });
    });

    // Bouton Download
    document.getElementById('download').addEventListener('click', function() {
        // alert("En production, vous implémenteriez ici le téléchargement de l'image");
        // Vous pourriez utiliser html2canvas pour capturer l'image
        html2canvas(document.querySelector('.alpaca-image')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'alpaca.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    // Initialiser les images par défaut
    Object.keys(currentSelections).forEach(category => {
        if (currentSelections[category]) {
            updateAlpacaImage(category === 'backgrounds' ? 'backgrounds' : category);
        }
    });
});