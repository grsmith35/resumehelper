import logo from './logo.svg';
import './App.css';
import Resume from './pages/Resume';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="">
      <Nav></Nav>
      <main>
        <Resume></Resume>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
