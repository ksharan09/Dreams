const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* BOOKING SCHEMA */
const bookingSchema = new mongoose.Schema({

  name: String,

  phone: String,

  email: String,

  shootType: String,

  package: String,

  date: String,

  message: String

});

/* MODEL */
const Booking = mongoose.model("Booking", bookingSchema);

/* SAVE BOOKING */
app.post("/book", async (req, res) => {

    try {

        console.log(req.body);

        const booking = new Booking(req.body);

        await booking.save();

        res.status(200).json({
            message: "Booking Saved"
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});

/* GET ALL BOOKINGS */
app.get("/bookings", async (req, res) => {

    try {

        const bookings = await Booking.find();

        res.json(bookings);

    } catch(error) {

        res.status(500).json({
            error: error.message
        });
    }
});

/* SERVER */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});