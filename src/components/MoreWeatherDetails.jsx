import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import constants from '../lib/constants';

const MoreWeatherDetails = (props) => {
  const { units, temp, feelsLike, wind, humidity } = props;

  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={'˅'}
          aria-controls='accordion-content'
          id='accordion1-header'
        >
          <strong>I need a bit more details for today</strong>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <p>
              Sometimes plain temperature numbers and wind speeds can
              be confusing.<br></br>
              Afterall, we're human! (except me, I'm just a web app)<br></br>
              Here's the summary:
            </p>
            <ul>
              <li>temperature today is
                <strong> {temp} {constants.UNIT_LABELS[units].temp}</strong>
              </li>
              <li>wind is
                <strong> {wind} {constants.UNIT_LABELS[units].speed}</strong>
              </li>
              <li>humidity is
                <strong> {humidity}%</strong>
              </li>
            </ul>
            <p>
              All that (plus a bit of magic) amounts to roughly
              <strong> {feelsLike} {constants.UNIT_LABELS[units].temp} </strong>
              <q>true</q> temperature.
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}

export default MoreWeatherDetails;
