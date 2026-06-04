import db from "../../config/db.js";

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, id]);

    res.json({
      message: "Order status updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default updateOrderStatus;
