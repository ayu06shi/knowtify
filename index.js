// // Importing necessary modules and packages
// const express = require("express");
// const app = express();
// const userRoutes = require("./routes/user");
// const profileRoutes = require("./routes/profile");
// const courseRoutes = require("./routes/Course");
// const paymentRoutes = require("./routes/Payments");
// const contactUsRoute = require("./routes/Contact");
// const cartRoute = require("./routes/Cart");
// const noteRoutes = require("./routes/Notes")
// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");
// const http = require("http")
// const { Server } = require("socket.io");
// const setupSocket = require("./socket/socketManager");

// const server = http.createServer(app);
// const io = new Server(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: [ "GET", "POST "]
// 	},
// });

// // Loading environment variables from .env file
// dotenv.config();

// // Setting up port number
// const PORT = process.env.PORT || 4000;

// // Connecting to database
// database.connect();
 
// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
// 	cors({
// 		origin: "*",
// 		credentials: true,
// 	})
// );
// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: "/tmp/",
// 	})
// );

// // Connecting to cloudinary
// cloudinaryConnect();

// // Setting up routes
// app.use("/auth", userRoutes);
// app.use("/profile", profileRoutes);
// app.use("/course", courseRoutes);
// app.use("/payment", paymentRoutes);
// app.use("/reach", contactUsRoute);
// app.use("/cart", cartRoute);
// app.use("/notes", noteRoutes)

// // Testing the server
// app.get("/", (req, res) => {
// 	return res.json({
// 		success: true,
// 		message: "Your server is up and running ...",
// 	});
// });

// // Setting Socket.io
// setupSocket(io);

// // Listening to the server
// app.listen(PORT, () => {
// 	console.log(`App is listening at ${PORT}`);
// });

// // End of code.

// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const cartRoute = require("./routes/Cart");
const noteRoutes = require("./routes/Notes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const setupSocket = require("./socket/socketManager");

// Load environment variables
dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Change this to your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Use JSON and cookie parsers
app.use(express.json());
app.use(cookieParser());

// File upload configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect to the database
database.connect();

// Connect to Cloudinary
cloudinaryConnect();

// Setup Socket.IO with CORS settings
const io = new Server(server, {
  cors: corsOptions,
});

// Initialize Socket.IO handlers
setupSocket(io);

// Routes
app.use("/auth", userRoutes);
app.use("/profile", profileRoutes);
app.use("/course", courseRoutes);
app.use("/payment", paymentRoutes);
app.use("/reach", contactUsRoute);
app.use("/cart", cartRoute);
app.use("/notes", noteRoutes);

// Health check route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
