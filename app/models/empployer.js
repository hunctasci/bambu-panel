const EmployerSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
  },
  employeeHistory: [
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      description: String, // For notes
      startDate: Date,
      endDate: Date,
    },
  ],
  placeType: {
    type: String,
    enum: ["Office", "Apartment", "Villa"], // Renamed for clarity
    required: true,
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);
