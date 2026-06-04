import db from "../../config/db.js";

const getOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT * FROM orders
      ORDER BY created_at DESC
    `);

    for (let order of orders) {
      const [items] = await db.query(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id],
      );
      order.items = items;
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getOrders;
