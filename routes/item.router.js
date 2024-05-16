import express from 'express';
import Item from '../schemas/item.schema.js';
import joi from 'joi';

const router = express.Router();

const createdItemSchema = joi.object({
    item_code: joi.number().min(1).required(),
    item_name: joi.string().min(1).required(),
    item_stat: {
        health: joi.number(),
        power: joi.number(),
    },
});

// 아이템 등록 API
router.post('/items', async (req, res, next) => {
    try {
        const validation = await createdItemSchema.validateAsync(req.body);

        const { item_code, item_name, item_stat } = validation;

        const tempItemCode = await Item.findOne({item_code}).exec();
        if (tempItemCode) {
            return res.status(400).json({errorMessage: "이미 존재하는 코드입니다!"});
        }

        const tempItemName = await Item.findOne({item_name}).exec();
        if (tempItemName) {
            return res.status(400).json({errorMessage: "이미 존재하는 이름입니다!"});
        }

        const item = new Item({ item_code, item_name, item_stat });
        await item.save();

        return res.status(201).json({
            message: `새로운 아이템 ${item_name} 을/를 생성하셨습니다!`,
            item_code: item_code,
        });
    } catch (error) {
        next(error);
    }
});

// 등록된 아이템 목록 조회 API
router.get('/items', async (req, res) => {
    const item = await Item.find().select({ item_stat: 0, _id: 0}).sort('item_code').exec();

    return res.status(200).json({ item });
});

// 아이템 삭제 API
router.delete('/items/:item_code', async (req, res) => {
    const { item_code } = req.params;

    const tempItem = await Item.findOne({ item_code }).exec();

    if (!tempItem) {
        return res.status(404).json({ errorMessage: '존재하지 않는 아이템입니다!' });
    }

    await Item.deleteOne({ item_code });

    return res.status(200).json({
        message: `아이템 '${tempItem.item_name}'이/가 정상적으로 삭제되었습니다!`,
    });
});

// 아이템 상세페이지 API
router.get('/items/:item_code', async (req, res) => {
    const {item_code} = req.params;

    const tempItem = await Item.findOne({ item_code }).exec();

    if (!tempItem) {
        return res.status(404).json({ errorMessage: '존재하지 않는 아이템입니다!' });
    }

    const item = await Item.findOne({item_code}).select({item_code: 1, item_name: 1, item_stat: 1, _id: 0}).exec();

    return res.status(200).json({item});
})

// 아이템 수정 API
router.patch('/items/:item_code', async (req, res) => {
    const {item_code} = req.params;
    const {item_name, item_stat} = req.body;

    const currentItem = await Item.findOne({item_code}).exec();
    const baseItem = await Item.findOne({item_code}).exec();

    if (!currentItem) {
        return res.status(404).json({errorMessage: '존재하지 않는 아이템입니다!'});
    }
    if (!item_name && !item_stat) {
        return res.status(200).json({errorMessage: '수정된 내용이 없습니다!'})
    }
    if (item_name) {
        currentItem.item_name = item_name;
    }
    if (item_stat) {
        currentItem.item_stat = item_stat;
    }

    await currentItem.save();

    return res.status(200).json({
        message: `아이템 '${baseItem.item_name}'이/가 수정되었습니다!`,
        baseItem: `변경 전: ${baseItem.item_name}, ${baseItem.item_stat}`,
        patchedItem: `변경 후: ${currentItem.item_name}, ${currentItem.item_stat}`,
    })
})

export default router;
