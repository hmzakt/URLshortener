const { nanoid } = require("nanoid")
const URL = require("../models/url")

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" }) //badrequest
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL : body.url,
        visitedHistory : [],
    })

    return res.json({id : shortId})
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}