var shippingMsg = document.querySelector('.announcement-bar');
var cartPriceLabels, pricelabel, pricetext, price, adjustButtons, addToCartBtn, quickViewBtn, cartNote;

calculate();

function calculate() {
    setTimeout(function () {
        cartPriceLabels = document.querySelectorAll('.ajaxcart__price');
        if (cartPriceLabels.length > 0) {
            pricelabel = cartPriceLabels[cartPriceLabels.length - 1];
            pricetext = pricelabel.innerText;
            price = pricetext.split(',')[0].replace('.', '');
            cartNote = document.querySelector('.ajaxcart__note');

            if (price > 0 && price < 499) {
                shippingMsg.innerHTML = `<h2>Dejligt at du handler hos os! Du har næsten købt nok til, at få gratis levering af dine varer.</h2><p> Er du sikker på at du ikke vil benytte dig af muligheden for gratis levering? Du skal bare købe for ${499 - price} kr. mere.</p>`;
                cartNote.innerText = `Du har ikke helt købt nok til at få gratis fragt. Køb for ${499 - price} kr. mere og få gratis levering!`;
            }
            else if (price >= 499) {
                shippingMsg.innerHTML = '<h2>Tillykke! Du har købt nok til, at få gratis levering af dine varer.</h2><p> Er du sikker på at du ikke vil benytte dig af muligheden og købe lidt mere?</p>';
                cartNote.innerText = `Du har opnået gratis levering af dine varer!`;
            }
        }

        addToCartBtn = document.querySelectorAll('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.forEach(element => {
                element.addEventListener('click', function (e) {
                    calculate();
                });
            });
        }

        quickViewBtn = document.querySelectorAll('.quick-product__btn');
        if (quickViewBtn) {
            quickViewBtn.forEach(element => {
                element.addEventListener('click', function (e) {
                    calculate();
                });
            });
        }

        //getting all adjustbuttons in cart
        adjustButtons = document.querySelectorAll('.js-qty__adjust');
        //setting a click eventhandler on every button to re-calculate
        if (adjustButtons) {
            adjustButtons.forEach(element => {
                element.addEventListener('click', function (e) {
                    calculate();
                });
            });
        }
    }, 1000);


}

