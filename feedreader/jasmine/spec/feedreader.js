/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); //expects the array allFeeds to be defined
            expect(allFeeds.length).not.toBe(0); // expects it to have feeds
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a url defined and not be empty', function() {
           allFeeds.forEach(function(item) {
             expect(item.url).toBeDefined();  //expects the url field to be defined
             expect(item.url).not.toBe('');  //expects the url field not to be empty
           })
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name defined and not be empty', function() {
          allFeeds.forEach(function(item) {
            expect(item.name).toBeDefined(); // expects a name to be defined
            expect(item.name).not.toBe(''); // expects the name not to be empty
          });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        //var $body = $('body');
        var menu = $('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('Menu item should be hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true); // check that the menu is hidden by default
           it('Menu should be visible when clicked', function() {
             menu.on('click', function() {});
               expect($('body').hasClass('menu-hidden')).toBe(false); // check that on click the menu is no longer hidden
             });
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        //   it('Menu should be visible when clicked', function() {
        //     menu.on('click', function() {});
        //       expect($('body').hasClass('menu-hidden')).toBe(false);
        //     menu.click(function() {});
        //       expect($('body').hasClass('menu-hidden')).toBe(true);
        //   });
     });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {  //async
          loadFeed(0, function() {
            done();
          });
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('Should complete loading the feeds', function(done) {
           //expects the article children of our anchor tags to have the .entry class
           expect($('.feed').children('a').children('article').hasClass('entry')).toBe(true);
           done();
         });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      var feedOne, feedTwo; // creates 2 variables
        beforeEach(function(done) { // async
            loadFeed(0, function() {
              feedOne = $('.feed').html(); //assings the value of the returned html to the variable 1
              done();
            });
            loadFeed(1, function() {
              feedTwo = $('.feed').html(); // assigns the value of the retuned html to variable 2
              done();
            });
        });



        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         it('Should display different content when a new feed is loaded', function(done) {
           expect(feedOne).not.toEqual(feedTwo); // compares the variables and expects them to be different
           done();
         });
      });
}());
