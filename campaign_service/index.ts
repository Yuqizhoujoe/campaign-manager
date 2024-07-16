import "./src/config"

import express from "express"

// controllers
import accountControllers from "./src/controllers/accountController"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/accounts", accountControllers);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Campaign service is running on http://localhost:${PORT}`)
})