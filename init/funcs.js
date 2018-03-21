var
    funcs,
    url = require('url'),
    swig = require('swig'),
    crypto = require('crypto'),
    lodash = require('lodash'),
    fs = require('fs-extra'),
    path = require('path'),
    async = require('async'),
    uuid = require('uuid/v4'),
    qr = require('qr-image'),
    moment = require('moment'),
    exec = require('child_process').exec,
    nodemailer = require('nodemailer'),
    filters = require('./filters');

global._ = lodash;

for(var key in filters) {
    var fn = filters[key];
    swig.setFilter(key, fn);
}

funcs = {
    id: uuid,
    forEach: async.forEach,
    forEachSeries: async.forEach,
    parallel: async.parallel,
    waterfall: async.waterfall,
    swig: swig,
    date: moment,
    exec: exec,
    path: path,
    url: url,
    file: fs,
    pass: {
        generate: function(password) {
            var salt = crypto.randomBytes(8).toString('hex').slice(0, 16)
            var hash = crypto.createHmac('sha512', salt).update(password).digest('hex');
            return {
                salt: salt,
                hash: hash
            };
        },
        compare: function(data, password) {
            var hash = crypto.createHmac('sha512', data.salt).update(password).digest('hex');
            return (data.hash && data.hash == hash) ? true : false;
        }
    },
    tpl: function(path,data){
        return swig.compileFile(C.dir.view + path);
    },
    random: function(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    },
    mail: function(to, title, message, cb) {
        console.log(to, title, message);
        var transporter = nodemailer.createTransport('smtps://no-reply%40mailsmtp.com:qazwsx123@smtp.gmail.com');

        var mailOptions = {
            from: '"No Reply" <no-reply@mailsmtp.com>',
            to: to,
            subject: title,
            html: message
        };

        transporter.sendMail(mailOptions, function(error, info) {
            console.log(error, info)
            cb(true);
        });
    },
    agent: function(ua) {
        var data = '';
        if (/mobile/.test(ua)) {
            return 'mobile';
        } else if (/Web0S/.test(ua)) {
            return 'Web0S';
        } else if (/Tizen/.test(ua)) {
            return 'Tizen';
        } else if (/TV/.test(ua)) {
            return 'TV';
        } else if (/CFNetwork/.test(ua)) {
            return 'CFNetwork';
        } else if (/AppleCoreMedia/.test(ua)) {
            return 'AppleCoreMedia';
        } else if (/stagefright/.test(ua)) {
            return 'stagefright';
        } else if (/okhttp/.test(ua)) {
            return 'Android';
        } else if (/iPhone/.test(ua)) {
            return 'iPhone';
        } else if (/Mac/.test(ua)) {
            return 'Mac';
        } else if (/Android/.test(ua)) {
            return 'Android';
        } else {
            return 'Brownser'
        }
    },
    uploadfile: function(base64str, relative_path) {
        console.log('====>' + base64str);
        var matches = base64str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        console.log(matches);
        if (matches != null) {
            base64str = uuid() + '.jpg';

            fs.writeFileSync(path.join(C.dir.public, relative_path) + base64str, new Buffer(matches[2], 'base64'));
            return relative_path + base64str;
        } else {
            return base64str;
        }
    },
    qr: function(data) {
        return 'data:image/png;base64,' + new Buffer(qr.imageSync(data, { type: 'png' }), 'binary').toString('base64')
    },
    encrypt: function(pwd) {
        return crypto.createHash('md5').update(pwd).digest('hex');
    },
    handleErr: function(res, err) {
        console.log(err);
        res.status(500);
        res.json({
            error: err
        })
    }
}

module.exports = funcs;