var shippingMsg = document.getElementById('freeshipping');
var pricelabel, pricetext, price, amountInputs;

function calculate() {
    setTimeout(function () {
        pricelabel = document.getElementsByClassName('cart-subtotal__price')[0];
        pricetext = pricelabel.innerText;
        price = pricetext.split(',')[0];
        if (price > 0 && price < 499) {
            shippingMsg.innerHTML = `<h2>Dejligt at du handler hos os! Du har næsten købt nok til, at få gratis levering af dine varer.</h2><p> Er du sikker på at du ikke vil benytte dig af muligheden for gratis levering? Du skal bare købe for ${499 - price} mere.</p>`;
        }
        else if (price >= 499) {
            shippingMsg.innerHTML = '<h2>Tillykke! Du har købt nok til, at få gratis levering af dine varer.</h2><p> Er du sikker på at du ikke vil benytte dig af muligheden og købe lidt mere?</p>';
        }
        amountInputs = document.querySelectorAll('.cart__qty-input');
        amountInputs.forEach(element => {
            element.addEventListener('click', function (e) {
                console.log(element);
                calculate();
            });
        });
    }, 1000);
}
calculate();
