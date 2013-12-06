/**
 * Point d'entrée du programme
 */
if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'express.io',
    './config/boot'
], function (express, boot) {
    var app = express().http().io();

    // settings

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
    app.use(express.cookieParser('79vm86SUm34c3ZSxtc3aSPnn8DReU9Q4'));
    app.use(express.session());

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