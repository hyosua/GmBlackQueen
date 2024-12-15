//                                  
/*              MENU            */
//

const menuBurger = document.getElementById('menu-burger');
const menu = document.getElementById('menu');
const liens = document.querySelectorAll('.lienMenu');

menuBurger.addEventListener('click', () => {
    if (menu.classList.contains('menu-hidden')) {
        menu.classList.remove('menu-hidden');
        menu.classList.add('menu-visible');
    } else {
        menu.classList.remove('menu-visible');
        menu.classList.add('menu-hidden');
    }
});

/*
window.addEventListener('scroll', () => { //Changement de l'aspect de la barre de Nav au scroll
    const barreNav = document.getElementById('nav');
    
    const ifScrolled = window.scrollY > 50;
    
    barreNav.classList.toggle("scrolled", ifScrolled);
    liens.forEach((lien) => {
        lien.classList.toggle("scrolled", ifScrolled)
    });
    
});
*/
//Animation du Bouton Scroll
document.getElementById('bouton-scroll').addEventListener('click', function() {
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
    document.getElementById('bouton-scroll').classList.add('hidden');
});

liens.forEach(link => { //pour chaque lien, effect scrollIntoView
  const linkTarget = link.getAttribute('href').substring(1);
  link.addEventListener('click', () => {
    document.getElementById(linkTarget).scrollIntoView({behavior: 'smooth'});
    if (menu.classList.contains('menu-visible')){
        menu.classList.remove('menu-visible');
        menu.classList.add('menu-hidden');
    }
  });

});

//                                  
/*              CAROUSEL            */
//

document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");
    const tableauImages = [];

    // Récupérer les images de chaque carousel et les stocker dans tableauImages
    carousels.forEach((carousel) => {
        const images = Array.from(carousel.querySelectorAll(".carousel-item"));
        tableauImages.push(images);
    });

    let indexImageActuelle = 0; // Indice global pour les images
    let indexCarouselActuel = 0; // Indice du carousel actif
    
    function masquerImages(carouselActuel){
        carouselActuel.forEach(image => {
            
            image.classList.remove("active");
            image.classList.add("cache");
        });
    }

    function afficherImage(imageActuelle){
        imageActuelle.classList.remove("cache");
        imageActuelle.classList.add("active");
    }
    
    function lancerCarousel(){
        const carouselActuel = tableauImages[indexCarouselActuel];
        const imageActuelle = carouselActuel[indexImageActuelle];

        masquerImages(carouselActuel);
        afficherImage(imageActuelle);
        // Mettre à jour l'index de l'image et du carousel
        indexImageActuelle = (indexImageActuelle + 1) % carouselActuel.length;
        // Passer au carousel suivant après celui-ci
        indexCarouselActuel = (indexCarouselActuel + 1) % tableauImages.length;

    }

    lancerCarousel();
    // Définir un intervalle pour faire défiler les images
    setInterval(lancerCarousel, 4000); 

});

//                                  
/*              FORMULAIRE            */
//

document.getElementById("formulaire-contact").addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const button = document.getElementById("submitButton");
        const buttonText = document.getElementById("buttonText");
        const loader = document.getElementById("loader");
        const champsFormulaire = document.getElementById("champs-formulaire");
        const formConteneur = document.getElementById("form-conteneur");
        const contactSection = document.getElementById("contact-section");
        const messageDiv = document.getElementById("form-message");

        button.disabled = true;
        loader.classList.remove("hidden");
        buttonText.textContent = "Envoi...";
        button.classList.remove("bg-red-500");
        button.classList.add("bg-red-400");
        
        try{
            const reponse = await fetch("http://localhost:3000/submit", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const resultat = await reponse.json();
    
            if(reponse.ok){
                formConteneur.removeChild(form);
                formConteneur.classList.add("p-4"); // Réduit les marges internes
                formConteneur.classList.remove("lg:p-10");
                formConteneur.classList.add("h-56");
                contactSection.classList.add("items-center");
                messageDiv.textContent = `Merci pour votre message. Je vous recontacterai prochainement!`;
                messageDiv.className = "text-green-500 text-center font-bold";
            }else{
                messageDiv.textContent = `Erreur: ${resultat.error || "impossible d'envoyer le message."}`;
            }
        }catch(error){
                messageDiv.textContent = `Erreur réseau: ${error.message}`;
                button.disabled = false;
                button.classList.remove("bg-red-400");
                button.classList.add("bg-red-500");   
                loader.classList.add("hidden");
                buttonText.textContent = "Envoyer";
        }
        
});

function afficherMessage(message, type){
    const messageDiv = document.getElementById("form-message");
    messageDiv.textContent = message;

    if (type === "success") {
        messageDiv.className = "text-white text-center font-bold";
    } else {
        messageDiv.className = " text-white text-center font-bold";
    }
}



