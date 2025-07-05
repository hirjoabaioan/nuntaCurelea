document.addEventListener('DOMContentLoaded', function() {

    // --- LOGICA PENTRU TIMER ---
    const eventDate = new Date("Oct 18, 2025 18:00:00").getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Calculează zile, ore, minute, secunde
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Afișează în HTML
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        // Oprește timerul când evenimentul a trecut
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "Evenimentul a avut loc!";
        }
    }, 1000);


    // --- LOGICA PENTRU FORMULARUL RSVP ---
    const radioDa = document.getElementById('prezenta-da');
    const radioNu = document.getElementById('prezenta-nu');
    const formDa = document.getElementById('form-da');
    const formNu = document.getElementById('form-nu');
    const meniuCopiiCheckbox = document.getElementById('meniu-copii');
    const nrCopiiGrup = document.getElementById('nr-copii-grup');

    // Funcție pentru a afișa/ascunde formularele
    function toggleForms() {
        if (radioDa.checked) {
            formDa.classList.remove('hidden');
            formNu.classList.add('hidden');
        } else if (radioNu.checked) {
            formNu.classList.remove('hidden');
            formDa.classList.add('hidden');
        }
    }

    // Funcție pentru a afișa/ascunde câmpul pentru numărul de copii
    function toggleMeniuCopii() {
        if (meniuCopiiCheckbox.checked) {
            nrCopiiGrup.classList.remove('hidden');
        } else {
            nrCopiiGrup.classList.add('hidden');
        }
    }

    // Adaugă event listeners
    radioDa.addEventListener('change', toggleForms);
    radioNu.addEventListener('change', toggleForms);
    meniuCopiiCheckbox.addEventListener('change', toggleMeniuCopii);

});

// Adaugă acest cod la finalul fișierului script.js

const form = document.getElementById('rsvp-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Oprește reîncărcarea paginii

    // URL-ul obținut de la Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwhjfu4qHdO6Qu8TzGVAEcf3pSHd9z0-DSL3KxSdzftl6XC0xND6PKlE3jUvwNdPvG1-w/exec'; 

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(scriptURL, { 
        method: 'POST',
        mode: 'no-cors', // Important pentru a evita erorile CORS cu Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        formMessage.textContent = 'Mulțumim pentru răspuns! A fost înregistrat cu succes.';
        formMessage.className = 'success'; // Aplică clasa de stil
        formMessage.classList.remove('hidden');
        form.reset(); // Golește formularul
        // Ascunde din nou secțiunile condiționale
        document.getElementById('form-da').classList.add('hidden');
        document.getElementById('form-nu').classList.add('hidden');
        document.getElementById('nr-copii-grup').classList.add('hidden');
    })
    .catch(error => {
        formMessage.textContent = 'A apărut o eroare. Vă rugăm să încercați din nou.';
        formMessage.className = 'error';
        formMessage.classList.remove('hidden');
        console.error('Error!', error.message);
    });
});