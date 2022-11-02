import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import AppRouter from './layouts/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import token from './store/token';

class App extends React.Component {

  render() {
    return (
      <>
        <Provider store={token}>
          <AppRouter />
          <Footer />
        </Provider>
      </>
    );
  }
}

export default App;