const config = require('./config.js');

const models = require('./models.js');

const functions = require('./functions.js');

config.app.post("/auth/login",function(req,res){
    var query = {};
    if(req.body.email){
        query.email = req.body.email;
    }

    if(req.body.phoneNumber){
        query.phoneNumber = config.phoneUtil.format(config.phoneUtil.parse(req.body.phoneNumber,"KE"), config.PNF.E164);
    }
       
    query.password = config.crypto.createHash('md5').update(req.body.password).digest('hex');
    models.user_model.findOne(query,function(err,user){
        if(err){
            res.status(500).send(err);
        }else{
            if(user){
                if(user.accessToken){
                    res.status(200).send(user);                
                }else{
                    models.user_model.findByIdAndUpdate(user._id,{ accessToken: functions.generateRandomString(50) },function(err,result){
                        if(err){
                            res.status(500).send(err);
                        }else{
                            res.status(200).send(user);
                        }
                    });
                }
            }else{
                res.status(401).send('The username/password is incorrect');
            }
        }
    });
});

config.app.post("/auth/getUserByAccessToken",function(req,res){ 
    if(req.body.accessToken){
    	models.user_model.findOne({_id: config.ObjectID(req.body.userId), accessToken:req.body.accessToken},function(err,user){
    		if(err){
    			res.status(500).send(err);
    		}else{
    			if(user){
    				models.user_model.findByIdAndUpdate(user._id,{ lastSeenOn: Date.now() },function(err,result){
    					if(err){
    						res.status(500).send(err);
    					}else{
    						res.status(200).send(user);
    					}
    				});
    			}else{
    				res.status(404).send('User not found');
    			}
    		}
    	});
    }else{
        res.send({});
    }
});