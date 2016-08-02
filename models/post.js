/**
 * Created by raul on 5/7/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var postEsquema = new Schema({
    tag:        {
        type: String
    },
    tittle:     { 
    	type: String 
    },
    text:       {
        type: String
    },
    followers:  {
        type: Number,
        default: 0
    },
    response:   {
        type: String
    },
    created: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Post', postEsquema);