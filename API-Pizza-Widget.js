document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
        return {
            init() {
                // alert('piiiiizzza loading')
                const cart_code = '...';
                const url = `https://pizza-cart-api.herokuapp.com/api/pizzas`;

                axios
                .get(url)
                .then((result) => {
                    const pizzas = result.data.pizzas; 
                    // this.pizzas is declared on you AlpineJS Widget.
                    this.pizzas = pizzas;
                })
                .then(() => {
                    return this.createCart();
                })
                .then((result) => {
                    const cartID = result.data.cart_code; 
                    // this.pizzas is declared on you AlpineJS Widget.
                    this.cartID = cartID;
                });

            },

            createCart() {
                // const cart_code = '...';
                const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=` + this.username;

                return axios.get(url) 
            },

            showCart() {
                const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartID}/get`;

                axios
                .get(url)
                .then((result) => {
                    this.cart = result.data;
                });
            },

            pizzaImage(pizza) {
                return `/images/${pizza.size}.png`
            },

            message : 'Eating Pizzas',
            username : 'Leigh',
            pizzas : [],
            cartID : '',
            cart : { total : 0},
            checkOutButton : true,
            payNow : false,

            paymentAmount: 0,
            returnFeedback: '',

            makePayment () {
                if(!this.paymentAmount) {
                  this.returnFeedback = 'No amount entered'
                }
                else if ((this.cart.total) > this.paymentAmount) {
                  this.returnFeedback = 'Payment unsuccessful'
                }
                else {this.returnFeedback = 'Payment Successful'
          
                setTimeout(()=> {
                  this.payNow=false;
                  this.clearCart()}, 5000)
                }
              },
              clearCart() {
                this.cart = 0.00;
              },
           

            add(pizza) {
                const params = {
                    cart_code: this.cartID,
                    pizza_id: pizza.id
                }

                axios
                .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
                .then(() => {

                    this.message = "Pizza added to the cart" 
                    this.showCart();

                } )
                .catch(err => alert(err) );

                // alert(JSON.stringify(pizza))
                // alert(pizza.flavour + " : " + pizza.size + " : " + pizza.price)
                // alert(pizza.id)

            }
            
                
        }
    })
    
    })