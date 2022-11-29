import React from 'react';
import './App.css';
import Footer from './layouts/Footer';
import AppRouter from './layouts/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
      <>
        <AppRouter />
        <Footer />
      </>
    );
}

export default App;