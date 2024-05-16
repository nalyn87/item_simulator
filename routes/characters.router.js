import express from 'express';
import Character from '../schemas/characters.schema.js';
import joi from 'joi';

const router = express.Router();

const createdCharacterSchema = joi.object({
    name: joi.string().min(1).max(10).required(),
});

// 캐릭터 등록 API
router.post('/characters', async (req, res, next) => {
    try {
        const validation = await createdCharacterSchema.validateAsync(req.body);

        const { name } = validation;

        if (!name) {
            return res.status(400).json({ errorMessage: '이름이 존재하지 않습니다!' });
        }

        const tempCharacter = await Character.findOne({ name: name }).exec();
        if (tempCharacter) {
            return res.status(400).json({ errorMessage: '이미 존재하는 이름입니다!' });
        }

        const health = 500;
        const power = 100;

        const characterMaxId = await Character.findOne().sort('-character_id').exec();
        const character_id = characterMaxId ? characterMaxId.character_id + 1 : 1;

        const character = new Character({ character_id, name, health, power });
        await character.save();

        return res.status(201).json({
            massage: `새로운 캐릭터 '${name}'을/를 생성하셨습니다!`,
            character_id: character_id,
        });
    } catch (error) {
        next(error);
    }
});

// 등록된 캐릭터 목록 조회 API
router.get('/characters', async (req, res, next) => {
    const character = await Character.find().select({ _id: 0, health: 0, power: 0 }).sort('character_id').exec();
    return res.status(200).json({ character });
});

// 캐릭터 삭제 API
router.delete('/characters/:character_id', async (req, res) => {
    const { character_id } = req.params;

    const char = await Character.findOne({ character_id }).exec();

    if (!char) {
        return res.status(404).json({ errorMessage: '존재하지 않는 캐릭터입니다!' });
    }

    await Character.deleteOne({ character_id });

    return res.status(200).json({
        message: `캐릭터 '${char.name}'이/가 정상적으로 삭제되었습니다!`,
    });
});

// 캐릭터 상세페이지 API
router.get('/characters/:character_id', async (req, res) => {
    const { character_id } = req.params;

    const character = await Character.findOne({character_id}).exec();

    if (!character) {
        return res.status(400).json({ errorMessage: '존재하지 않는 캐릭터입니다!' });
    }

    return res.status(200).json({ character });
});

export default router;
