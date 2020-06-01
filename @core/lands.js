const config = require('./config.js');

const models = require('./models.js');

const functions = require('./functions.js');

config.app.post("/lands/register",function(req,res){
	functions.findLandOwnerByIdNumber(req.body.idNumber).then(landOwner => {
		if(landOwner){
		    var landRecord = {
		        gpsLocation: req.body.gpsLocation,
		        ownerId: landOwner._id,
		        ownerIdNumber: landOwner.idNumber,
		        landRecordNumber: Math.floor(Math.random() * 9000) + 10000,
		        createdBy: '5ed21a8b9d11dc497aada379',
		        createdOn: Date.now(),
		        modifiedOn: '',
		        modifiedBy: '',
		    };
		    models.land_model.create(landRecord,function(err,data){
		        if(err){
		            res.status(500).send(err);
		        }else{
		            res.send(data);
		        }
		    });
		}else{
			res.status(404).send('Land owner record Not found.');
		}
	});
});

config.app.post("/lands/search",function(req,res){ 

});

config.app.post("/lands/initiate_transfer",function(req,res){ 
    models.land_model.findOne({landRecordNumber: req.body.landRecordNumber},(err,landRecord) => {
    	if(err){
            res.status(500).send(err);
        }else{
	    	if(landRecord){
	    		// 1. Create land transfer record
	    		// 2. Create individual approval requests
	    		

	    	}else{
				res.status(404).send('Land record Not found.');
	    	}
	    }
    });
});

config.app.post("/lands/approve_transfer",function(req,res){
    
});

config.app.post("/lands/decline_transfer",function(req,res){ 
    
});

config.app.post("/lands/my_lands",function(req,res){ 
    
});

config.app.post("/lands/land_history",function(req,res){ 
    
});