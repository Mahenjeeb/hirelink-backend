import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

const createUser = async (req, resp) => {
  let { username, email, password, isAdmin } = req.body;
  try {
    let isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (!isUserExist) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await userModel.create({
        username,
        email,
        password: hashedPassword,
        isAdmin,
      });
      return resp.status(201).json({ message: "User created sucessfully" });
    }
    return resp.status(200).json({ message: "Username or email exists" });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllUsers = async (_,resp) => {
  const users = await userModel.find();
  if(users.length === 0) {
    return resp.status(404).json({ message: "No Records Found" });
  }
  return resp.status(200).json({ message: "User details fetched successfully" });
}

const updateUserDetails = async (req, resp) => {
  let { id } = req.params;
  let { email, isAdmin } = req.body;
  let filter = { _id: id };
  let update = { email, isAdmin };
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return resp.status(404).json({ message: "Invalid Id" });
    }
    if (email === "" || isAdmin === "") {
      return resp.status(404).json({ message: "Please fill mandatory fileds" });
    }
    let isUpdated = await userModel.findById({_id: id});
    if (isUpdated.email === email && isUpdated.isAdmin == isAdmin) {
      return resp.status(200).json({ message: "Already updated" });
    }
    await userModel.findByIdAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });
    return resp.status(200).json({ message: "Updated Sucessfully" });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, resp) => {
  let { username, password } = req.body;
  try {
    let user = await userModel.findOne({ username });
    if (!user) {
      return resp
        .status(404)
        .json({ message: "No User Fount. Create new account" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return resp.status(404).json({ message: "Wrong password. Try again" });
    }
    return resp.status(200).json({ message: `Welcome back ${username}` });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, resp) => {
  let { id } = req.params;
  try {
    let records = await userModel.find();
    if (!mongoose.Types.ObjectId.isValid(id) || records.length == 0) {
      return resp.status(404).json({ message: "No records found" });
    }
    await userModel.findByIdAndDelete({ _id: id });
    return resp.status(200).json({ message: "Deleted sucessfully" });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

export { createUser, getAllUsers, updateUserDetails, loginUser, deleteUser };
