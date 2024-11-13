import { useDynEras } from "./hooks/useDynEras";
import { Router } from "./router/Router";

function App() {
  useDynEras();

  return <Router />;
}

export default App;
