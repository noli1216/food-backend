import db from "../../config/db.js";

const getMenuById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("SELECT * FROM menus WHERE id=?", [id]);

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export default getMenuById;
