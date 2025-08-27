const express =require("express");
const expressLayout = require("express-ejs-layouts")
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use(express.static("public"));
app.use(expressLayout); 

app.set("view engine", "ejs");

const siteMiddleware = require("./middlewares/site-middleware");
app.use(siteMiddleware);
const loginRoutes = require('./routes/userRoutes/user.routes');
const adminRoutes = require("./routes/admin.routes"); 
const adminCategoryRouter = require("./routes/admin/categories.routes");
const adminProductRouter = require("./routes/admin/products.routes");
const adminOrderRouter = require("./routes/admin/seeorder.routes");
const MainPageroutes = require("./routes/admin/Mainpage.routes");
const addtoCart = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");



app.use("/", MainPageroutes);
app.use("/admin/products", adminProductRouter);
app.use("/admin/categories", adminCategoryRouter);
app.use("/admin/orders", adminOrderRouter);
app.use("/add-to-cart", addtoCart);
app.use("/order" , orderRouter);

app.use('/login', loginRoutes);
app.use("/admin", adminRoutes);


//Database Connection
const connectdb = require("./db");

const Port = 2000;

const start =async() =>{
    await connectdb();
    app.listen(Port, () =>{
        console.log(`Server started at localhost${Port}`);
    });
}

start();