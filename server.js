exports.init = function(config) {
    var
        express = require('express'),
        path = require('path'),
        passport = require('passport'),
        http = require('http'),
        app = express(),
        server = http.createServer(app);
    /**
     * C : config
     * M : model
     * F : function
     */
    global.DOCS = {
        api:{},
        socket:{},
    };
    global.C = config; //config
    global.L = {}; //local session
    global.D = {}; //data base
    global.M = {}; //middle where
    global.S = {}; //service
    global.R = require('kii3/init/cache.js'); //redis
    global.F = require('kii3/init/funcs.js'); //function

    require('kii3/init/models.js'); // model
    require('kii3/init/middles.js'); // middle
    require('kii3/init/boot.js')(app); // model
    require('kii3/init/passport');
    require('kii3/init/services.js'); // service
    require('kii3/init/routes.js')(app, express); // router
    require('kii3/init/socket.js')(server);

    // start server
    
    server.listen(C.port, () => {
        console.log(`start http server ${C.domain.www} at ${C.port}`)
    });
}
