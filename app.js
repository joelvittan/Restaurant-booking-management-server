const express = require("express");
const cors = require("cors");
swaggerUi = require("swagger-ui-express");

const usersRouter = require("./routes/user.routes");
const tableRouter = require("./routes/table.routes");
const swaggerDocs = require("./config/swagger.config");
const categoryRouter = require("./routes/categoryRoutes/category.routes")
const SubCategoryRoutes = require("./routes/categoryRoutes/subCategory.routes")
const MenuItemRouter = require("./routes/menu.routes")
const app = express();

app.use((req, res, next) => {
  console.log(`\x1b[32m%s\x1b[0m`, `${req.method} ${req.path}`);
  next();
});


app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
// user routes
app.use("/api/auth", usersRouter);
// table routes
app.use("/api/table", tableRouter)

// category routes
app.use("/api/category", categoryRouter)

// subCategory
app.use("/api/subCategory", SubCategoryRoutes)

// menuItem
app.use("/api/menuItem", MenuItemRouter)

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
