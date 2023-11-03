const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.get('/',urlController.getHistory);
router.post('/shorten', urlController.createShortUrl);
router.get('/:shortUrl', urlController.getUrl);
// router.get('/qrcode/:shortUrl', urlController.generateQRCode);

module.exports = router;
