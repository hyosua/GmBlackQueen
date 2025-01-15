// menu.js

// Gestion du menu burger
const menuBurger = document.getElementById('menu-burger');
const menu = document.getElementById('menu');
const liens = document.querySelectorAll('.lienMenu');

// Ouvrir/Fermer le menu    
menuBurger.addEventListener('click', () => {
    if (menu.classList.contains('menu-hidden')) {
        menu.classList.remove('menu-hidden');
        menu.classList.add('menu-visible');
    } else {
        menu.classList.remove('menu-visible');
        menu.classList.add('menu-hidden');
    }
});


// Gestion des liens du menu
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

export default {};                  