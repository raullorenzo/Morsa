/**
 * Created by raul on 5/7/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var tagEsquema = new Schema({
    tipo:       { 
    	type: String 
    },
    contador: 	{
    	type: Number,
    	default: 0
    },
    created:    {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Tag', tagEsquema);