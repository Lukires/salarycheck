import React from 'react';
import TextField from '@material-ui/core/TextField';
import './SalarySurvey.css';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import loading from '../../assets/loading.gif';

class SalarySuvery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false, gender:""}
    }

    handleChange = name => event => {
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
      };
    
    
    async componentDidMount() {

         var temp;

        await fetch("https://api.statbank.dk/v1/tableinfo/LONS20?format=JSON")
        .then(res => res.json())
        .then(
            (result) => {
                temp = result.variables;
                for (var res in temp) {
                    var id = temp[res].id;
                    var values = temp[res].values;
                    this.setState({[id]: values})
                }
            }
            
        )

        await fetch("https://api.statbank.dk/v1/tableinfo/LONS50?format=JSON")
        .then(res => res.json())
        .then(
            (result) => {
                temp = result.variables;
                for (var res in temp) {
                    var id = temp[res].id;
                    var values = temp[res].values;
                    this.setState({[id]: values})
                }
            }
            
        )

        this.setState({loaded: true});

    }

    render() {

        if (!this.state.loaded) {
            return(
                <img className="loading survey" src={loading} alt="loading..."></img>
            );
        }

        return(
            <div className="SalarySurvey">
                <form id="SalarySurveyForm" >
                    <Typography variant="subtitle1" gutterBottom>
                        Indtast din gennemsnitlige månedsløn:
                        </Typography>
                    <TextField required id="salary" label="Løn"/>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="gender-native-simple">Køn</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.gender}
                        onChange={this.handleChange('gender')}
                        inputProps={{name: "Gender", id:"gender-native-simple"}}>
                            {this.state["KØN"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>
                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="age-native-simple">Alder</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.gender}
                        onChange={this.handleChange('gender')}
                        inputProps={{name: "Gender", id:"age-native-simple"}}>
                            {this.state["ALDER1"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>
                </form>
            </div>
        );
    }
}

export default SalarySuvery;

