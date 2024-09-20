import logo from './logo.svg';
import './App.css';
import { MyCard } from './components/MyCard';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
              <MyCard />
      </header>
    </div>
  );
}

export default App;