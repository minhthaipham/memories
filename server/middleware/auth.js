import jwt from "jsonwebtoken";
// import User from "../model/user.js";
// export const verify = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization");
//     console.log("token: ", token);
//     if (!token) return res.status(400).json({ msg: "Invalid Authentication" });
//     const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log(decodedData);
//     if (!decodedData)
//       return res.status(400).json({ msg: "Invalid Authentication" });
//     const user = await User.findById(decodedData.id).select("-password");
//     if (!user) return res.status(400).json({ msg: "Invalid Authentication" });
//     console.log(user);
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
