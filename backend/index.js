import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import moviesGET from "./moviesDB/moviesGET.js";
import favGET from "./moviesDB/favGET.js";
// import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.MOVIES_DB_URI, {
  poolSize: 30, //how many users
  wtimeout: 5000, //miliseconds before timeout
  // useNewUrlParse: true,
  // useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await moviesGET.injectDB(client);
    await favGET.injectDB(client);
    // await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
