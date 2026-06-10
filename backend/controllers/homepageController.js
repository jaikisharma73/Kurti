import { v2 as cloudinary } from "cloudinary";
import homepageModel from "../models/homepageModel.js";

// Fetch the homepage custom settings
const getHomepageConfig = async (req, res) => {
    try {
        let config = await homepageModel.findOne();
        
        // If config doesn't exist in DB yet, send empty object or defaults
        if (!config) {
            config = {
                editorialBackdrop: "",
                editorialBlock1: "",
                editorialBlock1Title: "MODERN ELEGANCE",
                editorialBlock1Text: "A curated selection of timeless pieces designed to redefine your everyday wardrobe with effortless sophistication.",
                editorialBlock1Link: "/collection",
                editorialBlock2: "",
                editorialBlock2Title: "THE NEW SILHOUETTE",
                editorialBlock2Text: "Bold proportions meet classic tailoring, creating a striking balance between structure and fluidity.",
                editorialBlock2Link: "/collection",
                editorialBlock3: "",
                editorialBlock3Title: "REFINED TEXTURES",
                editorialBlock3Text: "Luxurious fabrics and meticulous craftsmanship converge to deliver an unparalleled tactile experience.",
                editorialBlock3Link: "/collection",
                firstSplitLeft: "",
                firstSplitLeftPrice: "2999",
                firstSplitLeftLink: "/collection",
                firstSplitRight: "",
                firstSplitRightPrice: "2999",
                firstSplitRightLink: "/collection",
                splitLeft: "",
                splitLeftPrice: "2999",
                splitLeftLink: "/collection",
                splitRight: "",
                splitRightPrice: "2999",
                splitRightLink: "/collection",
            };
        }

        res.json({ success: true, config });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update the homepage custom settings
const updateHomepageConfig = async (req, res) => {
    try {
        const {
            editorialBlock1Title,
            editorialBlock1Text,
            editorialBlock1Link,
            editorialBlock2Title,
            editorialBlock2Text,
            editorialBlock2Link,
            editorialBlock3Title,
            editorialBlock3Text,
            editorialBlock3Link,
            firstSplitLeftPrice,
            firstSplitLeftLink,
            firstSplitRightPrice,
            firstSplitRightLink,
            splitLeftPrice,
            splitLeftLink,
            splitRightPrice,
            splitRightLink,
        } = req.body;

        let config = await homepageModel.findOne();
        if (!config) {
            config = new homepageModel({});
        }

        // Helper to process uploaded images
        const uploadImage = async (fieldKey) => {
            const file = req.files?.[fieldKey] && req.files[fieldKey][0];
            if (file) {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
                return result.secure_url;
            }
            return config[fieldKey] || "";
        };

        config.editorialBackdrop = await uploadImage('editorialBackdrop');
        config.editorialBlock1 = await uploadImage('editorialBlock1');
        config.editorialBlock2 = await uploadImage('editorialBlock2');
        config.editorialBlock3 = await uploadImage('editorialBlock3');
        config.firstSplitLeft = await uploadImage('firstSplitLeft');
        config.firstSplitRight = await uploadImage('firstSplitRight');
        config.splitLeft = await uploadImage('splitLeft');
        config.splitRight = await uploadImage('splitRight');

        config.editorialBlock1Title = editorialBlock1Title || "MODERN ELEGANCE";
        config.editorialBlock1Text = editorialBlock1Text || "";
        config.editorialBlock1Link = editorialBlock1Link || "/collection";
        config.editorialBlock2Title = editorialBlock2Title || "THE NEW SILHOUETTE";
        config.editorialBlock2Text = editorialBlock2Text || "";
        config.editorialBlock2Link = editorialBlock2Link || "/collection";
        config.editorialBlock3Title = editorialBlock3Title || "REFINED TEXTURES";
        config.editorialBlock3Text = editorialBlock3Text || "";
        config.editorialBlock3Link = editorialBlock3Link || "/collection";
        
        config.firstSplitLeftPrice = firstSplitLeftPrice || "2999";
        config.firstSplitLeftLink = firstSplitLeftLink || "/collection";
        config.firstSplitRightPrice = firstSplitRightPrice || "2999";
        config.firstSplitRightLink = firstSplitRightLink || "/collection";

        config.splitLeftPrice = splitLeftPrice || "2999";
        config.splitLeftLink = splitLeftLink || "/collection";
        config.splitRightPrice = splitRightPrice || "2999";
        config.splitRightLink = splitRightLink || "/collection";

        await config.save();
        res.json({ success: true, message: "Homepage section updated successfully!", config });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { getHomepageConfig, updateHomepageConfig };
