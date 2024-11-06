const urlModel = require("../models/urlModel");

const axios = require("axios");
const ApiError = require("../utils/ApiError");

exports.createShortUrl = async (req, res, next) => {
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
        // console.error(error);
        // res.status(500).json({
        //     error: 'An error occurred while creating the shortened URL',
        // });
        next(new ApiError(500, "An error occured while creating the shortened URL"))
    }
}

exports.getAllUrls = async (req, res, next) => {
    try {
        const urls = await urlModel.find();
        res.json(urls.map(url => ({
            id: url._id,
            originalUrl: url.original_url,
            shortUrl: url.short_url,
        })));
    } catch (error) {
        next(new ApiError(500, "Server Error"))
    }
};

exports.getUrlById = async (req, res, next) => {
    try {
        const url = await urlModel.findOne({ _id: req.params.id })
        if (!url) {
            next(new ApiError(400, `URL with id :${req.params.id} not found`))
        }
        res.json({
            id: url._id,
            originalUrl: url.original_url,
            shortUrl: url.short_url,
        });
    } catch (error) {
        // res.status(404).json * { error: "Server error" }
        next(new ApiError(404, `URL with id:${req.params.id} not found`))
    }
}

exports.updateUrl = async (req, res, next) => {
    try {
        const existingUrl = await urlModel.findOne({ _id: req.params.id });
        if (!existingUrl) {
            // return res.status(404).json({ error: 'URL not found' });
            next(new ApiError(404, `URL with id:${req.params.id} not found`))
        }
        const data = { url: existingUrl.original_url }
        const response = await axios.post("https://spoo.me/", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        });

        const shortened_url = response.data.short_url;
        const url = await urlModel.findOneAndUpdate(
            { _id: req.params.id },
            { original_url: existingUrl.original_url, short_url: shortened_url },
            { new: true }
        );

        if (!url) {
            // res.status(404).json({ error: 'URL not found' });
            next(new ApiError(404, `URL not found`))
        }
        res.json({ message: 'URL updated', url });

    } catch (error) {
        console.log(error.message)
        // res.status(500).json({ error: 'Server Error' });
        next(new ApiError(500, "An error occured while fetching the URL"))
    }
};

exports.deleteUrl = async (req, res, next) => {
    try {
        const url = await urlModel.findOneAndDelete({ _id: req.params.id });
        if (!url) {
            //  res.status(404).json({ error: 'URL not found' });
            next(new ApiError(404, "An error occured while fetching the URL"))
        }
        res.json({ message: 'URL deleted' });
    } catch (error) {
        // res.status(500).json({ error: 'Server Error' });
        next(new ApiError(500, "An error occured while fetching the URL"))
    }
}