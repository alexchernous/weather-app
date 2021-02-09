import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import constants from '../lib/constants';
import { CtoF, CtoK, MSECtoMPH } from '../lib/util';

const ComfortableWeather = (props) => {
  const { units } = props;
  var minTemp = constants.MIN_TEMP,
      maxTemp = constants.MAX_TEMP,
      maxWind = constants.MAX_WIND;

  if (units === constants.UNITS.IMPERIAL) {
    minTemp = CtoF(minTemp);
    maxTemp = CtoF(maxTemp);
    maxWind = MSECtoMPH(maxWind);
  } else if (units === constants.UNITS.STANDARD) {
    minTemp = CtoK(minTemp);
    maxTemp = CtoK(maxTemp);
  }

  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={'˅'}
          aria-controls='accordion-content'
          id='accordion2-header'
        >
          <strong>What is comfortable weather?</strong>
        </AccordionSummary>
        <AccordionDetails>

          {/* Raw text content could be handled better... */}
          <div>
            <p>
              Although I'm a web app with Canadian biases... <br></br>
              I'd say that the following metrics are what humans in Canada <br></br>
              might consider <q>comfortable</q> with appropriate clothing:
            </p>
            <ul>
              <li>temperature in the range of
                <strong> {minTemp} {constants.UNIT_LABELS[units].temp} </strong>
                to <strong>{maxTemp} {constants.UNIT_LABELS[units].temp}</strong>
              </li>
              <li>wind up to
                <strong> {maxWind} {constants.UNIT_LABELS[units].speed}</strong>
              </li>
              <li>humidity in the range of
                <strong> {constants.MIN_HUMIDITY}%</strong> to
                <strong> {constants.MAX_HUMIDITY}%</strong>
              </li>
            </ul>
            <p>
              But these are just estimates; you'll have your own preferences.
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}

export default ComfortableWeather;
