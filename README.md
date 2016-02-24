#Step 4: Add Google Analytics

We track transaction analytics and we use a Transaction tool that is currently built-in to a.js. A file that comes as part of the adaptivejs node_module.

1. now lets make a `sendTransactionInfo` function.
    ```javascript
    var sendTransactionInfo = function() {
        
    };
    ```
Inside this function we'll put the code to call the Transaction tool and send the data. We'll also send the result of the `parseTransactionInfo` function to `Transaction.send`:

    ```javascript
    var Transaction = Mobify.analytics.transaction;
    Transaction.init(Mobify.analytics.ua, 'mobifyTracker');
    Transaction.send(parseTransactionInfo());
    ```

2. then inside of the  `orderConfirmationUI` function change `parseTransactionInfo();` to `sendTransactionInfo();`

We've done it! The data from this transaction is now successfully being sent to google analytics whenever a user lands on this page.

3. One last thing, we need to make sure that if there are errors in scraping the data or in sending the data it does not break our client's site. We do this by wrapping all of the content inside `sendTransactionInfo` into a try-catch block. Our `sendTransactionInfo` function should now look like this:

    ```javascript
    var sendTransactionInfo = function() {
        try {
            var Transaction = Mobify.analytics.transaction;
            Transaction.init(Mobify.analytics.ua, 'mobifyTracker');
            Transaction.send(parseTransactionInfo());
        } catch(e) {
            console.log('Failed to send transaction');
        }
    };
    ```  

##View the completed project

That's it! If you'd like to see the final project, run the following command:

```
git reset --hard HEAD && git clean -df && git checkout completed-workshop
```

Also checkout the completed-project code on github [here](TODO)

