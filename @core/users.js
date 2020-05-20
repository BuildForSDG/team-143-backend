const config = require('./config.js');

const models = require('./models.js');

const functions = require('./functions.js');

config.app.post("/api/users/login",function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    models.user_model.find({email:email,password:password},function(err,data){
        if(err){
            res.send(err);
        }else{
            if(data === undefined || data.length === 0){
                res.send({});
            }else{
                var current_user = {};
                data.forEach(function (row) {
                    current_user = row;
                });
                if(current_user.accessToken){
                    res.send(current_user);                
                }else{
                    models.user_model.findByIdAndUpdate(current_user._id,{ accessToken: user.accessToken },function(err,result){
                        if(err){
                            res.send(err);
                        }else{
                            res.send(current_user);
                        }
                    });
                }
            }
        }
    });
});

config.app.post("/api/users/register",function(req,res){
    var user = {};
    user.username = req.body.username;
    user.email = req.body.email;
    //user.phone = req.body.email;
    user.password = req.body.password;
    user.fullName = req.body.fullName;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.pic = './assets/media/users/default.jpg';
    user.accessToken = functions.generateRandomString(50);
    user.refreshToken = functions.generateRandomString(50);
    user.roles = [1];
    user.occupation = " ";
    user.companyName = " ";
    user.phone = req.body.email;
    user.address = {

    };
    user.socialNetworks = {
        linkedIn: 'https://linkedin.com/',
        facebook: 'https://facebook.com/',
        twitter: 'https://twitter.com/',
        instagram: 'https://instagram.com/'
    };
    if(user){
        console.log(user);
        var mod = new models.user_model(user);
        mod.save(function(err,data){
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        });
    }else{
        res.send({});
    }
});

config.app.post("/api/users",function(req,res){
	models.user_model.find({},function(err,data){
		if(err){
			res.send(err);
		}else{
			res.send(data);
		}
	});
});

config.app.post("/api/users/get_user_by_token",function(req,res){ 
    if(req.body.accessToken){
    	models.user_model.findOne({accessToken:req.body.accessToken},function(err,data){
    		if(err){
    			res.send(err);
    		}else{
    			if(data){
    				models.user_model.findByIdAndUpdate(data._id,{ lastSeenOn: Date.now() },function(err,result){
    					if(err){
    						res.send(err);
    					}else{
    						res.send(data);
    					}
    				});
    			}else{
    				res.send({});
    			}
    		}
    	});
    }else{
        res.send({});
    }
});

config.app.get("/api/users/get_user_by_id/:user_id",function(req,res){ 
	models.user_model.findOne({id:req.params.user_id},function(err,data){
		if(err){
			res.send(err);
		}else{
			res.send(data);
		}
	});
});

// config.app.get("/api/permissions",function(req,res){
// 	var permissions = 
// 	[
//         {
//             id: 1,
//             name: 'accessToECommerceModule',
//             level: 1,
//             title: 'eCommerce module'
//         },
//         {
//             id: 2,
//             name: 'accessToAuthModule',
//             level: 1,
//             title: 'Users Management module'
//         },
//         {
//             id: 3,
//             name: 'accessToMailModule',
//             level: 1,
//             title: 'Mail module'
//         },
//         {
//             id: 4,
//             name: 'canReadECommerceData',
//             level: 2,
//             parentId: 1,
//             title: 'Read'
//         },
//         {
//             id: 5,
//             name: 'canEditECommerceData',
//             level: 2,
//             parentId: 1,
//             title: 'Edit'
//         },
//         {
//             id: 6,
//             name: 'canDeleteECommerceData',
//             level: 2,
//             parentId: 1,
//             title: 'Delete'
//         },
//         {
//             id: 7,
//             name: 'canReadAuthData',
//             level: 2,
//             parentId: 2,
//             title: 'Read'
//         },
//         {
//             id: 8,
//             name: 'canEditAuthData',
//             level: 2,
//             parentId: 2,
//             title: 'Edit'
//         },
//         {
//             id: 9,
//             name: 'canDeleteAuthData',
//             level: 2,
//             parentId: 2,
//             title: 'Delete'
//         },
//         {
//             id: 10,
//             name: 'canReadMailData',
//             level: 2,
//             parentId: 3,
//             title: 'Read'
//         },
//         {
//             id: 11,
//             name: 'canEditMailData',
//             level: 2,
//             parentId: 3,
//             title: 'Edit'
//         },
//         {
//             id: 12,
//             name: 'canDeleteMailData',
//             level: 2,
//             parentId: 3,
//             title: 'Delete'
//         },
//     ];
// 	res.send(permissions);
// });

config.app.get("/api/roles",function(req,res){
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
            title: 'Manager',
            isCoreRole: false,
			permissions: [3, 4, 10]
        },
        {
            id: 3,
            title: 'Guest',
            isCoreRole: false,
			permissions: []
        }
    ];
	res.send(roles);
});