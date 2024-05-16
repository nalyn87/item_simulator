import mongoose, { Schema } from 'mongoose';

const ItemSchemas = new mongoose.Schema({
    item_code: {
        type: Number,
        required: true,
        unique: true,
    },
    item_name: {
        type: String,
        required: true,
        unique: true,
    },
    item_stat: {
        health: Number,
        power: Number,
    },
},
{versionKey: false}
);

export default mongoose.model('Item', ItemSchemas);
