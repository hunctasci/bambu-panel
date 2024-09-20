const mongoose = require("mongoose");

// Schema for Employment History (to reference employers and add notes)
const EmploymentHistorySchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },
  description: String, // For notes
  startDate: Date,
  endDate: Date,
});

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  competence: {
    type: [String],
    enum: ["Bebek Bakicisi", "Temizlik Elemani", "Yasli Bakici"], // Dropdown options
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String, // File path to the image
    validate: {
      validator: function (value) {
        // Assuming the image is saved locally, we can validate its size before saving
        const fs = require("fs");
        const stats = fs.statSync(value);
        const fileSizeInBytes = stats.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
        return fileSizeInMB <= 2; // Limit to 2MB
      },
      message: "Avatar image should not exceed 2MB.",
    },
  },
  employmentHistory: [EmploymentHistorySchema],
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
