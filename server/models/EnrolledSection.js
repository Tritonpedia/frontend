const mongoose = require('mongoose');
const Section = require('./Section');
const Schema = mongoose.Schema;

const EnrolledSectionSchema = new Schema({
    section_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lecture_zoom: {
        type: String
    },
    discussion_zoom: {
        type: String
    },
    lab_zoom: {
        type: String
    },
    oh_zoom: {
        type: String
    },
    piazza: {
        type: String
    },
    gradescope: {
        type: String
    }
});

module.exports = mongoose.model('EnrolledSection', EnrolledSectionSchema);