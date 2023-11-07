const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const characterSchema = new Schema({
	user_id:{
		type: mongoose.Schema.ObjectId, 
		ref: "users",
	},
	avatar:{
		type: String,
		required:true,
	},
	upper:{
		type: String,
		required:true,
	},
	lower:{
		type: String,
		required:true
    },
	shoes:{
		type: String,
		required:true
	}
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
		delete object.__v;
    }
});

const characters = mongoose.model('characters',characterSchema);
module.exports = characters;