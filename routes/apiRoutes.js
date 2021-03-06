const db = require("../models");

module.exports = (app) => {

  //get workout plan
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  //Add exercises to a workout plan
  app.put("/api/workouts/:id", (req, res) => {
    console.log("exercise put route", req.body);
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body }},
      { new: true },    
    )
      .then(dbWorkout => {
        console.log("dbWorkout", dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  //create workout
  app.post("/api/workouts", (req, res) => {
    console.log("body post route", req.body);
    db.Workout.create(req.body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  //get workouts range
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(5)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

};