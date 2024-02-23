import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workout from './pages/workout/Workout';
import WorkoutOverview from './pages/workout/WorkoutOverview';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
              <Route path="/" element={<WorkoutOverview />} />
              <Route path="/workout/:id" element={<Workout />} />
              <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
