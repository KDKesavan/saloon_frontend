import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './Component/Form';
import DataList from './Component/Datas';


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
      <Route exact path="/datas" render={() => (
        <div>
<DataList/>
        </div>
      )} />



    </Switch>
  </Router>

  )

}

export default App;
