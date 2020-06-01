const config = require('./config.js');

const Schema = config.Schema;

var UsersSchema = new Schema(
	{
		id: { type : Number },
		blockChainKey: { type: String ,required: true, trim: true, unique: true },
		email: { type: String ,required: true, trim: true, unique: true },
		userName: { type: String ,required: false, trim: true, unique: false },
		password: { type: String ,required: true, trim: true },
		fullName: { type: String ,required: true, trim: true },
		pic: { type: String },
		accessToken: { type: String ,required: true, trim: true },
		createdOn: { type: String },
		modifiedOn: { type: String },
		lastSeenOn: { type: String },
		phoneNumber: { type: String, required: true, unique: true },
		idNumber: { type: Number, required: true, unique: true },
		address: { type: Object },
		roles: { type: Array }
	},
	{
		versionKey: false
	}
);

var LandsSchema = new Schema(
	{
		id: { type : Number },
		gpsLocation: { type: Array ,required: true, unique: true },
		ownerId: { type: String ,required: true, trim: true },
		ownerIdNumber: { type: String ,required: true, trim: true },
		landRecordNumber: { type: Number ,required: true, trim: true, unique: true },
		createdBy: { type: String,required: true },
		createdOn: { type: String ,required: true, trim: true },
		modifiedOn: { type: String },
		modifiedBy: { type: String },
	},
	{
		versionKey: false
	}
);

var user_model = config.mongo.model('users',UsersSchema,'users');
var land_model = config.mongo.model('lands',LandsSchema,'lands');
module.exports = { 
	user_model,
	land_model,
};
