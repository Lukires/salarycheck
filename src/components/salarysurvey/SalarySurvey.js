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
        this.state = { loaded: false, gender: "", sektor: "", survey: true };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    async handleSubmit(event) {
        console.log("Submitted!");
        console.log(event.target);
        event.preventDefault();

        this.setState({loaded: false});

        //const { gender, age, area, sektor, enhed, indkomst, uddannelse, uddannelsesniveau, arbejdsfunktion } = this.state;
        //console.log(this.state);

        //https://api.statbank.dk/v1/data/LONS11/JSONSTAT?valuePresentation=CodeAndValue&timeOrder=Ascending&UDDANNELSE=TOT&SEKTOR=1000&AFLOEN=TIFA&LONGRP=LTOT&L%C3%98NM%C3%85L=FORINKL&K%C3%98N=MOK&Tid=2015
        //LONS11
        //UDDANNELSE < YES
        //SEKTOR < YES
        //AFLØNNINGSFORM < 0
        //LØNMODTAGERGRUPPE < 0
        //LØNKOMPONENTER < 0
        //KØN < YES
        //ÅR < 2018

        //UDDANNELSE
        await fetch("https://api.statbank.dk/v1/data/LONS11/JSONSTAT?valuePresentation=CodeAndValue&timeOrder=Ascending&UDDANNELSE=" + this.state["uddannelse"] + "&SEKTOR=" + this.state.sektor + "&AFLOEN=TIFA&LONGRP=LTOT&L%C3%98NM%C3%85L=FORINKL&K%C3%98N=" + this.state["gender"] + "&Tid=2018")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ LONS11: result.dataset.value });
                }
            )

        //OMRÅDE
        await fetch("https://api.statbank.dk/v1/data/LONS30/JSONSTAT?valuePresentation=CodeAndValue&timeOrder=Ascending&OMR%C3%85DE=" + this.state["area"] + "&SEKTOR=" + this.state.sektor + "&AFLOEN=TIFA&LONGRP=LTOT&L%C3%98NM%C3%85L=FORINKL&K%C3%98N=" + this.state["gender"] + "&Tid=2018")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ LONS30: result.dataset.value });
                }
            )

        //ALDER
        await fetch("https://api.statbank.dk/v1/data/LONS50/JSONSTAT?valuePresentation=CodeAndValue&timeOrder=Ascending&ALDER1=" + this.state.age + "&SEKTOR=" + this.state.sektor + "&AFLOEN=TIFA&LONGRP=LTOT&L%C3%98NM%C3%85L=FORINKL&K%C3%98N=" + this.state["gender"] + "&Tid=2018")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ LONS50: result.dataset.value });
                }
            )

        //ARBEJDSFUNKTION
        await fetch("https://api.statbank.dk/v1/data/LONS20/JSONSTAT?valuePresentation=CodeAndValue&timeOrder=Ascending&ARBF=" + this.state.arbejdsfunktion + "&SEKTOR=" + this.state.sektor + "&AFLOEN=TIFA&LONGRP=LTOT&L%C3%98NM%C3%85L=FORINKL&K%C3%98N=" + this.state["gender"] + "&Tid=2018")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ LONS50: result.dataset.value });
                }
            )

        await fetch("https://api.statbank.dk/v1/data/INDKP107/JSONSTAT?valuePresentation=CodeAndValue&timeOrder=Ascending&OMR%C3%85DE=" + this.state.area + "&ENHED=121&KOEN=MOK&UDDNIV=" + this.state.uddannelsesniveau + "&INDKOMSTTYPE=115&TID=2018")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ INDKP107: result.dataset.value });
                }
            )

        //OMRÅDE & UDDNIV

        console.log("done");
        this.setState({loaded: true, survey: false});
        console.log(this.state);


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
                        this.setState({ [id]: values })
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
                        this.setState({ [id]: values })
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
                        this.setState({ [id]: values })
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
                        this.setState({ [id]: values })
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
                        this.setState({ [id]: values })
                    }
                }
            )

        this.setState({ loaded: true, gender: this.state["KØN"][0].id, age: this.state["ALDER1"][0].id, area: this.state["OMRÅDE"][0].id, sektor: this.state["SEKTOR"][0].id, enhed: this.state["ENHED"][0].id, indkomst: this.state["INDKOMSTTYPE"][0].id, uddannelse: this.state["UDDANNELSE"][0].id, uddannelsesniveau: this.state["UDDNIV"][0].id, arbejdsfunktion: this.state["ARBF"][0].id });
        console.log(this.state);

    }

    render() {

        if (!this.state.loaded) {
            return (
                <img className="loading survey" src={loading} alt="loading..."></img>
            );
        }

        if (this.state.survey) {
            return (
                <div className="SalarySurvey">
                    <form id="SalarySurveyForm" onSubmit={this.handleSubmit} >
                        <Typography variant="subtitle1" gutterBottom>
                            Sammenlign dig selv mod gennemsnittet:
                            </Typography>
                        <TextField required id="salary" label="Indtast din månedlige løn" onChange={this.handleChange('salary')} />
                        <br/>
                        <br/>
                        <TextField required id="hours" label="Månedlige timers arbejde" onChange={this.handleChange('hours')}/>

                        <div className="selectItemSurvey">
                            <InputLabel required htmlFor="gender-native-simple">Køn</InputLabel>
                            <NativeSelect style={{ minWidth: 200 }}
                                native
                                value={this.state.gender}
                                onChange={this.handleChange('gender')}
                                inputProps={{ name: "gender", id: "gender-native-simple" }}>
                                {this.state["KØN"].map((i) =>
                                    <option value={i.id}>{i.text}</option>
                                )}
                            </NativeSelect>
                        </div>
                        <div className="selectItemSurvey">
                            <InputLabel required htmlFor="age-native-simple">Alder</InputLabel>
                            <NativeSelect style={{ minWidth: 200 }}
                                native
                                value={this.state.age}
                                onChange={this.handleChange('age')}
                                inputProps={{ name: "age", id: "age-native-simple" }}>
                                {this.state["ALDER1"].map((i) =>
                                    <option value={i.id}>{i.text}</option>
                                )}
                            </NativeSelect>
                        </div>

                        <div className="selectItemSurvey">
                            <InputLabel required htmlFor="area-native-simple">Område</InputLabel>
                            <NativeSelect style={{ minWidth: 200 }}
                                native
                                value={this.state.area}
                                onChange={this.handleChange('area')}
                                inputProps={{ name: "area", id: "area-native-simple" }}>
                                {this.state["OMRÅDE"].map((i) =>
                                    <option value={i.id}>{i.text}</option>
                                )}
                            </NativeSelect>
                        </div>

                        <div className="selectItemSurvey">
                            <InputLabel required htmlFor="sektor-native-simple">Sektor</InputLabel>
                            <NativeSelect style={{ minWidth: 200 }}
                                native
                                value={this.state.sektor}
                                onChange={this.handleChange('sektor')}
                                inputProps={{ name: "sektor", id: "sektor-native-simple" }}>
                                {this.state["SEKTOR"].map((i) =>
                                    <option value={i.id}>{i.text}</option>
                                )}
                            </NativeSelect>
                        </div>

                        {/* <div className="selectItemSurvey">
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
            </div>*/}

                        <div className="selectItemSurvey">
                            <InputLabel required htmlFor="uddannelse-native-simple">Uddannelse</InputLabel>
                            <NativeSelect style={{ minWidth: 200 }}
                                native
                                value={this.state.uddannelse}
                                onChange={this.handleChange('uddannelse')}
                                inputProps={{ name: "uddannelse", id: "uddannelse-native-simple" }}>
                                {this.state["UDDANNELSE"].map((i) =>
                                    <option value={i.id}>{i.text}</option>
                                )}
                            </NativeSelect>
                        </div>

                        <div className="selectItemSurvey">
                            <InputLabel required htmlFor="uddannelsesniveua-native-simple">Uddannelsesniveau</InputLabel>
                            <NativeSelect style={{ minWidth: 200 }}
                                native
                                value={this.state.uddannelsesniveau}
                                onChange={this.handleChange('uddannelsesniveau')}
                                inputProps={{ name: "uddannelsesniveau", id: "uddannelsesniveau-native-simple" }}>
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
                                inputProps={{ name: "arbejdsfunktion", id: "arbejdsfunktion-native-simple" }}>
                                {this.state["ARBF"].map((i) =>
                                    <option value={i.id}>{i.text}</option>
                                )}
                            </NativeSelect>
                        </div>
                        <br />
                        <br />
                        <Button type="submit" className="sammenlign" variant="contained" color="primary">Sammenlign</Button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Hello!</p>
                </div>
            );
        }
    }
}

export default SalarySuvery;

