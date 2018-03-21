module.exports = function(app, express) {
    function eachFiles(dir) {
        F.file.readdirSync(dir).forEach((name) => {
            if (F.path.extname(name) == '.js') {
                require(F.path.join(dir, name))(app);
            } else if (name !== '.DS_Store') {
                eachFiles(F.path.join(dir, name));
            }
        })
    }
    eachFiles(C.dir.controller);
    app.use(express.static(C.dir.public));
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use(function(err, req, res, next) {
        if(req.app.get('env') === 'development'){
            console.log(err)
        }

        if(req.method!='GET') {      
            res.status(404);      
            res.json({
                status: false,
                msg: 'api not found'
            })
        } else {
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};
          res.status(err.status || 500);
          res.render('error');
        }
    }); 
};