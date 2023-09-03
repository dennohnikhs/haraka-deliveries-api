const { executeQuery } = require("../../database/connection");
const bcrypt = require("bcryptjs");

class Buyer {
  static async addOneBuyer(
    phoneNumber,
    password,
    firstName,
    lastName,
    email,
    idNumber
  ) {
    try {
      const result = await executeQuery(
        "INSERT INTO buyer (phone_number,password,first_name,last_name,email,id_number) VALUES (?,?,?,?,?,?)",
        [phoneNumber, password, firstName, lastName, email, idNumber]
      );
      return result;
    } catch (error) {
      console.log({ error });
      console.log("error while trying while trying to add new buyer");
    }
  }
  static async loginBuyer(phoneNumber, password) {
    try {
      const result = await executeQuery(
        "SELECT * FROM buyer WHERE phone_number = ? LIMIT 1",
        [phoneNumber]
      );

      if (result && result.length > 0) {
        const buyer = result[0];

        const passwordVerified = await bcrypt.compare(password, buyer.password);

        if (!passwordVerified) {
          return false;
        }

        return buyer;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
module.exports = Buyer;
