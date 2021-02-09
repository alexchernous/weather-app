import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { weatherAnalysis } from '../lib/util';

const WeatherAnalysis = (props) => {
  const { units, temp, wind, humidity } = props;

  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={'˅'}
          aria-controls='accordion-content'
          id='accordion3-header'
        >
          <strong>So is it nice out?</strong>
        </AccordionSummary>
        <AccordionDetails>

          {/* Raw text content could be handled better... */}
          <p>
            I did a bit of number crunching,
            and according to my AI biases:
            <br></br><br></br>
            <strong style={{ color: 'blue' }}>

              {/* A bit of weather analysis "AI" */}
              {weatherAnalysis(units, temp, wind, humidity)}
            </strong>
          </p>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}

export default WeatherAnalysis;
