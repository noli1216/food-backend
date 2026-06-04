import db from "../../config/db.js";

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "cooking", "delivered"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);

    res.json({
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updateOrderStatus;
