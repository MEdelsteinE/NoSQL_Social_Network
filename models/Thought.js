const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema ({
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

const thoughtSchema = new Schema ({
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
    userName: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
    
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;
