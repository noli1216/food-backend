import db from "../../config/db.js";

const addMenu = async (req, res) => {
  const { food_name, description, price, image, category } = req.body;

  try {
    const sql = `
      INSERT INTO menus
      (food_name, description, price, image, category)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(sql, [food_name, description, price, image, category]);

    res.json({
      message: "Menu added successfully",
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export default addMenu;
