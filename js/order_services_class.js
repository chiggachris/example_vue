/*
 * Choose services to order.
 *
 * @author Robert C. Duvall and Danny Markov
 */
// create model object that will manage just the data
class OrderApp {
    constructor () {
        this.services = [];
    }

    // toggle whether or not given service is selected
    toggleActive (s) {
        s.active = !s.active;
    }

    // calculate total cost of services
    total () {
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

    // load data dynamically from given URL using new JavaScript promises
    loadData (url) {
        fetch(url).then(response => response.json())
                  .then(data => this.services = data)
                  .catch(error => console.log(error));
    }
}

// Define custom "currency" filter
Vue.filter('currency', function (value) {
    return '$' + value.toFixed(2);
});

// create instance of our class to handle data
var appClass = new OrderApp();
// create Vue object that will communicate with HTML DOM using our class
var app = new Vue({
    data: appClass,
    methods: {
        toggleActive: appClass.toggleActive
    },
    computed: {
        total: appClass.total
    },
    mounted() {
        // see if any parameters were provided with the URL that loaded this page
        var param = new URL(window.location).searchParams.get("services");
        // ALWAYS have a sensible default option
        var type = param ? param : 'webdev';
        // load JSON data associated with given parameter
        appClass.loadData('data/'+type+'_services.json');
    }
});
// attach Vue app to an existing DOM element
app.$mount('#main');
console.log('Using CLASS');
