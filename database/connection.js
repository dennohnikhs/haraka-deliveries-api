const mysql = require("mysql2");
const { makeDb } = require("mysql-async-simple");

var con = {
  host: "localhost",
  user: "root",
  password: "",
  database: "haraka_deliveries",
};

let connection;

function handleDisconnect() {
  connection = mysql.createPool(con);

  // Add a console log for successful connection
  connection.getConnection((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database successfully");
    }
  });
}

handleDisconnect();

const db = makeDb();

async function executeQuery(sql, fields) {
  try {
    let returnObj = await db.query(connection, sql, fields);
    return returnObj;
  } catch (e) {
    // handle exception
    console.log({ e });
  }
}

module.exports = {
  connection,
  executeQuery,
};
