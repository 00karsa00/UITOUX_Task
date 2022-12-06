const mongoose = require("mongoose");
const db = require("./dbConnection");
const product = require("./dbSchema/prodcuts");

exports.insertProduct = (data) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      var products = new product(data);
      products.save(function (err, data) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
        } else {
          respose = {
            error: false,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};

exports.getAllProduct = () => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      product.find({}, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
          resolve(respose);
        } else {
          respose = {
            error: false,
            data: results,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};

exports.searchAndFilterProduct = (where, orderBy) => {
  console.log(where, orderBy);
  let respose = {};
  return new Promise((resolve) => {
    try {
      product.find(where, {}, orderBy, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
          resolve(respose);
        } else {
          respose = {
            error: false,
            data: results,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};