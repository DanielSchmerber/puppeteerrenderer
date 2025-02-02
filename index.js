const express = require('express');
const {launch} = require("puppeteer");
const {Base64} = require('js-base64');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// API Route with Parameters
app.get('/api/v1/screenshot', async (req, res) => {

    var ms = Date.now()

    res.send((`
<img src="data:image/png;base64, ${await screenShot("https://dashboard.myplayplanet.net/dashboard") + '"'}</img>

Took + ${Date.now() - ms} ms
`))
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function screenShot(url, width=10*128, height=10*128) {
    const browser = await launch( {
            headless: true, // or false, depending on your needs
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    const page = await browser.newPage();

    await page.setViewport({ width, height });
    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'load' });

    const buffer = await page.screenshot({ type: 'png' });

    await browser.close();
    return Base64.fromUint8Array(buffer)
}
