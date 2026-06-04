import db from "../config/db.js";

const createTables = async (req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(20),
        image TEXT,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS menus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_name VARCHAR(100),
        description TEXT,
        price DECIMAL(10,2),
        image TEXT,
        category VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        total_price DECIMAL(10,2),
        status VARCHAR(50) DEFAULT 'pending',
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        food_name VARCHAR(100),
        price DECIMAL(10,2),
        quantity INT DEFAULT 1,
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE
      )
    `);

    res.json({ message: "Tables created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default createTables;
