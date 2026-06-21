import mongoose from 'mongoose';
import Product from './models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/farm-connect';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongoose) => {
      // Seed initial products if collection is empty
      const count = await Product.countDocuments();
      if (count < 14) {
        await Product.deleteMany({});
        await Product.insertMany([
          { name: 'Organic Baby Porridge Mix', price: 350.00, image: '/images/organic_baby_1777728470004.png', category: 'Organic Baby Foods', description: 'Healthy and natural porridge mix for babies.' },
          { name: 'Herbal Diabetic Supplement', price: 450.00, image: '/images/diabetic_supplements_1777728483664.png', category: 'Diabetic Supplements', description: 'Herbal supplement to help manage diabetes naturally.' },
          { name: 'Millet Cookies & Dry Fruits', price: 250.00, image: '/images/healthy_snacks_1777728499376.png', category: 'Healthy Snacks & Sweets', description: 'Tasty and healthy millet cookies with dry fruits.' },
          { name: 'Organic Fresh Farm Basket', price: 500.00, image: '/images/fresh_produce_1777730300122.png', category: 'Fresh Produce', description: 'A vibrant basket of freshly harvested organic vegetables and fruits.' },
          { name: 'Fresh Organic Carrots', price: 120.00, image: '/images/Carrots-With-Orange-And-Cardamom-jumbo.jpg', category: 'Fresh Produce', description: 'Crunchy and sweet organic carrots.' },
          { name: 'Fresh Organic Beetroot', price: 150.00, image: '/images/Is-Beetroot-Good-for-Diabetes-2-1200x900.webp', category: 'Fresh Produce', description: 'Farm fresh organic beetroot.' },
          { name: 'Fresh Organic Mangoes', price: 300.00, image: '/images/Mango_6fb74c95-c9b0-4559-88e8-f542e6d6b18d.webp', category: 'Fresh Produce', description: 'Sweet and juicy organic mangoes.' },
          { name: 'Farm Fresh Apples', price: 250.00, image: '/images/apples-at-farmers-market-royalty-free-image-1627321463.avif', category: 'Fresh Produce', description: 'Crisp and delicious farm fresh apples.' },
          { name: 'Assorted Fresh Vegetables', price: 400.00, image: '/images/photo-1611080626919-7cf5a9dbab5b.avif', category: 'Fresh Produce', description: 'A mix of various fresh organic vegetables.' },
          { name: 'Premium Assorted Nuts', price: 850.00, image: '/images/Assorted nuts.jpg', category: 'Nuts & Spices', description: 'A premium mix of fresh and healthy nuts.' },
          { name: 'Organic Badam (Almonds)', price: 900.00, image: '/images/badam.jpg', category: 'Nuts & Spices', description: 'High-quality organic almonds.' },
          { name: 'Premium Cashews', price: 800.00, image: '/images/cashew.jpg', category: 'Nuts & Spices', description: 'Crunchy and fresh premium cashews.' },
          { name: 'Roasted Pistachios', price: 950.00, image: '/images/pista.webp', category: 'Nuts & Spices', description: 'Delicious lightly roasted pistachios.' },
          { name: 'Satvikk Dry Grapes (Raisins)', price: 350.00, image: '/images/Satvikk-dry-grapes.jpg', category: 'Nuts & Spices', description: 'Sweet and nutritious dry grapes.' }
        ]);
      }

      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
