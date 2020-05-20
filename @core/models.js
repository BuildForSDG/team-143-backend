const config = require('./config.js');

const Schema = config.Schema;

var UsersSchema = new Schema(
	{
		id: { type : Number },
		email: { type: String ,required: true, trim: true, unique: true },
		username: { type: String ,required: false, trim: true, unique: false },
		password: { type: String ,required: true, trim: true },
		fullName: { type: String ,required: true, trim: true },
		pic: { type: String },
		accessToken: { type: String ,required: true, trim: true },
		refreshToken: { type: String ,required: true, trim: true},
		createdOn: { type: String },
		modifiedOn: { type: String },
		lastSeenOn: { type: String },
		occupation: { type: String },
		phone: { type: String , unique: true },
		address: { type: Object },
		socialNetworks: { type: Object },
		roles: { type: Array }
	},
	{
		versionKey: false
	}
);

var user_model = config.mongo.model('users',UsersSchema,'users');

module.exports = { 
	user_model,
};
