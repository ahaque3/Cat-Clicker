/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Code Reviewer',
            imgSrc : 'https://lh3.googleusercontent.com/-eqVKaMKvIGE/VJrxEu8k8AI/AAAAAAAAMvA/Gckv2J59mIE5tHVPev2hkHLEvg-nHWBHg/w530-h298-n/GP%2B12-24.jpg',
            imgAttribution : 'https://lh3.googleusercontent.com/-eqVKaMKvIGE/VJrxEu8k8AI/AAAAAAAAMvA/Gckv2J59mIE5tHVPev2hkHLEvg-nHWBHg/w530-h298-n/GP%2B12-24.jpg'
        },
        {
            clickCount : 0,
            name : 'Just fixing one more bug...',
            imgSrc : 'http://nixielife.com/fun/wp-content/uploads/2013/01/Programmer-Cat-ignoring-mouse.jpg',
            imgAttribution : 'http://nixielife.com/fun/wp-content/uploads/2013/01/Programmer-Cat-ignoring-mouse.jpg'
        },
        {
            clickCount : 0,
            name : 'Kitten Beauty Pagent',
            imgSrc : 'https://geekshumor.com/wp-content/uploads/2013/11/Programmer-cat.jpg',
            imgAttribution : 'https://geekshumor.com/wp-content/uploads/2013/11/Programmer-cat.jpg'
        },
        {
            clickCount : 0,
            name : 'Just what every programmer needs',
            imgSrc : 'https://img.memecdn.com/cat-programmer_o_2193441.jpg',
            imgAttribution : 'https://img.memecdn.com/cat-programmer_o_2193441.jpg'
        },
        {
            clickCount : 0,
            name : 'Everyone needs a little humor in their lives...',
            imgSrc : 'https://i.pinimg.com/originals/7f/19/f5/7f19f5d9cc1ae1229a2ad49e44667f92.jpg',
            imgAttribution : 'https://i.pinimg.com/originals/7f/19/f5/7f19f5d9cc1ae1229a2ad49e44667f92.jpg'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
