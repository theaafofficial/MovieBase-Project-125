import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let favorites;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (favorites) {
      return;
    }
    try {
      favorites = await conn.db(process.env.MOVIES_NS).collection("favorites");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  }

  static async getFavorite({
    filters = null,
    page = 0,
    favoritePerPage = 20,
  } = {}) {
    let query; 
      let cursor;

      try {
        cursor = await favorites.find()
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`);
        return { favoriteList: [], totalNumfavorite: 0 };
      }

      const displayCursor = cursor
        .limit(favoritePerPage)
        .skip(favoritePerPage * page);

      try {
        const favoriteList = await displayCursor.toArray();
        const totalNumfavorite = await favorites.countDocuments(query);

        return { favoriteList, totalNumfavorite };
      } catch (e) {
        console.error(
          `Unable to convert cursor to array or problem counting documents, ${e}`
        );
        return { favoriteList: [], totalNumfavorite: 0 };
      }
    }
  

  static async addfavorite(title,plot,year,picture) {
    try {
      //   let movie = new Movie();
      //   movie.title = title;
      //  movie.year = year;
      //  movie.plot = plot;
      //  movie.picture = picture;
      //  await movie.save();
      const favorite = { title:title,
        plot:plot,
        year:year,
        picture:picture };
      return await favorites.insertOne(favorite);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
//   static async updateMovie(movieId, title, year, plot, picture) {
//     try {
//       const movie = { title: title, year: year, plot: plot, picture: picture };
//       const updateResponse = await movies.updateOne(
//         { _id: ObjectId(movieId) },
//         { $set: { movie } }
//       );

//       return updateResponse;
//     } catch (e) {
//       console.error(`Unable to update review: ${e}`);
//       return { error: e };
//     }
//   }
//   static async getMovieByID(id) {
//     try {
//       let o_id = new ObjectId(id);
//       let displayCursor = movies.find({ _id: o_id });
//       const moviesList = await displayCursor.toArray();
//       return moviesList
//     } catch (e) {
//       console.error(`Something went wrong in getRestaurantByID: ${e}`);
//       throw e;
//     }
//   }
}
