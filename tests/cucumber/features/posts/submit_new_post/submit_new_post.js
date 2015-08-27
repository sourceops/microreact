(function () {
    'use strict';

    module.exports = function () {

        /**
         *   Scenario: Submit a new post
         */

        var url = require('url');

        this.Given(/^I am logged in$/, function (callback) {

            // Wait
            this.client.
                // We navigate into home page
                url(process.env.ROOT_URL).

                // Wait for the page to load
                waitForExist(".container", 1000).
                waitForVisible(".container", 1000).

                // We click the login button
                click("#login-sign-in-link").
                waitForExist("#login-email").

                // We set the values into email and password
                setValue("#login-email", "miltos@example.com").
                setValue("#login-password", "passpass").

                // We click the Sign In button
                click('#login-buttons-password').
                call(callback);
        });

        this.Given(/^I navigate to submit new post page$/, function () {
            return this.client.
                // We wait for the submit button to exist
                waitForExist(".submit-post-but").
                waitForVisible(".submit-post-but").
                //pause(1000).
                // We click the submit button
                click(".submit-post-but").
                isVisible(".sub-post-but");
        });

        this.When(/^I fill in all form's fields$/, function () {
            // We just wait for the submit button to exist and then
            // we fill the fields
            return this.client.
                waitForExist(".sub-post-but").
                setValue("#title", "Meteor Point").
                setValue("#url", "http://www.meteorpoint.com");
        });

        this.When(/^I submit the form/, function () {
            // We click on submit button
            return this.client.
                submitForm(".sub-post-but");
        });

        this.Then(/^I should see the new post$/, function () {
            // After the post submission we wait for post-title to exist and check if it is equal with
            // the passing post title from above
            return this.client.
                waitForExist(".post-title").
                getText(".post-title").should.become("Meteor Point");
        });

        /**
         * Scenario: Existing Post
         */

        this.Given(/^I fill form's fields with existing post$/, function () {
            return this.client.
                waitForExist(".sub-post-but").
                setValue("#title", "Introducing Telescope").
                setValue("#url", "http://sachagreif.com/introducing-telescope/");
        });

        this.Then(/^I should see an error message$/, function () {
            // We check if the error class is visible on the screen
            return this.client.
                waitForExist(".error-alert").
                isVisible(".error-alert");
        });
    }

})();