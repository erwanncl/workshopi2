document.getElementById('setLimit').addEventListener('click', function() {
    let timeLimit = document.getElementById('timeLimit').value;
    let enteredCode = document.getElementById('parentCode').value;

    // Vérification du code parental avant de définir la limite de temps
    if (enteredCode === '1234') { // Exemple de code parental, à personnaliser
        if (timeLimit) {
            // Sauvegarder la limite de temps en secondes dans chrome.storage
            chrome.storage.local.set({ 'timeLimit': timeLimit * 60 }, function() {
                // Afficher un message de confirmation avec fond vert
                displayMessage("Limite de temps définie à " + timeLimit + " minutes.", "Confirmation", "green");
            });
        } else {
            // Afficher un message d'erreur avec fond rouge si la limite est invalide
            displayMessage("Veuillez entrer une limite de temps valide.", "Erreur", "red");
        }
    } else {
        // Afficher un message d'erreur avec fond rouge pour un mauvais mot de passe
        displayMessage("Code parental incorrect. Vous ne pouvez pas modifier la limite.", "Erreur", "red");
    }

    // Vider le champ du code parental après avoir cliqué
    document.getElementById('parentCode').value = '';
});

// Fonction générique pour afficher les messages avec une couleur de fond spécifique
function displayMessage(message, title, backgroundColor) {
    const messageDiv = document.createElement('div');
    messageDiv.setAttribute('id', 'display-message');
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${backgroundColor}; /* Fond modifiable */
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-size: 16px;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto; /* Ajout pour permettre le défilement si nécessaire */
        ">
            <div style="max-width: 100%; padding: 20px;">
                <h1 style="font-size: 22px; margin-bottom: 20px;">${title}</h1>
                <p>${message}</p>
            </div>
        </div>
    `;

    // Ajouter l'élément à la page
    document.body.appendChild(messageDiv);

    // Supprimer le message après quelques secondes
    setTimeout(() => {
        document.getElementById('display-message').remove();
    }, 3000); // Le message disparaît après 3 secondes
}

// Fonction pour gérer le signalement de contenu inapproprié
document.getElementById('reportButton').addEventListener('click', function() {
    // Afficher un message de signalement avec fond bleu
    displayMessage("Contenu signalé comme inapproprié ! Merci de contribuer.", "Signalement", "blue");
    
    // Ici, tu pourrais ajouter la logique pour envoyer le signalement à une base de données si nécessaire
});
