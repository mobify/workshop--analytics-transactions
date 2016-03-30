#Step 3: Parse Data From the DOM

## How to Get Data for Transaction Analytics
__Below is a list of techniques in the order of usage preference.__

### 1. Using javascript variables that contain transaction data
 
Often, the client's site will save transaction data inside a javascript variable so that it can be easily accessed. We should make use of it since it will contain the same data that we need. We can easily figure this out by looking for the client's analytics calls.

__Unfortunately Merlin's potions does not have this data stored in global variables__

### 2. Parsing out client's analytic call

Not ideal but the next best thing. Parsing the client's analytics call will at least ensure that we have the correct data to work with.

A couple of things that should be in consideration when parsing client's analytic call:

- Always check if the script exists
- Always check if regex matches returns the expected number of parameters
- Make sure there is no other characters aside from what is expected (ie. spaces, quotes, carriage returns should be stripped out)

__Unfortunately Merlin's potions does not have their own analytics, so we can not parse their analytics calls__

### 3. Parsing from the DOM

Totally not ideal but if it comes down to this, it will have to do. 

A couple of things that should be in consideration when parsing from the DOM:

- Always have checks for empty situations
- Always check if regex matches returns the expected number of parameters
- Make sure there is no other characters aside from what is expected (ie. '20.00 USD' for Revenue, ' USD' should be stripped out)
- Don't guess on what to send in transaction analytic and always match how the clients are sending theirs.

__In this example we'll be parsing from the DOM__

## Things to take note of:
- __transactionID__ should be unique from one order to another
- __sku__ should be unique to each product

##Task

###Parse Transaction Information From the DOM

1. Inside of `app/pages/order-confirmation/ui.js` after the initial function, but before the `orderConfirmationUI` function add a new function called `parseTransactionInfo`.
    ```javascript
    var parseTransactionInfo = function(){

    };
    ```
2. We will now invoke that function from inside of the orderConfirmation function. Your `ui.js` file should now look like this:

    ```javascript
    define(['$'], function($) {
        var parseTransactionInfo = function(){

        };

        var orderConfirmationUI = function() {
            parseTransactionInfo();
        };

        return orderConfirmationUI;
    });
    ```
3. Lets first fetch the transaction id.
Inside of the `parseTransactionInfo` function add the following:
`var transactionId = $('.t-order-confirmation__transaction-number').text();`

This will get the text inside of the element with class = 't-order-confirmation__transaction-number'. Unfortunately this will result in us getting "Transaction Number: 4321" where we only want the number. Let's append `.replace('Transaction Number: ', '');` to that last line in order to get just the number.

` var transactionId = $('.t-order-confirmation__transaction-number').text().replace('Transaction Number: ', '');`

4. Of course we want more than just the transaction number, so add the following inside of the `parseTransactionInfo` function as well.

    ```javascript
    var summary = $('.t-order-confirmation__summary-item').map(function() {
        var $row = $(this);
        return $row.find('.t-order-confirmation__summary-item-amount').text().trim();
    });

    var items = $('.c-item__description').map(function() {
        var $row = $(this);
        return {
            name: $row.find('.c-item__name').text().trim(),
            price: $row.find('.c-item__price').text().trim().replace('$', ''),
            sku: $row.find('.c-item__sku').text().replace('SKU: ', '')
        };
    }).get();
    ```
This will get all of the relevent data, we then need to format it correctly in order to be sent and return it. 

5. At the bottom of the `parseTransactionInfo` function add: 
    ```javascript
    return {
        transactionID: transactionId,
        affiliation: 'Merlin\'s Potions',
        transaction: {
            tax: summary[1],
            revenue: summary[2],
            currency: 'USD',
            shipping: '0'
        },
        transactionItems: items
    };
    ```

###Inspect what is being gathered

1. Inside of the `orderConfirmationUI` function, wrap the call to `parseTransactionInfo` inside of a `console.log();` so that we can see what the output of the function is.  

    ```
    var orderConfirmationUI = function() {
        console.log(parseTransactionInfo());
    };
    ```

__Preview the page:__
run `grunt preview`

Next, open up your browser and visit the following page: https://goo.gl/8YnP6J. Once there, change site URL to "http://training.merlinspotions.com/order-confirmation.html" click the "Preview" button. 

Once there open up the developer tools to inspect the page and look inside of the object in the console.

__Great, now our data is formatted and ready to send off to google analytics in step 4!__
##Continue to Step 4

When you're ready to continue to Step 4, run the following command:

```
git reset --hard HEAD && git clean -df && git checkout step-4-add-google-analytics
```

Then, follow the directions in the [README](https://github.com/mobify/workshop--analytics-transactions/blob/step-4-add-google-analytics/README.md) for the Step 4 branch.
