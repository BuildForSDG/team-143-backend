const config = require('./config.js');

const models = require('./models.js');

const functions = require('./functions.js');

const ObjectId = require('mongodb').ObjectID;

config.app.post("/users/register",function(req,res){
    var phoneNumber = config.phoneUtil.format(config.phoneUtil.parse(req.body.phoneNumber,"KE"), config.PNF.E164);
    var user = {
        username: req.body.username,
        email: req.body.email,
        idNumber: req.body.idNumber,
        password: config.crypto.createHash('md5').update(req.body.password).digest('hex'),
        fullName: req.body.fullName,
        pic: './assets/media/users/default.jpg',
        blockChainKey: functions.generateRandomString(8),
        accessToken: functions.generateRandomString(50),
        roles: req.body.roles,
        occupation: " ",
        phoneNumber: phoneNumber,
        address: req.body.address,
    };
    models.user_model.create(user,function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

config.app.post("/users",function(req,res){
	models.user_model.find({},function(err,users){
		if(err){
			res.send(err);
		}else{
			res.send(users);
		}
	});
});

config.app.get("/users/get_user/:user_id",function(req,res){ 
	models.user_model.findById(req.params.user_id,function(err,data){
		if(err){
			res.send(err);
		}else{
			res.send(data);
		}
	});
});

config.app.get("/roles",function(req,res){
	var roles = 
	[
        {
            id: 1,
            title: 'Administrator',
            isCoreRole: true,
            permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
            id: 2,
            title: 'Land Registrar',
            isCoreRole: false,
			permissions: [3, 4, 10]
        },
        {
            id: 3,
            title: 'Revenue Agent',
            isCoreRole: false,
			permissions: []
        },
        {
            id: 4,
            title: 'Land Owner',
            isCoreRole: false,
            permissions: []
        }
    ];
	res.send(roles);
});