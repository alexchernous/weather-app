import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import constants from '../lib/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2)
  }
}));

const createRowData = (date, temp, minTemp, maxTemp, wind, desc) => {
  return { date, temp, minTemp, maxTemp, wind, desc };
};

const formatDate = (date) => {
  return (
    date.getDate()
    + ' ' +
    date.toLocaleString('default', { month: 'short' })
    + ', ' +
    date.toLocaleString('default', { hour12: true }).split(',')[1]
  );
};

const ForecastTable = (props) => {
  const { forecast, units } = props;
  const classes = useStyles();
  const forecastData = useMemo(() =>
    forecast.list ?
      forecast.list.map((time) =>
        createRowData(
          new Date((time.dt) * 1000),
          time.main.temp,
          time.main.temp_min,
          time.main.temp_max,
          time.wind.speed,
          time.weather[0].description)
      ) : [], [forecast]);

  return (
    <React.Fragment>
      <TableContainer className={classes.container} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {constants.forecastTableHeaders.map((title) => <TableCell key={title}>{title}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {forecastData && forecastData.map((row) => (
              <TableRow key={row.date}>
                <TableCell component='th' scope='row'>
                  {formatDate(row.date)}
                </TableCell>
                <TableCell>{row.temp + ' ' + constants.unitLabels[units].temp}</TableCell>
                <TableCell>{row.minTemp + ' ' + constants.unitLabels[units].temp}</TableCell>
                <TableCell>{row.maxTemp + ' ' + constants.unitLabels[units].temp}</TableCell>
                <TableCell>{row.wind + ' ' + constants.unitLabels[units].speed}</TableCell>
                <TableCell>{row.desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* TODO: pagination by date */}
    </React.Fragment>
  );
}

export default ForecastTable;
