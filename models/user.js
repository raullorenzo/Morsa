/**
 * Created by raul on 5/7/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var userEsquema = new Schema({
    nombre:    	{ 
    	type: String 
    },
    apellidos:  { 
    	type: String 
    },
    email:  	{ 
    	type: String 
    },
    telefono:   { 
    	type: String 
    },
    username:   { 
    	type: String 
    },
    password:   { 
    	type: String 
    },
    activo:     {
        type: Number,
        default: 1
    },
    foults:     {
        type: Number,
        default: 0
    },
    relevancia: {
        type: Number,
        default: 0
    },
    followers:  {
        type: Number,
        default: 0
    },
    followings:  {
        type: Number,
        default: 0
    },
    created:    {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('User', userEsquema);