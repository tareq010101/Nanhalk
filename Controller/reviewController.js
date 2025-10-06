const Review = require('./../Model/Review');

const mongoose = require('mongoose');

exports.addReview = async (req, res) => {
    try {
        const { driverId } = req.params;
        const { clientId, rating, comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(driverId)) {
            return res.status(400).json({ message: 'معرف السائق غير صالح' });
        }

        const review = new Review({
            driverId,
            clientId,
            rating,
            comment,
            createdAt: new Date()
        });

        await review.save();

        res.status(201).json({ message: 'تمت إضافة التقييم بنجاح!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
