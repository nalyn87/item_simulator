import mongoose from 'mongoose';

const characters_schemas = new mongoose.Schema({
    character_id: Number,
    name: {
        type: String,
        required: true, // 필수
        unique: true, // 중복 안됨
    },
    health: Number,
    power: Number
});

export default mongoose.model('Character', characters_schemas);
