const fs = require("fs");
const mongoose = require("mongoose");

const Employee = require("./app/models/employee");
const Employer = require("./app/models/employer");

mongoose.connect("mongodb://localhost:27017/bambuApp");

const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/data/employees.json`, "utf-8"),
);

const employers = JSON.parse(
  fs.readFileSync(`${__dirname}/data/employers.json`, "utf-8"),
);

const importData = async () => {
  try {
    await Employee.create(employees);
    await Employer.create(employers);
    console.log("Data imported successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete
const deleteData = async () => {
  try {
    await Employee.deleteMany();
    await Employer.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
