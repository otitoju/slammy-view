require('dotenv').config();
import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Logger } from "./utils/Logger";
import config from "./utils/config";
import routes from "./routes/routes";
import cors from "cors";

const PORT = process.env.PORT || 9000;
import path from 'path';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);

// app.get("/", (req, res) => {
//   res.send("<h1>SlammyPhotography Server</h1>");
// });

app.use(express.static(path.join(__dirname, '../client/dist/client')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/client', 'index.html'));
});


app.listen(PORT, () => {
  mongoose.connect(config.ONLINE_DATABASE);
  Logger("APP LISTENER", `Server started on port ${PORT}`)
});

//const uri = `mongodb+srv://${config.db_username}:${config.password}@${config.cluster}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
