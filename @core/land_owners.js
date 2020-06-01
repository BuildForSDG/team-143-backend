const config = require('./config.js');

const models = require('./models.js');

const functions = require('./functions.js');

config.app.post("/land_owners/register",function(req,res){
    var phoneNumber = config.phoneUtil.format(config.phoneUtil.parse(req.body.phoneNumber,"KE"), config.PNF.E164);
    var user = {
        username: req.body.username,
        email: req.body.email,
        idNumber: req.body.idNumber,
        password: config.crypto.createHash('md5').update(functions.generateRandomString(6)).digest('hex'),
        blockChainKey: functions.generateRandomString(8),
        fullName: req.body.fullName,
        pic: './assets/media/users/default.jpg',
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

config.app.post("/land_owners/search",function(req,res){
    
});