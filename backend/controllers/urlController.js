const QRCode = require('qrcode');
const shortId = require('shortid');
const ShortUrl = require('../models/shortUrl')
const PORT = process.env.PORT || 5000;
const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        const short = shortId.generate();
        const PORT = process.env.PORT || 3000;
        // Check if the request is secure (HTTPS) or if the 'X-Forwarded-Proto' header is set to 'https'
        const protocol = req.secure || req.get('X-Forwarded-Proto') === 'https' ? 'https' : 'http';
        // Get the host from the request headers
        const host = req.get('Host');
        const baseUrl = `${protocol}://${host}`;
        const newShortUrl = `${baseUrl}/${short}`;

        // Create a short URL record
        const shortUrlRecord = await ShortUrl.create({ full: url, short });
        // Generate QR Code
        const qrCode = await QRCode.toDataURL(shortUrlRecord.full);

        res.json({ shortUrl: newShortUrl, qrCode });
    } catch (error) {
        res.status(500).json({ error: 'Error in URL shortening or QR Code generation.', message: error.message });
    }
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