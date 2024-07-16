import "./src/config";

import express from "express";

// controllers
import platformController from "./src/controllers/platformController";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/platforms", platformController);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Campaign service is running on http://localhost:${PORT}`);
});
