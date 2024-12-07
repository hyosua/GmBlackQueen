//                                  
/*              MENU            */
//

const menuBurger = document.getElementById('menu-burger');
const menu = document.getElementById('menu');
const liens = document.querySelectorAll('.lienMenu');

menuBurger.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

window.addEventListener('scroll', () => { //Changement de l'aspect de la barre de Nav au scroll
    const barreNav = document.getElementById('nav');
    
    const ifScrolled = window.scrollY > 50;
    
    barreNav.classList.toggle("scrolled", ifScrolled);
    liens.forEach((lien) => {
        lien.classList.toggle("scrolled", ifScrolled)
    });
    
});

//Animation du Bouton Scroll
document.getElementById('bouton-scroll').addEventListener('click', function() {
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
});

liens.forEach(link => { //pour chaque lien, effect scrollIntoView
  const linkTarget = link.getAttribute('href').substring(1);
  link.addEventListener('click', () => {
    console.log(document.getElementById(linkTarget))
    document.getElementById(linkTarget).scrollIntoView({behavior: 'smooth'});
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





