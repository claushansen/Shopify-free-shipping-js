// on page load (specific to archetype themes!)
document.addEventListener('page:loaded', function() {
   
    // build an observer for DOM mutations
    const MutationObserver = window.MutationObserver 
                          || window.WebKitMutationObserver 
                          || window.MozMutationObserver;

    // set the target to listen on
    const targetNode = document.getElementById('StickySubtotal'); // watch the sticky-cart's subtotal
    const shippingSavingsMessages = document.querySelectorAll('.shipping-savings-message');
 
    // set the observer's config
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };

    // setup our mutation observer
    const observer = new MutationObserver(function(mutations) {
      
      // for each mutation
      mutations.forEach(function(mutation) {
        console.log('mutation =', mutation); // help us see whats being mutated in the console
        
        // grab the target's inner HTML and regex it to output it into Shopify's money format
        let targetNodeValue = targetNode.innerHTML;                               // the StickySubtotal's value / innerHTML
        const subtotalFromMoney = Number(targetNodeValue.replace(/[\$,.]/g, "")); // this takes $20.25 and regexes it to 2025
        const shippingValue = document.getElementById('shippingValue').innerHTML; // grabs the shipping value from the DOM
        
        // get the difference of the two values
        const priceDiff = shippingValue - subtotalFromMoney; // it's just math ok?
        const priceDiffToMoney = (priceDiff/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // this takes the difference and regexes it back into money! so 2025 would become 20.25
        
        // if the shipping value is more than the subtotal from money
        if (priceDiff > 0) {
         
          // for each case where the shippings-saved-message appears
          shippingSavingsMessages.forEach(function(shippingSavingsMessage) {
            // edit the DOM and update the value of the shipping message
            shippingSavingsMessage.innerHTML = '<span>$' + `${priceDiffToMoney}` + '</span> away from free shipping!'; 
          })
          
        // if it's not, let's tell them they've got free shipping.
        } else {
          shippingSavingsMessages.forEach(function(shippingSavingsMessage) {
            shippingSavingsMessage.innerHTML = "Awesome, you've got free shipping!";
          })
        }
      });
    });
    observer.observe(targetNode, config);
});  
    