import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './Component/Form';


function App() {
  return(
  <Router>
    <Switch>
      <Route exact path="/" render={() => (
        <div>
          <FormPage />
        </div>
      )}
      />
      {/* <Route exact path="/home" render={() => (
        <div>

        </div>
      )} /> */}



    </Switch>
  </Router>

  )

}

export default App;
