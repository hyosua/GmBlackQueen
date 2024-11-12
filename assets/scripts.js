const mots = ["Beauté","Éclat","Aura","Âme","Style"];
let index = 1;

function changeWord() {
    let elementDynamic = document.getElementById('mot-dynamic');

    //ajoute la classe fade-out pour faire disparaitre le mot
    elementDynamic.classList.add('fade-out');
    setTimeout(() => {
    //change le texte après le fondu
    elementDynamic.textContent = mots[index];
    index = (index + 1) % mots.length;
    //retire la classe pour le faire disparaitre
    elementDynamic.classList.remove('fade-out');
    }, 2000); //correspond au temps du fondu en CSS
}


setInterval(changeWord, 8000); //Change le mot toutes les 3 secondes

window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if(window.scrollY > 20){ //si le scroll dépasse 50 px
        nav.classList.remove('bg-transparent');
        nav.classList.add('bg-red-300','shadow-lg');
    }else{
        nav.classList.remove('bg-red-300','shadow-lg');
        nav.classList.add('bg-transparent');
    }
});