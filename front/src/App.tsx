import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import AppRouter from './layouts/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  render()
  {
    return (
      <div>
        <AppRouter />
        <Footer />
      </div>
    );
  }
}

export default App;