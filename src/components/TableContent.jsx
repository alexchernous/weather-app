import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  columns: {
    paddingRight: theme.spacing(5),
  }
}));

const TableContent = (props) => {
  const { dayForecast } = props;
  const classes = useStyles();

  // Cell contents
  const renderCellContent = (row) => Object.keys(row.displayContent).map((cell) => (
    <TableCell
      key={cell}
      className={classes.columns}
      component='th'
      scope='row'
    >
      {row.displayContent[cell]}
    </TableCell>
  ));

  // Weather rows
  const renderWeatherRows = dayForecast.map((row) => (
    <TableRow key={row.day + Math.random()}>

      {/* Render cell content programmatically */}
      {renderCellContent(row)}
    </TableRow>
  ));

  return (
    <React.Fragment>
      <TableBody>

        {/* Render weather rows programmatically */}
        {dayForecast && renderWeatherRows}
      </TableBody>
    </React.Fragment>
  );
}

export default TableContent;
