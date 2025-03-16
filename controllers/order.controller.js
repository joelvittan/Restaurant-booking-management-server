const { Op } = require("sequelize");
const { Users, Order, Booking, MenuItem, Payment } = require("../models");

const createOrder = async (req, res) => {
  const user = await Users.findByPk(req.user.userId);
  const { orderedItems, totalAmount } = req.body;
  const orderDate = new Date();

  const bookingId = (
    await Booking.findOne({
      where: {
        userId: user.id,
        status: "confirmed",
      },
    })
  ).id;

  const existingOrder = await Order.findOne({
    where: {
      userId: user.id,
      status: "pending",
    },
  });

  if (existingOrder) {
    res.status(400).json({ message: "Already one order is pending, please pay or cancel it", success: false });
    return;
  }

  const menuItemIds = orderedItems.map((item) => item.menuItemId);
  const menuItems = await MenuItem.findAll({
    where: {
      id: {
        [Op.in]: menuItemIds,
      },
    },
  });

  orderedItems.map(async (item) => {
    const menuItem = menuItems.find((mi) => mi.id === item.menuItemId);
    if (menuItem && menuItem.quantity >= item.quantity) {
      menuItem.quantity -= item.quantity;
      await menuItem.save();
    } else {
      res.status(400).json(`Insufficient quantity for menu item ID: ${item.menuItemId}`);
    }
  });

  try {
    const newOrder = await Order.create({
      userId: user.id,
      orderDate,
      bookingId,
      totalAmount,
      orderedItems,
    });

    Payment.create({
      orderId: newOrder.id,
      paymentDate: orderDate,
      amount: totalAmount,
      paymentMethod: "Cash",
      paymentStatus: "Unpaid",
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    await order.update({ status });

    res.status(200).json({
      message: "Order status updated successfully",
      order,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    await order.destroy();

    res.status(200).json({
      message: "Order deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ orders, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

module.exports = { createOrder, updateOrderStatus, deleteOrder, getAllOrders };
