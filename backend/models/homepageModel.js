import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema({
    editorialBackdrop: { type: String },
    editorialBlock1: { type: String },
    editorialBlock1Title: { type: String },
    editorialBlock1Text: { type: String },
    editorialBlock1Link: { type: String },
    editorialBlock2: { type: String },
    editorialBlock2Title: { type: String },
    editorialBlock2Text: { type: String },
    editorialBlock2Link: { type: String },
    editorialBlock3: { type: String },
    editorialBlock3Title: { type: String },
    editorialBlock3Text: { type: String },
    editorialBlock3Link: { type: String },
    firstSplitLeft: { type: String },
    firstSplitLeftPrice: { type: String },
    firstSplitLeftLink: { type: String },
    firstSplitRight: { type: String },
    firstSplitRightPrice: { type: String },
    firstSplitRightLink: { type: String },
    splitLeft: { type: String },
    splitLeftPrice: { type: String },
    splitLeftLink: { type: String },
    splitRight: { type: String },
    splitRightPrice: { type: String },
    splitRightLink: { type: String },
})

const homepageModel = mongoose.models.homepage || mongoose.model("homepage", homepageSchema);

export default homepageModel;
