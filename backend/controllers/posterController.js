import { v2 as cloudinary } from "cloudinary";
import posterModel from "../models/posterModel.js";

// Add a new poster/banner
const addPoster = async (req, res) => {
    try {
        const { title, subtitle, description } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: "Please upload an image for the poster" });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageUrl = result.secure_url;

        const posterData = {
            image: imageUrl,
            title: title || "",
            subtitle: subtitle || "",
            description: description || "",
            isActive: true,
            date: Date.now()
        };

        const poster = new posterModel(posterData);
        await poster.save();

        res.json({ success: true, message: "Poster Added successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// List all posters (both active and inactive)
const listPosters = async (req, res) => {
    try {
        const posters = await posterModel.find({}).sort({ date: -1 });
        res.json({ success: true, posters });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Remove a poster
const removePoster = async (req, res) => {
    try {
        const { id } = req.body;
        await posterModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Poster removed successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Toggle active status
const togglePosterStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const poster = await posterModel.findById(id);
        if (!poster) {
            return res.json({ success: false, message: "Poster not found" });
        }
        
        poster.isActive = !poster.isActive;
        await poster.save();
        
        res.json({ success: true, message: "Poster status updated!", isActive: poster.isActive });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addPoster, listPosters, removePoster, togglePosterStatus };
