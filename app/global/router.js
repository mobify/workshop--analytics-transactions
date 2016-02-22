define([
    '$',
    'adaptivejs/router',
    'pages/home/view',
    'pages/category/view',
    'pages/pdp/view'
],
function($, Router, Home, Category, PDP) {
    var router = new Router();

    router
        .add(Router.selectorMatch('body.home'), Home)
        .add(Router.selectorMatch('body.category'), Category)
        .add(Router.selectorMatch('body.pdp'), PDP)
        .add(function() {return true;}, Home);

    return router;
});
