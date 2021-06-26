import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let movies;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }
    try {
      movies = await conn.db(process.env.MOVIES_NS).collection("moviesdb");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("id" in filters) {
        query = { _id: { $search: filters["_id"] } };
      }

      let cursor;

      try {
        cursor = await movies.find(query);
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`);
        return { moviesList: [], totalNumMovies: 0 };
      }

      const displayCursor = cursor
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      try {
        const moviesList = await displayCursor.toArray();
        const totalNumMovies = await movies.countDocuments(query);

        return { moviesList, totalNumMovies };
      } catch (e) {
        console.error(
          `Unable to convert cursor to array or problem counting documents, ${e}`
        );
        return { moviesList: [], totalNumMovies: 0 };
      }
    }
  }

  static async addMovie(title, year, plot, picture) {
    try {
      //   let movie = new Movie();
      //   movie.title = title;
      //  movie.year = year;
      //  movie.plot = plot;
      //  movie.picture = picture;
      //  await movie.save();
      const movie = { title: title, year: year, plot: plot, picture: picture };
      return await movies.insertOne(movie);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
  static async updateMovie(movieId, title, year, plot, picture) {
    try {
      const movie = { title: title, year: year, plot: plot, picture: picture };
      const updateResponse = await movies.updateOne(
        { _id: ObjectId(movieId) },
        { $set: { movie } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }
  static async getMovieByID(id) {
    try {
      let o_id = new ObjectId(id);
      let displayCursor = movies.find({ _id: o_id });
      const moviesList = await displayCursor.toArray();
      return moviesList
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }
}
