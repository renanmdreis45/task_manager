import { GlobalProvider } from './context/GlobalProvider';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  );
}

export default App;
