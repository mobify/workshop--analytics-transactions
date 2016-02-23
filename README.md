#Step 2: Populate the View

##Task

###Add Content to the Order-Confirmation Page

1. In `app/pages/order-confirmation/view.js` file replace the body key with the following:

    ```javascript
    title: function() {
        return $('h1').text();
    },
    items: function() {
        return $('#order-confirmation tr').filter(function() {
            var $row = $(this);
            return !$row.hasClass('subtotal') && !$row.hasClass('tax') && !$row.hasClass('total');
        }).map(function() {
            var $row = $(this);
            return {
                image: $row.find('td:nth-of-type(1) img').attr('x-src'),
                name: $row.find('td:nth-of-type(2)  p:first').text(),
                price: $row.find('td:nth-of-type(3)').text(),
                sku: $row.find('.sku').text()
            };
        });
    },
    transactionNumber: function() {
        return $('#transaction-number').text();
    },
    summary: function() {
        return $('#order-confirmation tr').filter(function() {
            return this.className;
        }).map(function() {
            var $row = $(this);
            return {
                name: $row.find('td:nth-of-type(2)').text(),
                amount: $row.find('td:last-of-type').text()
            };
        });
    }
    ```

This will select relevant information from the web order confirmation page.
- The page title
- Each sold item, along with the image, name, sku, and price for that item.
- A unique transaction number
- The summary of the transaction including subtotal, tax, and total and each of their respective amounts.  


2. Open up `app/pages/order-confirmation/template.dust`, inside of the `{<contentBlock} add the following:

    ```html
    <h2 class="t-order-confirmation__title">{title}</h2>
    <p class="t-order-confirmation__transaction-number">{transactionNumber}</p>
    ```
This will display the transaction number and page title.

3. Below that add the following:  
    
    ```html
    {#items}
        <div class="c-item">
            <div class="c-item__image">
                <img src="{image}" />
            </div>
            <div class="c-item__description">
                <span class="c-item__name">{name}</span>
                <span class="c-item__price">{price}</span>
                <span class="c-item__sku">{sku}</span>
            </div>
        </div>
    {/items}

    <div class="t-order-confirmation__summary">
        {#summary}
            <div class="t-order-confirmation__summary-item">
                <div class="t-order-confirmation__summary-item-name">
                    {name}
                </div>
                <div class="t-order-confirmation__summary-item-amount">
                    {amount}
                </div>
            </div>
        {/summary}
    </div>
    ```

This will loop through each of the items and display them and loop through each of the summary objects for display.

## Preview the New Page

run `grunt preview`

Next, open up your browser and visit the following page: https://goo.gl/8YnP6J. Once there, change site URL to "http://www.merlinspotions.com/order-confirmation.html" click the "Preview" button. You should arrive on a preview page that looks like the following:

<img src="https://raw.githubusercontent.com/mobify/workshop--analytics-transactions/step-2-populate-view/static/img/unstyled-order-confirmation.png?token=AKTX6iWrF7MIYx6LgwR3p7eksrAtGKg3ks5W1ib8wA%3D%3D" height="400"/>

Currently we have all of our content, but it is unstyled, let's style in quickly.

## Add Style

3. Let's add some styles just for the items. Inside `app/components/` create a new folder called `item`. Inside the item folder create a new file called `_style.scss`. Inside this file add the following:

    ```scss
    .c-item {
        @include clearfix;
    }

    .c-item__image {
        float: left;
        width: 35%;
    }

    .c-item__description {
        float: left;
        width: 65%;
    }

    .c-item__name {
        display: block;
        font-weight: bold;
    }

    .c-item__price {
        color: $accent-color;
        display: block;
    }

    .c-item__sku {
        margin-top: $unit;
        display: block;
        font-size: 0.7em;
    }
    ```

2. Include this style by adding `@import 'components/item/style';` to the bottom of `/app/global/styles/_components.scss`.

3. To add style for the page, go into `app/pages/order-confirmation/` create a new file called _style.scss. Inside that _style.scss add the following:

    ```scss
    .t-order-confirmation__title {
        padding: $unit*2;
        padding-bottom: $unit;
    }

    .t-order-confirmation__summary {
        margin: $unit 0;
        padding: $unit 0;
        border-top: 1px solid $neutral-30;
        border-bottom: 1px solid $neutral-30;
    }

    .t-order-confirmation__summary-item {
        @include clearfix;
    }

    .t-order-confirmation__summary-item-name {
        float: left;
        width: 75%;
        padding-right: $unit/2;

        text-align: right;
    }

    .t-order-confirmation__summary-item-amount {
        color: $accent-color;
    }

    .t-order-confirmation__transaction-number {
        margin-left: $unit*2;
        padding-bottom: $unit*2;
        font-size: 0.9em;
    }
    ```
4. At the bottom of `/app/global/styles/_pages.scss` add `@import 'pages/order-confirmation/style';`


## Preview the New Page

run `grunt preview`

Next, open up your browser and visit the following page: https://goo.gl/8YnP6J. Once there, change site URL to "http://www.merlinspotions.com/order-confirmation.html" click the "Preview" button. You should arrive on a preview page that looks like the following:

<img src="https://raw.githubusercontent.com/mobify/workshop--analytics-transactions/step-2-populate-view/static/img/styled-confirmation-page.png?token=AKTX6ulyMJIYbXRH_WvVPFJ3-K3IhhgEks5W1ibnwA%3D%3D" height="400"/>

Great, now everythig is styled and we're ready to add our analytics to the page!

##Continue to Step 3

When you're ready to continue to Step 3, run the following command:

```
git reset --hard HEAD && git clean -df && git checkout step-3-add-google-analytics
```

Then, follow the directions in the [README](https://github.com/mobify/workshop--analytics-transactions/blob/step-3-add-google-analytics/README.md) for the Step 3 branch.
