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

document.addEventListener('DOMContentLoaded', init);


// Init The App
// Here W'll Grab Everything Like The Span The Element And The Attributes 
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words')); // We Need To Parse It Cause We Need To Use It In Javascript Because Right Now JS Looks At It As A String
    const wait = txtElement.getAttribute('data-wait'); // To Get The Wait Time From The Element

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}
