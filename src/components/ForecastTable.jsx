import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TableContent from './TableContent';
import _ from 'lodash';
import constants from '../lib/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  }
}));

// Helper object building function
const createRowData = (day, month, formattedDate, temp, minTemp, maxTemp, wind, desc) => {
  return { day, month, displayContent: { formattedDate, temp, minTemp, maxTemp, wind, desc } };
};

const ForecastTable = (props) => {
  const { forecast, units } = props;
  const classes = useStyles();

  /**
   * Expensive forecast data processing.
   *
   * This is done for pagination.
   * Perhaps it could be done more efficiently,
   * where we load/process data only when the tab is selected,
   * this way the first page load is faster.
   *
   * Since we don't know if user will need/open forecasts
   * for later days, we might just be putting an
   * unnecessary load on the browser.
   *
   */
  const forecastData = useMemo(() =>
    // Async API; might not be fetched yet
    forecast.list ?
      // 'lodash' is awesome!
      _.groupBy(forecast.list.map((time) => {
        // Date processing
        var fullDate = new Date((time.dt) * 1000); // API returns data in seconds, need milliseconds for Date() object
        var day = fullDate.getDate();
        var month = fullDate.toLocaleString('default', { month: 'short' });
        var hour = fullDate.toLocaleString('default', { hour12: true }).split(',')[1];
        // Helper object building function
        return createRowData(
          // Tab label data
          day,
          month,
          // Building row content now for easier programmatic rendering later (TableContent.jsx:18)
          String(day + ' ' + month + ', ' + hour),
          String(time.main.temp + ' ' + constants.UNIT_LABELS[units].temp),
          String(time.main.temp_min + ' ' + constants.UNIT_LABELS[units].temp),
          String(time.main.temp_max + ' ' + constants.UNIT_LABELS[units].temp),
          String(time.wind.speed + ' ' + constants.UNIT_LABELS[units].speed),
          String(time.weather[0].description)
        )
      // Group by day
      }), (row) => row.day) : [],
    [forecast, units]
  );

  const days = Object.keys(forecastData);
  const [dayTab, setDay] = useState(days[0]);

  // Days tabs
  const renderDaysTabs = days.map((day) => (
    <Tab
      key={day}
      value={day}
      label={day + ' ' + forecastData[day][0].month}
    />
  ));

  // Headers for table
  const renderTableHeaders = constants.FORECAST_HEADERS.map((header) => (
    <TableCell
      className={classes.columns}
      key={header}
      style={{ 'fontWeight': '600' }}
    >
      {header}
    </TableCell>
  ));

  const handleTabSwitch = (event, day) => {
    setDay(day);
  };

  return (
    <React.Fragment>
      <TableContainer className={classes.container} component={Paper}>

        {/* Scrollable tabs */}
        <AppBar position='static' color='default'>
          <Tabs
            value={dayTab}
            onChange={handleTabSwitch}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable day tabs'
          >

            {/* Render day tabs programmatically */}
            {renderDaysTabs}
          </Tabs>
        </AppBar>

        {/* Forecast table */}
        <Table aria-label='forecast table'>
          <TableHead>
            <TableRow>

              {/* Render table headers programmatically */}
              {renderTableHeaders}
            </TableRow>
          </TableHead>

          {/* Forecast data for particular day */}
          <TableContent dayForecast={forecastData[dayTab]} />
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ForecastTable;
