import express from "express";
import moviesPATH from "./movies.controller.js";
import favPATH from "./favorite.controller.js"

const router = express.Router();

// router.route("/").get((req, res) => res.send("Hello World"))
router.route("/").get(moviesPATH.apiGetMovies);
router.route("/").post(moviesPATH.apiPostMovie);
router.route("/").put(moviesPATH.apiUpdateMovie);
router.route("/id/:id").get(moviesPATH.apiGetMovieById)
router.route("/fav").get(favPATH.apiGetfavorite);
router.route("/fav").post(favPATH.apiPostfavorite);

export default router;
