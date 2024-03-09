import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workout from './pages/workout/Workout';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProgramOverview from './pages/program/ProgramOverview';
import WorkoutTypeEdit from './pages/workout/WorkoutTypeEdit';
import ExerciseTypeEdit from './pages/exercise/ExerciseTypeEdit';

function App() {

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <div className="App">
      <div className="App">

        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<ProgramOverview />} />
              <Route path="/workout/:id" element={<Workout />} />
              <Route path="/workoutTypeEdit" element={<WorkoutTypeEdit />} />
              <Route path="/exerciseTypeEdit" element={<ExerciseTypeEdit />} />
              <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
