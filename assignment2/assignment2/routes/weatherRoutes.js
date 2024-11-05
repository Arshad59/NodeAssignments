const express = require("express");
const router = express.Router();
const handler = require("../handler/weatherHandler");

router.get("/showAll", handler.showAllDetails);
router.get("/rainDetails", handler.showRainDetails);
router.post("/addData", handler.addNewCityTempDetails);
router.put("/update-rain/delhi", handler.changeRainDetails);
router.delete("/remove/:cityName",handler.removeCityDetails);
router.get("/:cityName", handler.showCityDetails);

module.exports = router;
