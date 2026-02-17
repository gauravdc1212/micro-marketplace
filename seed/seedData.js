const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const Product = require("../models/Product");


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected for seeding"))
    .catch(err => console.log(err));


const seedData = async () => {

    try {

        // clear old data
        await User.deleteMany();
        await Product.deleteMany();

        console.log("Old data removed");


        // create users
        const password = await bcrypt.hash("123456", 10);

        const users = await User.insertMany([
            {
                name: "Test User",
                email: "user@test.com",
                password: 123456
            },
            {
                name: "Admin User",
                email: "admin@test.com",
                password: 123456
            }
        ]);

        console.log("Users created");


        // create products
        const products = await Product.insertMany([

            {
                title: "iPhone 14",
                price: 80000,
                description: "Apple smartphone",
                // image: "https://picsum.photos/200?1",
                image: "https://rbzone.com/pub/media/catalog/product/cache/cd5d238cdcd4ca91f1d0f3bfb2f09449/0/1/01_264_4_1.jpg?1"
            },

            {
                title: "Samsung S23",
                price: 75000,
                description: "Samsung smartphone",
                image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/268867_0_sstd64.png?2"
            },

            {
                title: "MacBook Air",
                price: 120000,
                description: "Apple laptop",
                image: "https://techtoro.io/image/cache/catalog/Blogs/MacBookAir15-Review/MacBookAir15-1920x1080.jpg?3"
            },

            {
                title: "Dell Laptop",
                price: 60000,
                description: "Dell laptop",
                image: "https://m.media-amazon.com/images/I/71Vum7DnVBL._AC_UF1000,1000_QL80_.jpg?4"
            },

            {
                title: "Sony Headphones",
                price: 15000,
                description: "Noise cancelling headphones",
                image: "https://conceptkart.com/cdn/shop/files/Concept-Kart-Sony-WH-CH720N-Wireless-Headphone-Blue-1-_1.jpg?v=1691475945?5"
            },

            {
                title: "Smart Watch",
                price: 10000,
                description: "Fitness smart watch",
                image: "https://m.media-amazon.com/images/I/61pIzNaNRWL._AC_UF1000,1000_QL80_.jpg?6"
            },

            {
                title: "Bluetooth Speaker",
                price: 5000,
                description: "Portable speaker",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0QwunnSWjko79DsI50WpUtRe6BcksV1NBg&s?7"
            },

            {
                title: "Gaming Mouse",
                price: 2000,
                description: "RGB gaming mouse",
                image: "https://m.media-amazon.com/images/I/61AcT0ZuO3L.jpg?8"
            },

            {
                title: "Keyboard",
                price: 3000,
                description: "Mechanical keyboard",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGjiGpp4O2EYbaQx8Ol08RHCn7Df4lrO3P9Q&s?9"
            },

            {
                title: "Monitor",
                price: 20000,
                description: "Full HD monitor",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtrfZtv8fkvjHOn9Ca_6ySYJcX-XY7NEfOnA&s?10"
            }

        ]);

        console.log("Products created");

        console.log("Seeding completed");

        process.exit();

    } catch (error) {

        console.log(error);
        process.exit();

    }
};


seedData();
