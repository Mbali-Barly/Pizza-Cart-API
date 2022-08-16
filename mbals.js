document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function () {
        return {
            init ()  {
                //  alert ('pizza loading')
                const cart_code = '...';
                const url = `https://pizza-cart-api.herokuapp.com/api/pizzas`;
                
                axios
                .get(url)
                .then((result) => {
                    const pizzas = result.data.pizzas;
                    
                    // this.pizzas is declared on you AlpineJS Widget.
                    this.pizzas = pizzas;
                })
              },

            message : 'eating pizza',

            pizzas : []
        }
    })
})