import express from "express";

import register from "../controller/users/register.js";
import login from "../controller/users/login.js";

import addMenu from "../controller/menu/addMenu.js";
import getMenus from "../controller/menu/getMenus.js";
import deleteMenu from "../controller/menu/deleteMenu.js";
import updateMenu from "../controller/menu/updateMenu.js";
import getMenuById from "../controller/menu/getMenuById.js";

import createOrder from "../controller/orders/createOrder.js";
import getOrders from "../controller/orders/getOrders.js";
import updateOrderStatus from "../controller/orders/updateStatus.js";
import getUserOrders from "../controller/orders/getUserOrders.js";

import auth from "../middleware/auth.js";
import createTables from "../controller/table.js";

const router = express.Router();

/* AUTH */
router.post("/register", register);
router.post("/login", login);

/* MENU */
router.post("/addmenu", addMenu);
router.get("/menus", getMenus);
router.get("/menu/:id", getMenuById);
router.put("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);

/* ORDERS */
router.post("/orders", auth, createOrder);
router.get("/orders", auth, getOrders);
router.put("/orders/:id/status", auth, updateOrderStatus);

/* USER ORDERS */
router.get("/my-orders", auth, getUserOrders);

/* TABLES */
router.get("/create-tables", createTables);

export default router;
