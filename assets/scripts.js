//changeWord
const mots = ["Beauté","Éclat","Aura","Âme","Style"];
let indexMot = 1;

const liensMenu = document.querySelectorAll('scroll-button');

liensMenu.forEach(lien => {
    const lienTarget = lien.getAttribute('data-target');
    
    lien.addEventListener('click', function(){
        document.getElementById(lienTarget).scrollIntoView({behavior: 'smooth'});
    });
});



function changeWord() {
    let elementDynamic = document.getElementById('mot-dynamic');

    //ajoute la classe fade-out pour faire disparaitre le mot
    elementDynamic.classList.add('fade-out');
    setTimeout(() => {
    //change le texte après le fondu
    elementDynamic.textContent = mots[indexMot];
    indexMot = (indexMot + 1) % mots.length;
    //retire la classe pour le faire disparaitre
    elementDynamic.classList.remove('fade-out');
    }, 2000); //correspond au temps du fondu en CSS
}


setInterval(changeWord, 8000); //Change le mot toutes les 8 secondes

window.addEventListener('scroll', () => { //Changement de l'aspect de la barre de Nav au scroll
    const nav = document.getElementById('nav');
    const menuitem = document.querySelectorAll('nav ul li a')
    if(window.scrollY > 20){ //si le scroll dépasse 50 px on change la classe de la barre de nav
        nav.classList.remove('bg-transparent');
        for(let i=0;i<menuitem.length;i++){
            menuitem[i].classList.remove('text-white');
        }
        nav.classList.add('shadow-lg','bg-red-400','text-zinc-950');
        
    }else{
        nav.classList.remove('shadow-lg','bg-red-400','text-zinc-950');
        nav.classList.add('bg-transparent');
        for(let i=0;i<menuitem.length;i++){
            menuitem[i].classList.add('text-white');
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





