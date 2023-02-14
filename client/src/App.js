import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row min-vh-100">
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
