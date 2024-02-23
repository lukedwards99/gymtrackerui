-- Insert into ExerciseType Table
INSERT INTO ExerciseType (type_of_movement) VALUES
('machine'),
('bodyweight'),
('free weight');

-- Insert into Exercise Table
INSERT INTO Exercise (exercise_name, exercise_type_id, manufacturer, comments) VALUES
('Leg Press', 1, 'Life Fitness', 'Adjust seat to align knees properly'),
('Push-up', 2, NULL, 'No equipment required'),
('Dumbbell Curl', 3, NULL, 'Can vary grip for different emphasis');

-- Insert into Workout Table
INSERT INTO Workout (workout_time) VALUES
('2024-02-21 07:00:00'),
('2024-02-22 07:00:00');

-- Insert into WorkoutExerciseSelection Table
INSERT INTO WorkoutExerciseSelection (workout_id, exercise_name, reps, difficulty_score, perceived_stimulation_score) VALUES
(1, 'Leg Press', 10, 5, 7),
(1, 'Dumbbell Curl', 12, 4, 6),
(2, 'Push-up', 20, 5, 8);
