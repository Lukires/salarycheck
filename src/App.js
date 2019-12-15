import React from 'react';
import './App.css';
import SalarySuvery from './components/salarysurvey/SalarySurvey';
import SalaryResults from './components/salarysurvey/SalaryResults';
import Paper from '@material-ui/core/Paper';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {results:""};
  }

  getBody() {
    if (this.state.results === "") {
      return <SalarySuvery/>
    }
    return <SalaryResults/>
  }

  render() {
    return (
    <div className="App">
      <h1 className="Title">Sammenlign din løn</h1>
      <div className="Body">
        <Paper elevation={6}>
          {this.getBody()}
        </Paper>
      </div>
    </div>
    );
  }
}

export default App;
