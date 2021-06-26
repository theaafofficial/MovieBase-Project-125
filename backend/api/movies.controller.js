import moviesGET from "../moviesDB/moviesGET.js";

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.title) {
      filters.title = req.query.title;
    }

    const { moviesList, totalNumMovies } = await moviesGET.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };
    res.json(response);
  }

  static async apiPostMovie(req, res, next) {
    try {
      const title = req.body.title;
      const year = req.body.year;
      const plot = req.body.plot;
      const picture = req.body.picture;

      const MovieResponse = await moviesGET.addMovie(
        title,
        year,
        plot,
        picture
      );
      // console.log(MovieResponse)

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateMovie(req, res, next) {
    try {
      const moviewId = req.body._id;
      const title = req.body.title;
      const year = req.body.year;
      const plot = req.body.plot;
      const picture = req.body.picture;

      const reviewResponse = await moviesGET.updateMovie(
        moviewId,
        title,
        year,
        plot,
        picture
      );

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetMovieById(req, res, next) {
    try {
      let id = req.params.id || {}
      let resp = await moviesGET.getMovieByID(id)
      if (!resp) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(resp)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}
