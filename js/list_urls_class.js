/*
 * List your favorite URLs.
 *
 * @author Robert C. Duvall
 */
// default data
// View will loop through this to genreate <li> element with hyperlinks for each one
var dukeLinks = [
    { name:'Duke University', url:'http://www.duke.edu/' },
    { name:'Duke Computer Science', url:'http://www.cs.duke.edu/' },
    { name:'Duke Basketball', url:'http://www.goduke.com/SportSelect.dbml?SPID=1846' },
    { name:'Duke Lemur Center', url:'http://lemur.duke.edu/' },
    { name:'Duke Marine Lab', url:'https://nicholas.duke.edu/marinelab' },
    { name:'Events at Duke', url:'http://calendar.duke.edu/events/' },
    { name:'Duke Chronicle', url:'http://www.dukechronicle.com/' },
    { name:'Duke Chapel', url:'https://chapel.duke.edu/' }
];


// create model object that will manage just the data
class LinkListApp {
    constructor () {
        // in this case, make sure to make a different array from the default data
        this.links = [].concat(dukeLinks);
    }

    // replace current links with the given link data
    addLinks (links) {
        this.links = links;
    }

    // load links dynamically from separate URL in the background without reloading page
    loadLinks (url) {
        // fetch is a new general purpose way to use AJAX that uses "promises"
        // - first function is called when the data is loaded
        // - second function is called when data is converted to JSON
        fetch(url).then(response => response.json())
                  .then(data => this.addLinks(data))
                  .catch(error => console.log(error));
    }

    // switch between the two different sets of links
    toggleLinks () {
        // check text displayed on the page of the first link to a known value
        if (this.links[0].name === dukeLinks[0].name) {
            this.loadLinks('data/compsci_links.json');
        }
        else {
            this.addLinks(dukeLinks);
        }
    }
}

// create instance of our class to handle data
var appClass = new LinkListApp();
// create Vue object that will communicate with HTML DOM using our class
var app = new Vue({
    data: appClass,
    methods: {
        addLinks: appClass.addLinks,
        loadLinks: appClass.loadLinks,
        toggleLinks: appClass.toggleLinks
    }
});
// attach Vue app to an existing DOM element
app.$mount('#app');
console.log('Using CLASS');
