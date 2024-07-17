import "./src/config";

import express from "express";

// controllers
import platformController from "./src/controllers/platformController";
import reportController from "./src/controllers/reportController";
import campaignController from "./src/controllers/campaignController";

import { createReportsInBatch } from "./src/services/reportService";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/platforms", platformController);
app.use("/reports", reportController);
app.use("/campaigns", campaignController);

// startService();

createReportsInBatch();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Campaign service is running on http://localhost:${PORT}`);
});
