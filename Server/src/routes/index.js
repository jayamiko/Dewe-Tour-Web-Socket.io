const express = require("express");
const router = express.Router();
const {
  addUsers,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  addTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");
const {
  addTransaction,
  updatePay,
  updateConfirmTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
const { register, login, checkAuth } = require("../controllers/auth");

// Middleware
const { auth, adminOnly } = require("../middlewares/auth");
const { uploadsFile } = require("../middlewares/uploadsFile");

// Route User
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/users", addUsers);
router.put("/user/:id", uploadsFile("photo"), updateUser);
router.delete("/user/:id", deleteUser);

// Route Trips
router.get("/trips", getTrips);
router.get("/trip/:id", getTrip);
router.post("/trip", uploadsFile("image"), addTrip);
router.put("/trip/:id", auth, updateTrip);
router.delete("/trip/:id", auth, adminOnly, deleteTrip);

// Route Transaction
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.post("/transaction", auth, addTransaction);
router.put("/transactions/pay/:id", auth, uploadsFile("attachment"), updatePay);
router.put(
  "/transactions/confirm/:id",
  auth,
  adminOnly,
  updateConfirmTransaction
);
router.delete("/transaction/:id", auth, deleteTransaction);

// Route Auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
