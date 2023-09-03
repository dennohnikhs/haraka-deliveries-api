const jwt = require("jsonwebtoken");
const Buyer = require("../../models/buyer/buyer");

async function loginBuyer(req, res) {
  try {
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;

    let buyer = await Buyer.loginBuyer(phoneNumber, password);

    if (buyer) {
      // buyer exists and login is successful
      const token = jwt.sign(
        { id: buyer.id, role: "buyer", phoneNumber: buyer.phone_number },
        "secret-key"
      );
      return res.json({
        success: true,
        success_message: "buyer logged in successfully",
        token: token,
      });
    } else {
      // buyer does not exist or invalid login details
      return res.status(401).json({
        success: false,
        error_message: "Invalid login details",
      });
    }
  } catch (error) {
    console.log("Error while trying to log in buyer");
    console.log({ error });
    res.status(500).json({
      success: false,
      error_message: "An error occurred while trying to log in buyer.",
    });
  }
}

module.exports = {
  loginBuyer,
};
