const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //My user ID
            author: '6064e75e03110b57fc350f4f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dy198t7tn/image/upload/v1617299147/YelpCamp/tho6yhyz1d3ht1mbxf5p.png',
                    filename: 'YelpCamp/tho6yhyz1d3ht1mbxf5p'
                },
                {
                    url: 'https://res.cloudinary.com/dy198t7tn/image/upload/v1617299148/YelpCamp/yy6kh6uyraholnnf9u1f.png',
                    filename: 'YelpCamp/yy6kh6uyraholnnf9u1f'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    console.log('Done')
    mongoose.connection.close();
})