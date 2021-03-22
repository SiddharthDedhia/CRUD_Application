const mongoose = require('mongoose');
const Schema = mongoose.Schema; //just to not write mongoose.schema again and again

const CampGroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampGroundSchema);