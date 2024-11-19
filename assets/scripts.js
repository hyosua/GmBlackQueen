//changeWord
const mots = ["Beauté","Éclat","Aura","Âme","Style"];
let indexMot = 1;



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
    if(window.scrollY > 20){ //si le scroll dépasse 50 px
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

document.addEventListener("DOMContentLoaded", () => { //Execute la fonction une fois que le contenu du DOM est chargé

    const items = document.querySelectorAll('.carousel-item');
    let indexInterval = 0;
    

    function defilementCarousel(){
        indexInterval = (indexInterval+1) % items.length;
        
        items.forEach((element, index) => {

            if(index === indexInterval){
                element.classList.remove("hidden");
                element.classList.add("active");        
            }else{
                element.classList.remove("active");
                element.classList.add("hidden");
            }
        });
    }

setInterval(defilementCarousel,4000);
});
