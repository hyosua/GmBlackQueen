//                                  
/*              MENU            */
//

const menuBurger = document.getElementById('menu-burger');
const menu = document.getElementById('menu');

menuBurger.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

//Animation du Bouton Scroll
document.getElementById('bouton-scroll').addEventListener('click', function() {
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
});

const liensMenu = document.querySelectorAll('scroll-button');

liensMenu.forEach(lien => {
    const lienTarget = lien.getAttribute('data-target');
    
    lien.addEventListener('click', function(){
        document.getElementById(lienTarget).scrollIntoView({behavior: 'smooth'});
    });
});



// setInterval(changeWord, 8000); //Change le mot toutes les 8 secondes

window.addEventListener('scroll', () => { //Changement de l'aspect de la barre de Nav au scroll
    const menuitem = menu.querySelectorAll('ul li a')
    if(window.scrollY > 20){ //si le scroll dépasse 50 px on change la classe de la barre de nav
        menu.classList.remove('bg-transparent');
        for(let i=0;i<menuitem.length;i++){
            menuitem[i].classList.remove('text-red-400','hover:text-red-300');
            menuitem[i].classList.add('hover:text-zinc-900');
        }
        menu.classList.add('shadow-lg','bg-red-400','text-yellow-200');
        
    }else{
        menu.classList.remove('shadow-lg','bg-red-400','text-yellow-200');
        menu.classList.add('bg-transparent');
        for(let i=0;i<menuitem.length;i++){
            menuitem[i].classList.add('text-red-400');
        }
        
    }
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





