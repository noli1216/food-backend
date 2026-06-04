import db from "../../config/db.js";

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM menus WHERE id=?`, [id]);

    res.json({
      message: "Menu deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export default deleteMenu;
