import db from "../../config/db.js";

const createOrder = async (req, res) => {
  console.log("CREATE ORDER HIT");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  try {
    const user_id = req.user.id;

    const { cart, total_price, phone, address } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // INSERT ORDER
    const [orderResult] = await db.query(
      `INSERT INTO orders (user_id, total_price, status, phone, address)
       VALUES (?, ?, 'pending', ?, ?)`,
      [user_id, total_price, phone, address],
    );

    const orderId = orderResult.insertId;

    // INSERT ITEMS
    for (let item of cart) {
      await db.query(
        `INSERT INTO order_items (order_id, food_name, price, quantity)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.food_name, item.price, item.quantity || 1],
      );
    }

    res.json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export default createOrder;
