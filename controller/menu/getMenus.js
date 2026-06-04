import db from "../../config/db.js";

const getMenus = async (req, res) => {
  try {
    const [menus] = await db.query("SELECT * FROM menus ORDER BY id DESC");

    res.json(menus);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export default getMenus;
