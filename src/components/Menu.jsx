import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const Menu = (props) => {
  return (
    <React.Fragment>
      <InputLabel id='demo-simple-select-outlined-label'>{props.title}</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={props.value}
        onChange={props.handleChange}
        label={props.title}
      >
        {props.menuOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
}

export default Menu;
