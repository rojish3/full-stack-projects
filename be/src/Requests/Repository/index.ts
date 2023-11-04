import { MongoClient, ObjectId } from "mongodb";
import { env } from "../../config";

const uri: string = env.URI ?? "";

const client = new MongoClient(uri);
const database = client.db("WebApplication");
const requestCollection = database.collection("requests");
const productCollection = database.collection("products");

export const addRequest = async (request: any) => {
  try {
    const { email, name, quantity } = request;
    const requestData = {
      name,
      quantity,
      email,
      status: "pending",
    };
    const newRequest = await requestCollection.insertOne(requestData);
    return "Request send successfully";
  } catch (error) {
    return error;
  }
};

export const listRequest = async () => {
  try {
    const requests = await requestCollection.find().toArray();
    // console.log(products);
    return requests;
  } catch (error) {
    return error;
  }
};

export const updateRequest = async (id: any, data: any) => {
  console.log(data);
  try {
    const requestData = await requestCollection.findOne({
      _id: new ObjectId(id),
    });
    console.log(requestData);
    const updatedData = await requestCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: data.status } }
    );
    const udpatedRequestData = await requestCollection.find().toArray();
    if (requestData && data.status == "approved") {
      const { name, quantity } = requestData;
      const findProduct = await productCollection.findOne({ name: name });
      const updatedQuantity = Number(findProduct?.quantity) - quantity;
      const updatedProduct = await productCollection.updateOne(
        { name: name },
        { $set: { quantity: updatedQuantity } }
      );
      return {
        message: "Product Approved",
        content: udpatedRequestData,
      };
    } else {
      return {
        message: "Product Declined",
        content: udpatedRequestData,
      };
    }
    // console.log(requestData);
  } catch (error) {
    throw new Error("Request update failed");
  }
};

export const deleteRequest = async (id: any) => {
  try {
    const request = await requestCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return "Request deleted successfully";
  } catch (error) {
    return error;
  }
};
