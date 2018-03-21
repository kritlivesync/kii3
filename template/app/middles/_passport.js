module.exports = async(req, res, next) => {
	if (req.isAuthenticated()) { return next(); }
	if(req.method=='GET'){
		res.redirect('/login');
	}else{
		res.json({
		  status: true,
		  msg: 'Permission denied'
		});
	}
};