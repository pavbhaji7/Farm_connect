import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/lib/models/Product';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, price, image, category, description } = await request.json();
    await dbConnect();
    
    const newProduct = await Product.create({
      name,
      price,
      image,
      category,
      description
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
