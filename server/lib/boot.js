if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'express.io',
    'fs'
], function (express, fs) {
    var routes = {
        route:function (parent, options) {
            var verbose = options.verbose;
            // lecture du json contenant le path et la methode des routes
            var routesConf = JSON.parse(fs.readFileSync(__dirname + "/../config/routes.json", "utf-8"));

            fs.readdirSync(__dirname + '/../controllers').forEach(function(fileName){
                verbose && console.log('\n %s:', fileName);
                var obj = require('./../controllers/' + fileName)
                    , name = obj.name || fileName.split('_', 1)[0]
                    , prefix = obj.prefix || ''
                    , path;

                // gestion des controllers
                if (fileName.split('_')[1] == 'controller.js') {
                    var app = express()
                        , before = ''
                        , method;

                    // allow specifying the view engine
                    if (obj.engine) {
                        app.set('view engine', obj.engine);
                        verbose && console.log(' view engine -> %s', obj.engine);
                    }
                    app.set('views', __dirname + '/../views/' + name);

                    // generate routes based
                    // on the exported methods
                    for (var key in obj) {
                        // "reserved" exports
                        if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;

                        // route exports
                        if(routesConf.routes['controllers'][name][key]) {
                            path = prefix + routesConf.routes['controllers'][name][key]['path'];
                            // before middleware support
                            if(routesConf.routes['controllers'][name][key]['before']) {
                                app.all(path, obj.before);
                                before = 'with middleware before';
                            } else {
                                before = '';
                            }
                            app[routesConf.routes['controllers'][name][key]['method']](path, obj[key]);
                            verbose && console.log(' %s %s -> %s() %s', routesConf.routes['controllers'][name][key]['method'].toUpperCase(), path, key, before);
                        } else {
                            throw new Error('unrecognized route: ' + name + '.' + key);
                        }
                    }

                    // mount the app
                    parent.use(app);

                // gestion des sockets
                } else if (fileName.split('_')[1] == 'socket.js') {
                    // generate routes based
                    // on the exported methods
                    for (var key in obj) {
                        // route exports
                        if(routesConf.routes['sockets'][name][key]) {
                            path = prefix + routesConf.routes['sockets'][name][key]['path'];
                            parent.io.route(path, obj[key]);
                            verbose && console.log(' %s -> %s()', path, key);
                        } else {
                            throw new Error('unrecognized route: ' + name + '.' + key);
                        }
                    }
                }
            });
        }
    };
    return routes;
});