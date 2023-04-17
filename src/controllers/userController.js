const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

let signup = async function (req, res) {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new userModel({ name, email, password: hash });
      user
        .save()
        .then(() => {
          res.status(201).send({ message: "User created successfully" });
        })
        .catch((error) => {
          res.status(500).send({ error });
        });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};


let login = async function (req, res) {
  try{
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: false, msg: "Email/Password is required" });
  }
  const userData = await userModel.findOne({
    email: email
  });
  if (!userData) {
    return res
      .status(404)
      .send({ status: false, msg: "Email  not found" });
  }
  let passwordHash = userData.password;
        const passwordMatch = await bcrypt.compare(password, passwordHash)
        if (!passwordMatch) {
            return res.status(400).send({ status: false, message: "Password dose not match with EmailId" })
       }  
       const token = jwt.sign({
        userId: userData._id.toString(),
        }, "the-secret-key", { expiresIn: '1m' })  
 res.status(200).send({ Token:token });
  }
    catch(err) {
      res.status(500).send({message: err.message});
    };
};

let getUser = async function (req, res) {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getUser, login, signup };
