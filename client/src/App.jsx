import AppRoutes from './routes/AppRoutes';
import useObserveAuth from './hooks/useObserveAuth';

function App() {
  useObserveAuth();

  return <AppRoutes />;
}

export default App;
