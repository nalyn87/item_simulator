import mongoose from 'mongoose';

const CharactersSchemas = new mongoose.Schema({
    character_id: Number,
    name: {
        type: String,
        required: true, // 필수
        unique: true, // 중복 안됨
    },
    health: Number,
    power: Number,
},
{versionKey: false}
);

export default mongoose.model('Character', CharactersSchemas);
