import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const Menu = (props) => {
  const { title, value, handleChange, menuOptions } = props;

  // Menu items
  const renderMenuItems = menuOptions.map((option) => (
    <MenuItem
      key={option.value}
      value={option.value}
    >
      {option.name}
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <InputLabel id='select-input-label'>{title}</InputLabel>
      <Select
        labelId='select-label'
        id='select'
        value={value}
        onChange={handleChange}
        label={title}
      >

        {/* Render menu options programmatically */}
        {menuOptions && renderMenuItems}
      </Select>
    </React.Fragment>
  );
}

export default Menu;
