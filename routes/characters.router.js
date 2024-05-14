import express from 'express';
import Character from '../schemas/characters.schema.js';

const router = express.Router();

// 캐릭터 등록 API
router.post('/characters', async (req, res, next) => {
    const { name } = req.body;
    const health = 500;
    const power = 100;

    if (name === Character.find({name: name})) {
        return res.status(400).json({error_message: "이미 존재하는 이름입니다!"});
    }

    const character_max_id = await Character
        .findOne()
        .sort('-character_id')
        .exec();
    const character_id = character_max_id
        ? character_max_id.character_id + 1
        : 1;

    const character = new Character({ character_id, name, health, power });
    await character.save();

    return res.status(200).json({
        massage: `새로운 캐릭터 '${name}'을/를 생성하셨습니다!`,
        character_id: character_id,
    });
});

// 등록된 캐릭터 목록 조회 API
router.get('/characters', async (req, res, next) => {
    const character = await Character.find().sort('character_id').exec();
    return res.status(200).json({ character });
});

// 캐릭터 상세페이지 API
router.get('/characters/:character_id', async (req, res) => {
    
})

export default router;
