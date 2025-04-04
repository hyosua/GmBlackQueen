// form.js

// Gestion du formulaire de contact


document.getElementById("formulaire-contact").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const button = document.getElementById("submitButton");
    const buttonText = document.getElementById("buttonText");
    const loader = document.getElementById("loader");
    const formConteneur = document.getElementById("form-conteneur");
    const contactSection = document.getElementById("contact-section");
    const messageDiv = document.getElementById("form-message");
    const formTitle = document.getElementById("form-title");

    button.disabled = true;
    loader.classList.remove("hidden");
    buttonText.textContent = "Envoi...";
    button.classList.remove("bg-red-500");
    button.classList.add("bg-red-400");
    
    
    try {
        const reponse = await fetch("https://gmblackqueen.vercel.app/envoi-email", {//
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        let resultat = {};
        try {
            resultat = await reponse.json(); // Essayez de lire la réponse JSON
        } catch (err) {
            console.error("Erreur lors du parsing JSON:", err);
        }
    
        const messageDiv = document.getElementById("form-message");
        const messageText = document.getElementById("form-message-text");
        const champsForm = document.getElementById("champs-formulaire");

        if (reponse.ok) {
            champsForm.remove();
            formTitle.textContent = "Message Envoyé";
            formConteneur.classList.remove("w-full");
            formConteneur.classList.add("shrink");
            formConteneur.classList.add('shake-yes');
            setTimeout(() => {
                formConteneur.classList.remove('shake-yes');
              }, 500);

        } else {
            formConteneur.classList.add('shake-no');
            setTimeout(() => {
                formConteneur.classList.remove('shake-no');
              }, 500);
            messageText.textContent = `Erreur: ${resultat.error || "impossible d'envoyer le message."}`;
            messageDiv.className = "message-container error";
            button.disabled = false;
            button.classList.remove("bg-red-400");
            button.classList.add("bg-red-500");
            loader.classList.add("hidden");
            buttonText.textContent = "Envoyer";
        }
        console.log(messageDiv.className);
        messageDiv.classList.remove("hidden"); // Affiche le message
        
    } catch (error) {
        formConteneur.classList.add('shake-no');
        setTimeout(() => {
            formConteneur.classList.remove('shake-no');
            }, 500);
        messageDiv.textContent = `Erreur réseau: ${error.message}`;
        messageDiv.className = "message-container error";
        button.disabled = false;
        button.classList.remove("bg-red-400");
        button.classList.add("bg-red-500");
        loader.classList.add("hidden");
        buttonText.textContent = "Envoyer";
    }
    
    
});


export default {};