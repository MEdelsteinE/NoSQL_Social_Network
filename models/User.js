const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: { 
            type: String,
            unique: true,
            required: true,
            trim: true // Corrected property name
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator(val) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
                },
                message() {
                    return 'You must supply a valid email address.';
                }
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users' // Corrected model name to 'User'
        }]
    },
    {
        toJSON: { virtuals: true },
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;
