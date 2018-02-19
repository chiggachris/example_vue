/*
 * Choose services to order.
 *
 * @author Robert C. Duvall and Danny Markov
 */
// Define model data
// View will loop through this to genreate <li> element for each one
var servicesData = [
    {
        name: 'Web Development',
        price: 300,
        active: true
    },
    {
        name: 'Design',
        price: 400,
        active: false
    },
    {
        name: 'Integration',
        price: 250,
        active: false
    },
    {
        name: 'Training',
        price: 220,
        active: false
    }
];

// Define app based on model data that will communicate with HTML DOM
var app = new Vue({
    data: {
        services: servicesData
    },
    methods: {
        // toggle whether or not given service is selected
        toggleActive: function(s) {
            s.active = !s.active;
        }
    },
    computed: {
        // calculate total cost of services
        total: function() {
            return this.services.filter(s => s.active)
                                .map(s => s.price)
                                .reduce((a, b) => a + b, 0);
            // OR
            //var total = 0;
            //for (var s of this.services) {
            //    if (s.active) {
            //        total += s.price;
            //    }
            //}
            //return total;
        }
    }
});

// Define custom "currency" filter
Vue.filter('currency', function (value) {
    return '$' + value.toFixed(2);
});

app.$mount('#main');
console.log('Using OBJECT');
