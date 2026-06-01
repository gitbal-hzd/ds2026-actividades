import { NavigationBar } from './components/Layout/NavigationBar';
import { MainFooter } from './components/Layout/MainFooter';
import { Home } from './pages/Home';

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <NavigationBar />
      <Home />
      <MainFooter />
    </div>
  );
}