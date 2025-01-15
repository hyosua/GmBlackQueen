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

    button.disabled = true;
    loader.classList.remove("hidden");
    buttonText.textContent = "Envoi...";
    button.classList.remove("bg-red-500");
    button.classList.add("bg-red-400");
    
    try {
        const reponse = await fetch("http://localhost:3000/envoi-email", {
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
    
        if (reponse.ok) {
            formConteneur.removeChild(form);
            formConteneur.classList.add("p-4"); // Réduit les marges internes
            formConteneur.classList.remove("lg:p-10");
            formConteneur.classList.add("h-56");
            contactSection.classList.add("items-center");
            messageDiv.textContent = `Merci pour votre message. Je vous recontacterai prochainement!`;
            messageDiv.className = "text-white text-center font-bold";
        } else {
            messageDiv.textContent = `Erreur: ${resultat.error || "impossible d'envoyer le message."}`;
            messageDiv.className = "text-white text-center font-bold";
        }
    } catch (error) {
        messageDiv.className = "text-white text-center font-bold";
        messageDiv.textContent = `Erreur réseau: ${error.message}`;
        button.disabled = false;
        button.classList.remove("bg-red-400");
        button.classList.add("bg-red-500");
        loader.classList.add("hidden");
        buttonText.textContent = "Envoyer";
    }
    
    
});


export default {};