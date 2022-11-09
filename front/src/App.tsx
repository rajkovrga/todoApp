import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import AppRouter from './layouts/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
          <AppRouter />
          <Footer />
      </Provider>
    );
  }
}

export default App;