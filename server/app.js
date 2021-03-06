/**
 * Point d'entrée du programme
 */
if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'express.io',
    'ejs',
    './lib/mongoose',
    './lib/boot'
], function (express, ejs, mongoose, boot) {
    'use strict';

    var app = express().http().io();

    // settings

    // initialisation de la bdd
    mongoose.init();

    // map .renderFile to ".html" files
    app.engine('html', ejs.renderFile);

    // make ".html" the default
    app.set('view engine', 'html');

    // set views for error and 404 pages
    app.set('views', __dirname + '/views');

    // define a custom res.message() method
    // which stores messages in the session
    app.response.message = function(msg){
        // reference `req.session` via the `this.req` reference
        var sess = this.req.session;
        // simply add the msg to an array for later
        sess.messages = sess.messages || [];
        sess.messages.push(msg);
        return this;
    };

    // log
    if (!module.parent) app.use(express.logger('dev'));

    // serve static files
    app.use(express.static(__dirname + '/../client/app'));

    // session support
    app.use(express.cookieParser());
    //var RedisStore = require('connect-redis')(express);
    var MongoStore = require('connect-mongo')(express);
    app.use(express.session({
        //store: new RedisStore({ host: 'localhost', port: 6379 }),
        store: new MongoStore({ url: 'mongodb://localhost/tarot-js/tjs_sessions' }),
        secret: '79vm86SUm34c3ZSxtc3aSPnn8DReU9Q4'
    }));

    // parse request bodies (req.body)
    app.use(express.bodyParser());

    // support _method (PUT in forms etc)
    app.use(express.methodOverride());

    // expose the "messages" local variable when views are rendered
    app.use(function(req, res, next){
        var msgs = req.session.messages || [];

        // expose "messages" local variable
        res.locals.messages = msgs;

        // expose "hasMessages"
        res.locals.hasMessages = !! msgs.length;

        /* This is equivalent:
         res.locals({
         messages: msgs,
         hasMessages: !! msgs.length
         });
         */

        next();
        // empty or "flush" the messages so they
        // don't build up
        req.session.messages = [];
    });

    // load controllers and sockets
    boot.route(app, { verbose: !module.parent });

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
        // treat as 404
        if (~err.message.indexOf('not found')) return next();

        // log it
        console.error(err.stack);

        // error page
        res.status(500).render('5xx');
    });

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
        res.status(404).render('404', { url: req.originalUrl });
    });

    if (!module.parent) {
        app.listen(3000);
        console.log('\n  listening on port 3000\n');
    }
});