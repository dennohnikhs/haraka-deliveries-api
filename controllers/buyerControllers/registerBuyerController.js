const bcrypt = require("bcryptjs");
const Buyer = require("../../models/buyer/buyer");

async function registerBuyer(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const phoneNumber = req.body.phoneNumber;
    const password = hashedPassword;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const idNumber = req.body.idNumber;
    await Buyer.addOneBuyer(
      phoneNumber,
      password,
      firstName,
      lastName,
      email,
      idNumber
    );
    return res.json({
      success: true,
      success_message: "new user added successfully",
    });
  } catch (error) {
    {
      console.log("Error while trying to add  new user");
      console.log({ error });
      res.json({
        success: false,
        success_message:
          "Oops!!! an error occurred while trying to add new user.",
      });
    }
  }
}
module.exports = {
  registerBuyer,
};
