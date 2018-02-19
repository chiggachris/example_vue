// create model object that will manage just the data
class VueApp {
    // ANY data you ever plan to use on the page should be initialized at the start
    constructor () {
        this.name = 'World';
        this.status = 'You loaded this page on ' + new Date().toLocaleString();
        this.showStatus = false;
    }

    // can still make any methods you think will be useful
    reverseName () {
        console.log('Using CLASS');
        this.name = this.name.split('').reverse().join('');
    }

    // can provide simple getters for any property you want
    length () {
        console.log('Using CLASS');
        return this.name.length;
    }

    // changing boolean values can cause changes on the page
    toggleStatus () {
        console.log('Using CLASS');
        this.showStatus = !this.showStatus;
    }
}

// create instance of our class to handle data
var myAppClass = new VueApp();
// create Vue object that will communicate with HTML DOM using our class
var appClass = new Vue({
    // ONLY variables set in the constructor will be watched by Vue for changes
    data: myAppClass,
    // add any extra "data" that is returned by calling a method
    computed: {
        length: myAppClass.length
    },
    // add any methods you want to be called from HTML
    methods: {
        reverseName: myAppClass.reverseName
    },
    // add any methods you want to know about changes to specific data
    watch: {
        'name': myAppClass.toggleStatus
    },
    // called when the page has been loaded and this app has been attached to a DOM element
    mounted() {
        console.log(this.$el);
    }
});


// TYPICAL way to set up Vue by sending an anonymous object
var appObject = new Vue({
    // ONLY variables set here will be watched by Vue for changes
    data: {
        name: 'Vue',
        status: 'You loaded this page on ' + new Date().toLocaleString(),
        showStatus: false
    },
    // create functions that can be used like data on HTML page
    computed: {
        length: function() {
            console.log('Using OBJECT');
            return this.name.length;
        }
    },
    // create functions you want to be called from HTML
    methods: {
        reverseName: function () {
            console.log('Using OBJECT');
            this.name = this.name.split('').reverse().join('');
        }
    },
    // create functions that are called automatically when the named "data" changes
    watch: {
        'length': function() {
            console.log('Using OBJECT');
            this.showStatus = !this.showStatus;
        }
    },
    // called when the page has been loaded and this app has been attached to a DOM element
    mounted() {
        console.log(this.$el);
    }
});

// attach Vue apps to existing DOM elements
appClass.$mount('#app1');
appObject.$mount('#app2');
