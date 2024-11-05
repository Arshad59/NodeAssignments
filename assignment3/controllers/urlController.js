const urlModel = require("../models/urlModel");

const axios = require("axios")

exports.createShortUrl = async (req, res) => {
    try {
        const { original_url } = req.body;
        let url = await urlModel.findOne({ original_url });
        if (url) {
            return res.status(200).json({
                message: {
                    shortened_url: url.short_url,
                }
            });
        }

        const data = { url: original_url };

        const response = await axios.post("https://spoo.me/", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        });

        const shortened_url = response.data.short_url;

        const newURL = await urlModel.create({
            original_url,
            short_url: shortened_url,
        });

        res.status(201).json({
            message: {
                original_url: newURL.original_url,
                shortened_url: newURL.short_url,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while creating the shortened URL',
        });
    }
}

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await urlModel.find();
        res.json(urls.map(url => ({
            id: url._id,
            originalUrl: url.original_url,
            shortUrl: url.short_url,
        })));
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getUrlById = async (req, res) => {
    try {
        const url = await urlModel.findOne({ _id: req.params.id })
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        res.json({
            id: url._id,
            originalUrl: url.original_url,
            shortUrl: url.short_url,
        });
    } catch (error) {
        res.status(404).json * { error: "Server error" }
    }
}

exports.updateUrl = async (req, res) => {
    try {
        const { original_url } = req.body;
        const data = { url: original_url }
        const response = await axios.post("https://spoo.me/", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        });

        const shortened_url = response.data.short_url;
        const url = await urlModel.findOneAndUpdate(
            { _id: req.params.id },
            { original_url: original_url, short_url: shortened_url },
            { new: true }
        );

        if (!url) return res.status(404).json({ error: 'URL not found' });
        res.json({ message: 'URL updated', url });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.deleteUrl = async (req, res) => {
    try {
        const url = await urlModel.findOneAndDelete({ _id: req.params.id });
        if (!url) return res.status(404).json({ error: 'URL not found' });
        res.json({ message: 'URL deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}