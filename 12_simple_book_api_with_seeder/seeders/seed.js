// seeders/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const Book = require('../models/book.model');
require('dotenv').config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/simple_book_api';

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected.');

    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();
    console.log('Existing data cleared.');

    // Seed users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const password = await bcrypt.hash('password123', 10);
      const user = new User({
       username: faker.internet.username(),
        email: faker.internet.email(),
        password,
      });
      users.push(await user.save());
    }
    console.log('5 users created.');

    // Seed books
    const books = [];
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      books.push({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.date.anytime().getFullYear(),
        userId: randomUser._id,
      });
    }

    await Book.insertMany(books);
    console.log('10 books created.');

    mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
