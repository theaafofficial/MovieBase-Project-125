import favGET from "../moviesDB/favGET.js";

export default class favoriteController {
  static async apiGetfavorite(req, res, next) {
    const favoritePerPage = req.query.favoritePerPage
      ? parseInt(req.query.favoritePerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.title) {
      filters.title = req.query.title;
    }

    const { favoriteList, totalNumfavorite } = await favGET.getFavorite({
      filters,
      page,
      favoritePerPage,
    });

    let response = {
        favorite: favoriteList,
      page: page,
      filters: filters,
      entries_per_page: favoritePerPage,
      total_results: totalNumfavorite,
    };
    res.json(response);
  }

  static async apiPostfavorite(req, res, next) {
    try {
      const title = req.body.title;
      const year = req.body.year;
      const plot = req.body.plot;
      const picture = req.body.picture;

      const favoriteResponse = await favGET.addfavorite(
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

//   static async apiUpdateMovie(req, res, next) {
//     try {
//       const moviewId = req.body._id;
//       const title = req.body.title;
//       const year = req.body.year;
//       const plot = req.body.plot;
//       const picture = req.body.picture;

//       const reviewResponse = await moviesGET.updateMovie(
//         moviewId,
//         title,
//         year,
//         plot,
//         picture
//       );

//       var { error } = reviewResponse;
//       if (error) {
//         res.status(400).json({ error });
//       }

//       if (reviewResponse.modifiedCount === 0) {
//         throw new Error(
//           "unable to update review - user may not be original poster"
//         );
//       }

//       res.json({ status: "success" });
//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }
//   }

//   static async apiGetMovieById(req, res, next) {
//     try {
//       let id = req.params.id || {}
//       let resp = await moviesGET.getMovieByID(id)
//       if (!resp) {
//         res.status(404).json({ error: "Not found" })
//         return
//       }
//       res.json(resp)
//     } catch (e) {
//       console.log(`api, ${e}`)
//       res.status(500).json({ error: e })
//     }
//   }
}
