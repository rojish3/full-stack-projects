import { MongoClient, ObjectId } from "mongodb";
import { IUser } from "../../types/users.types";
import { env } from "../../config/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const uri: string = env.URI ?? "";
const client = new MongoClient(uri);
const database = client.db("WebApplication");
const usersCollection = database.collection("users");
const rolesCollection = database.collection("roles");

export const listUsers = async () => {
  try {
    const listUsers = await usersCollection.find().toArray();
    return listUsers;
  } catch (error) {
    return error;
  }
};

export const createUser = async (user: IUser) => {
  try {
    const roleData = await rolesCollection.findOne({ name: "USER" });
    const roleName = roleData ? roleData.name : null;
    const { firstName, lastName, gender, phoneNumber, email, password, image } =
      user;

    // Encrypt Password before saving to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const emailSearch = await usersCollection.findOne({ email });
    const emailId = emailSearch ? emailSearch.email : null;

    if (emailId === email) {
      return "User already exists";
    } else {
      const userData: any = {
        firstName,
        lastName,
        gender,
        phoneNumber,
        email,
        password: hashedPassword,
        role: roleName,
      };

      if (image) {
        userData.image = image;
      } else {
        userData.image =
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
      }

      const createUser = await usersCollection.insertOne(userData);
      return "User created successfully";
    }
  } catch (error) {
    return error;
  }
};

export const userDetails = async (id: any) => {
  try {
    const userData = await usersCollection.findOne({
      _id: new ObjectId(id),
    });
    // console.log(singleproduct);
    return userData;
  } catch (error) {
    return error;
  }
};

export const removeUser = async (id: any) => {
  try {
    const product = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return "User deleted successfully";
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user: IUser) => {
  try {
    const { email, password } = user;
    const userInfo = await usersCollection.findOne({ email });
    if (userInfo) {
      const hashedPass = await bcrypt.compare(password, userInfo.password);
      if (userInfo?.email === email && hashedPass) {
        return userInfo;
      }
    }
  } catch (error) {
    throw new Error("Invalid Email or Password");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const userData = await usersCollection.findOne({ email });
    if (userData !== null) {
      return userData;
    }
  } catch (error) {
    throw error;
  }
};

export const passwordReset = async (token: any, password: string) => {
  try {
    const myToken = jwt.verify(token, process.env.SECRET_TOKEN as string);
    const userData = await usersCollection.findOne({ email: myToken });

    //Encrypt Password before saving to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log(userData);
    const updatedData = await usersCollection.updateOne(
      { email: myToken },
      { $set: { password: hashedPassword } }
    );
    // console.log(updatedData);
    return "Password updated successfully!";
  } catch (error) {
    throw error;
  }
};

export const profileData = async () => {
  try {
    return "Home Page";
  } catch (error) {
    console.log(error);
  }
};
