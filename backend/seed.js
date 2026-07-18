const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./src/models/user.model')
const Product = require('./src/models/product.model')

//connect to db

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('mongodb connected for seeding'))
.catch(err=>{
    console.error('monod connection error :', err);
    process.exit(1);
});

const products = [
  {
    name: "iPhone 15",
    description: "Apple iPhone 15 with A16 Bionic chip",
    price: 79999,
    category: "Mobiles",
    stock: 20,
    imageUrl: "https://picsum.photos/300?random=1",
    rating: 4.8,
    numReviews: 120
  },
  {
    name: "Samsung Galaxy S24",
    description: "Latest Samsung flagship smartphone",
    price: 74999,
    category: "Mobiles",
    stock: 15,
    imageUrl: "https://picsum.photos/300?random=2",
    rating: 4.7,
    numReviews: 95
  },
  {
    name: "MacBook Air M3",
    description: "Apple MacBook Air with M3 chip",
    price: 119999,
    category: "Laptops",
    stock: 10,
    imageUrl: "https://picsum.photos/300?random=3",
    rating: 4.9,
    numReviews: 60
  },
  {
    name: "Dell Inspiron 15",
    description: "15-inch laptop with Intel Core i5",
    price: 64999,
    category: "Laptops",
    stock: 18,
    imageUrl: "https://picsum.photos/300?random=4",
    rating: 4.5,
    numReviews: 42
  },
  {
    name: "Sony WH-1000XM5",
    description: "Noise cancelling wireless headphones",
    price: 29999,
    category: "Headphones",
    stock: 30,
    imageUrl: "https://picsum.photos/300?random=5",
    rating: 4.8,
    numReviews: 88
  }
];

async function seedDB() {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [
      {
        name: "Ayush",
        email: "ayush@example.com",
        password: hashedPassword,
        role: "admin",
        verified: true
      },
      {
        name: "Rahul",
        email: "rahul@example.com",
        password: hashedPassword,
        role: "user",
        verified: true
      },
      {
        name: "Priya",
        email: "priya@example.com",
        password: hashedPassword,
        role: "user",
        verified: false
      },
      {
        name: "Amit",
        email: "amit@example.com",
        password: hashedPassword,
        role: "user",
        verified: true
      }
    ];

    await User.insertMany(users);
    await Product.insertMany(products);

    console.log("✅ Users and Products inserted successfully.");
    console.log("Login Email: ayush@example.com");
    console.log("Login Password: 123456");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedDB();


