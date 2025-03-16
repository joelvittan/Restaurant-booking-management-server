const { Booking, Tables, Users } = require("../models");

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  const { date, time, diners, table } = req.body;
  const userId = req?.user?.userId;
  const tableId = req?.user?.tableId || table;

  try {
    const table = await Tables.findByPk(tableId);

    if (!table || table.status !== "available" || diners > table.capacity) {
      return res
        .status(400)
        .json({ message: "Table not available or capacity exceeded" });
    }

    const booking = await Booking.create({
      userId,
      tableId,
      date: date || new Date(),
      time: time || new Date(),
      status: "pending",
      diners,
    });

    table.status = "reserved";
    await table.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveBooking = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const tableId = req?.user?.tableId;

  if (status === "confirmed") {
    const table = await Tables.findByPk(tableId);
    table.status = "reserved";
    await table.save();
  }
  if (status === "cancelled") {
    const table = await Tables.findByPk(tableId);
    table.status = "available";
    await table.save();
  }

  const userId = req.user.userId;
  const currentUser = await Users.findByPk(userId);

  if (status !== "cancelled" && currentUser.role !== "ADMIN") {
    return res.status(403).json({
      message: "Unauthorized Action - Only Admins can approve bookings",
    });
  }

  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();
    res
      .status(200)
      .json({ message: `Booking ${booking.id} ${status}  successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
