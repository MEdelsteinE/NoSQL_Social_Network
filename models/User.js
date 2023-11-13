const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { 
    type: String,
    unique: true,
    required: true,
    trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(val) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)
            },
            message() {
              return 'You must supply a valid email address.'
            }
        },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    }
})

const User = model('User', userSchema);
module.exports = User;


