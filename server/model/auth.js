// import mongoose from "mongoose";
// const userSchema = mongoose.Schema({
//   fullname: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   id: { type: String },
// });
// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";
const authSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});
export default mongoose.model("auth", authSchema);
