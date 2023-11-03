const QRCode = require('qrcode');
const shortId = require('shortid');
const ShortUrl = require('../models/shortUrl')
const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        const protocol = req.secure || req.get('X-Forwarded-Proto') === 'https' ? 'https' : 'http';
        const host = req.get('Host');
        const baseUrl = `${protocol}://${host}`;

        const existingShortUrl = await ShortUrl.findOne({ full: url });

        if (existingShortUrl) {
            return respondWithShortUrl(res, existingShortUrl, baseUrl);
        }

        const short = shortId.generate();
        const newShortUrlRecord = await ShortUrl.create({ full: url, short });
        return respondWithShortUrl(res, newShortUrlRecord, baseUrl);

    } catch (error) {
        res.status(500).json({ error: 'Error in URL shortening or QR Code generation.', message: error.message });
    }
};

const respondWithShortUrl = async (res, shortUrlRecord, baseUrl) => {
    const shortUrl = `${baseUrl}/${shortUrlRecord.short}`;
    const qrCode = await QRCode.toDataURL(shortUrlRecord.full);
    res.json({ shortUrl, qrCode });
};

const getUrl = async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const urlRecord = await ShortUrl.findOne({ short: shortUrl });
        if (urlRecord) {
            urlRecord.clicks++;
            await urlRecord.save();
            res.redirect(urlRecord.full);
        } else {
            res.status(404).json({ error: 'No URL found' });
        }
    } catch (error) {
        console.error('Error in getUrl:', error);
        res.status(500).json({ error: 'Error retrieving URL', message: error.message });
    }
};

const getHistory = async (req,res) => {
    try {
        const result = await ShortUrl.find({});
        if (result){
            res.send({result})
        }
    } catch (error){
        console.error('Error in History:', error);
        res.status(500).json({ error: 'Error retrieving URL', message: error.message });
    }
}

module.exports = {
    createShortUrl,
    getUrl,
    getHistory
};