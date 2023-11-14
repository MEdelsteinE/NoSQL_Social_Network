const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');


const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date,now,
        get() {
            return dayjs(createdAt).format('MM/DD/YYYY hh:mm:ss')
        }
    }
});

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get() {
            return dayjs(createdAt).format('MM/DD/YYYY hh:mm:ss')
          }
        },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
}, {
    toJSON: {virtuals: true},
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions/length;
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;
