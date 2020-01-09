import React from 'react';
import TextField from '@material-ui/core/TextField';
import './SalarySurvey.css';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import loading from '../../assets/loading.gif';
import Button from '@material-ui/core/Button';

class SalarySuvery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false, gender:"", sektor:""}
    }

    handleChange = name => event => {
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
      };

    handleSubmit(event) {
          console.log("Submitted!");
          console.log(event);
          event.preventDefault();

          const {gender, age, area, sektor, enhed, indkomst, uddannelse, uddannelsesniveau, arbejdsfunktion } = this.state;
          
      }

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

        await fetch("https://api.statbank.dk/v1/tableinfo/LONS30?format=JSON")
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

        await fetch("https://api.statbank.dk/v1/tableinfo/LONS11?format=JSON")
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

        await fetch("https://api.statbank.dk/v1/tableinfo/INDKP107?format=JSON")
        .then(res => res.json())
        .then(
            (result) => {
                temp = result.variables;
                for (var res in temp) {
                    var id = temp[res].id;
                    if (id === "OMRÅDE") {
                        continue;
                    }
                    var values = temp[res].values;
                    this.setState({[id]: values})
                }
            }
        )

        this.setState({loaded: true});
        console.log(this.state);

    }

    render() {

        if (!this.state.loaded) {
            return(
                <img className="loading survey" src={loading} alt="loading..."></img>
            );
        }

        return(
            <div className="SalarySurvey">
                <form id="SalarySurveyForm" onSubmit={this.handleSubmit} >
                    <Typography variant="subtitle1" gutterBottom>
                        Sammenlign dig selv mod gennemsnittet:
                        </Typography>
                    <TextField required id="salary" label="Indtast din løn"/>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="gender-native-simple">Køn</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.gender}
                        onChange={this.handleChange('gender')}
                        inputProps={{name: "gender", id:"gender-native-simple"}}>
                            {this.state["KØN"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>
                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="age-native-simple">Alder</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.age}
                        onChange={this.handleChange('age')}
                        inputProps={{name: "age", id:"age-native-simple"}}>
                            {this.state["ALDER1"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="area-native-simple">Område</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.area}
                        onChange={this.handleChange('area')}
                        inputProps={{name: "area", id:"area-native-simple"}}>
                            {this.state["OMRÅDE"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="sektor-native-simple">Sektor</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.sektor}
                        onChange={this.handleChange('sektor')}
                        inputProps={{name: "sektor", id:"sektor-native-simple"}}>
                            {this.state["SEKTOR"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="enhed-native-simple">Enhed</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.enhed}
                        onChange={this.handleChange('enhed')}
                        inputProps={{name: "enhed", id:"enhed-native-simple"}}>
                            {this.state["ENHED"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="indkomst-native-simple">Indkomsttype</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.indkomst}
                        onChange={this.handleChange('indkomst')}
                        inputProps={{name: "indkomst", id:"indkomst-native-simple"}}>
                            {this.state["INDKOMSTTYPE"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="uddannelse-native-simple">Uddannelse</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.uddannelse}
                        onChange={this.handleChange('uddannelse')}
                        inputProps={{name: "uddannelse", id:"uddannelse-native-simple"}}>
                            {this.state["UDDANNELSE"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>

                    <div className="selectItemSurvey">
                        <InputLabel required htmlFor="uddannelsesniveua-native-simple">Uddannelsesniveau</InputLabel>
                        <NativeSelect style={{minWidth: 200}}
                        native 
                        value={this.state.uddannelsesniveau}
                        onChange={this.handleChange('uddannelsesniveau')}
                        inputProps={{name: "uddannelsesniveau", id:"uddannelsesniveau-native-simple"}}>
                            {this.state["UDDNIV"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>

                    
                    <div className="selectItemSurvey">
                        <InputLabel required className="arbejdsfunktion" htmlFor="arbejdsfunktion-native-simple">Arbejdsfunktion</InputLabel>
                        <NativeSelect
                        native 
                        value={this.state.arbejdsfunktion}
                        onChange={this.handleChange('arbejdsfunktion')}
                        inputProps={{name: "arbejdsfunktion", id:"arbejdsfunktion-native-simple"}}>
                            {this.state["ARBF"].map((i) =>
                            <option value={i.id}>{i.text}</option>
                            )}
                        </NativeSelect>
                    </div>
                    <br/>
                    <br/>
                    <Button type="submit" className="sammenlign" variant="contained" color="primary">Sammenlign</Button>
                </form>
            </div>
        );
    }
}

export default SalarySuvery;

