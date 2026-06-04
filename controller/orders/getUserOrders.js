import db from "../../config/db.js";

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("USER ID:", req.user.id);

    const [orders] = await db.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
    );

    for (let order of orders) {
      const [items] = await db.query(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id],
      );

      order.items = items;
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getUserOrders;
