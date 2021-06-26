import mongoose from "mongoose"

import express from "express"


//Schema
var moviesSchema = mongoose.Schema({
  
    title: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      plot: {
        type: String,
        required: true,
      },
      
      picture: {
        type: String,
        required: true,
      },
    

},
{ collection: "moviesdb" });

//Model
var Movie =  mongoose.model("Movie", moviesSchema);

//Hapi Joi Validation
// function validateMovie(data) {
//  const schema = Joi.object({
//    title: Joi.string().min(3).max(100).required(),
//     year: Joi.number().min(0).required(),
//     plot: Joi.string().min(3).max(5000).required(),
//     picture:Joi.string().min(3).max(200).required(),
//   });
//   return schema.validate(data, { abortEarly: false });
// }



export default Movie