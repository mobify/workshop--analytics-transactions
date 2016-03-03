#Step 1: Generate a View

The Adaptive.js Generator has a view generator that sets up a new view for your project. The view generator creates:
* a view file,
* a Dust template,
* a view-script file, and
* a view test file.

### Install NPM Modules

1. In your `workshop--analytics-transactions` project folder, enter the following command to install NPM modules:

    ```
    npm install
    ```

##Task

###Create a New 'order-confirmation' View

1. In your `workshop--analytics-transactions` project folder, enter the following command to run the sub-generator with Yeoman:

    ```
    yo adaptivejs:view
    ```

2. When the generator prompts you for a name, enter `order-confirmation`.
3. Select `baseView` as the view to extend.

<img src="/static/img/view-generator.png?raw=true" height="100" />

4. To add the view to the router file, open the file `app/global/router.js` with a text editor.
5. In `router.js` file, in the `define` dependencies array code block, add the new `pages/order-confirmation/view` path for the new view file. Remember to append a comma the previous `page/home/view` last entry.

    ```javascript
    'pages/pdp/view',
    'pages/order-confirmation/view'

    ```

6. In the function definition, list the view `OrderConfirmation` as an argument after the `PDP` argument. Remember to append the comma after `PDP`.

    ```javascript
    function($, Router, Home, Category, PDP, OrderConfirmation) {
    ```


7. Add the OrderConfirmation route to the router by appending `.add(Router.selectorMatch('body.confirmation'), OrderConfirmation);` after the PDP route. Remeber to remove the semicolon after PDP:

    ```javascript
    router
        .add(Router.selectorMatch('body.home'), Home)
        .add(Router.selectorMatch('body.category'), Category)
        .add(Router.selectorMatch('body.pdp'), PDP)
        .add(Router.selectorMatch('body.confirmation'), OrderConfirmation);
    ```

    The `.add()` function creates a new route that loads the given view upon the return of a Boolean value from the function. The `Router.selectorMatch()` function returns true when an element that matches the selector exists on the current page.

8. Save the `router.js` file with these changes in your editor.

    Your `router.js` file should look like this:

    ```javascript
    define([
    '$',
    'adaptivejs/router',
    'pages/home/view',
    'pages/category/view',
    'pages/pdp/view',
    'pages/order-confirmation/view'
    ],
    function($, Router, Home, Category, PDP, OrderConfirmation) {
        var router = new Router();

        router
            .add(Router.selectorMatch('body.home'), Home)
            .add(Router.selectorMatch('body.category'), Category)
            .add(Router.selectorMatch('body.pdp'), PDP)
            .add(Router.selectorMatch('body.confirmation'), OrderConfirmation);

        return router;
    });
    ```

9. inside `app/ui.js` append `'pages/order-confirmation/ui'` inside the require array. remember to add a comma after `'pages/pdp/view'`.
    
    ```javascript
    require([
        'global/ui',
        'pages/home/ui',
        'pages/category/ui',
        'pages/pdp/ui',
        'pages/order-confirmation/ui'
    ],
    ```

## Preview the New Page

run `grunt preview`

Next, open up your browser and visit the following page: https://goo.gl/8YnP6J. Once there, change site URL to "http://www.merlinspotions.com/order-confirmation.html" click the "Preview" button. You should arrive on a preview page that looks like the following:

<img src="/static/img/merlin-empty-page.png?raw=true"  height="400"/>

Currently it only has a header and footer with no content.

##Continue to Step 2

When you're ready to continue to Step 2, run the following command:

```
git reset --hard HEAD && git clean -df && git checkout step-2-populate-view
```

Then, follow the directions in the [README](https://github.com/mobify/workshop--analytics-transactions/blob/step-2-populate-view/README.md) for the Step 2 branch.
