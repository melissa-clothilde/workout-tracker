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
    console.log(req);
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercise: res.body }},
      { new: true },    
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  //create workout
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
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