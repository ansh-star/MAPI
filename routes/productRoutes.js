const express = require("express");
const { verifyToken } = require("../utils/tokenGenerator");
const { productValidator } = require("../controllers/productChecker");
const { addProduct } = require("../controllers/addController");
const { updateProducts } = require("../controllers/updateController");
const { deleteProducts } = require("../controllers/deleteController");
const router = express.Router();

router.use(verifyToken);
router.post("", productValidator, addProduct);
router.put("", updateProducts);
router.delete("", deleteProducts);

module.exports = router;
