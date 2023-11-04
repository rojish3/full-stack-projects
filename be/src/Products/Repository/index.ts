import { MongoClient, ObjectId } from "mongodb";
import { IProduct } from "../../types/products.types";
import e from "express";
const uri =
  "mongodb+srv://rojishranjit3:wBonN0lSva6kuCI4@cluster0.mvw7xc3.mongodb.net/";

const client = new MongoClient(uri);
const database = client.db("WebApplication");
const productCollection = database.collection("products");

export const addProduct = async (product: IProduct) => {
  try {
    const { name, brand, category, price, quantity, description, image } =
      product;
    const productData = {
      name,
      brand,
      category,
      price,
      quantity,
      description,
      image,
    };
    const newProduct = await productCollection.insertOne(productData);
    // console.log(newProduct);
    return "Product added successfully";
  } catch (error) {
    return error;
  }
};

export const listProduct = async () => {
  try {
    const products = await productCollection.find().toArray();
    // console.log(products);
    return products;
  } catch (error) {
    return error;
  }
};

export const singleProduct = async (id: any) => {
  try {
    const singleproduct = await productCollection.findOne({
      _id: new ObjectId(id),
    });
    // console.log(singleproduct);
    return singleproduct;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (product: IProduct) => {
  try {
    console.log("Product in repository:", product);
    if (product) {
      const { id, name, brand, category, price, quantity, description, image } =
        product;

      const findProduct = await productCollection.findOne({
        _id: new ObjectId(id),
      });
      if (findProduct) {
        const updatedProduct = await productCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              name: name,
              brand: brand,
              category: category,
              price: price,
              quantity: quantity,
              description: description,
              image: image,
            },
          }
        );
        const updated = await productCollection.findOne({
          _id: new ObjectId(id),
        });
        return "Product updated successfully";
      }
    }
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id: any) => {
  try {
    const product = await productCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return "Product deleted successfully";
  } catch (error) {
    return error;
  }
};
