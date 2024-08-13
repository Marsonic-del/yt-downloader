const Video = require('../models/video')

module.exports = async (req, res, next) => {
    try {
        // Get today's date at midnight
        const today = new Date();
        console.log('today: ', today)

        today.setHours(3, 0, 0);
        console.log('today.setHours(0, 0, 0, 0)', today)

        // Delete documents with 'date' earlier than today
        const result = await Video.deleteMany({
            date: { $lt: today },
        });

        res.status(200).send(`${result.deletedCount} document(s) were deleted.`);
    } catch (error) {
        res.status(500).send('Error deleting documents: ' + error.message);
    }
}