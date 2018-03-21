module.exports = function(app) {
    var
        logger = require('morgan'),
        passport = require('passport'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        Session = require('express-session'),
        RedisStore = require('connect-redis')(Session),
        i18n = require('i18n'),
        swig = require('swig'),
        multer = require('multer');

    L.session  = Session({
        store: new RedisStore({ client: R }),
        secret: C.secret,
        resave: true,
        saveUninitialized: true,
        proxy: true
    });

    // app use
    app.use(logger('dev'));
    app.enable('trust proxy');
    app.disable('x-powered-by');
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', C.dir.view);
    app.use(multer({ dest: C.dir.static }).any());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use( L.session);
    app.use(i18n.init);

    i18n.configure({
        updateFiles: false,
        locales: C.ln,
        directory: C.dir.locales
    });

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.use((req, res, next) =>{
        res.locals.session = req.session;
        if (req.session && req.session.locale) {
            req.setLocale(req.session.locale);
        }
        next();
    })
};