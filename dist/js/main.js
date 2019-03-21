// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 3000){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type(){
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting){
            // Remove Caharcter
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else{
            // Add Character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert Txt  Into Element
        this.txtElement.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 300;

        if(this.isDeleting){
            typeSpeed /= 2;
        }

        // If Word Is Complete
        if(!this.isDeleting && this.txt === fullTxt){
            // Make Pause At End
            typeSpeed = this.wait

            // Set Delete To True
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === ''){
            this.isDeleting = false;

            // Move To The Next Word
            this.wordIndex++;

            // Pause Before Start Typing
            typeSpeed = 500;
        }

        // At The Very End To Run It At A Certain Pace
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Select DOM Items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State Of Menu
let showMenu = false;

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);
menuBtn.addEventListener('click', toggleMenu);

function toggleMenu(){
    if(!showMenu){
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBranding.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        // Set Menu State
        showMenu = true;
    } else{
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBranding.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        // Set Menu State
        showMenu = false;
    }
}


// Init The App
// Here W'll Grab Everything Like The Span The Element And The Attributes 
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words')); // We Need To Parse It Cause We Need To Use It In Javascript Because Right Now JS Looks At It As A String
    const wait = txtElement.getAttribute('data-wait'); // To Get The Wait Time From The Element

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}