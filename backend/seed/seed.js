const mongoose = require('mongoose');
const Example = require('../models/exampleModel');
const dotenv = require('dotenv');

dotenv.config();

const seedData = [
  {
    title: 'Item 1',
    description: 'Description for item 1',
    price: 10,
    category: 'Category 1',
    sold: true,
    image: 'image1.jpg',
    month: '03'
  },
  {
    title: 'Item 2',
    description: 'Description for item 2',
    price: 20,
    category: 'Category 2',
    sold: false,
    image: 'image2.jpg',
    month: '03'
  },
  // Add more items here...
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Database connected!');
    await Example.deleteMany({});
    await Example.insertMany(seedData);
    console.log('Data seeded!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
