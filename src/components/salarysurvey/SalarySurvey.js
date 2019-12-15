import React from 'react';
import TextField from '@material-ui/core/TextField';
import './SalarySurvey.css';
import Typography from '@material-ui/core/Typography';

class SalarySuvery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="SalarySurvey">
                <form id="SalarySurveyForm">
                    <Typography variant="subtitle1" gutterBottom>
                        Indtast din gennemsnitlige månedsløn:
                        </Typography>
                    <TextField required id="salary" label="Løn"/>
                </form>
            </div>
        );
    }
}

export default SalarySuvery;

