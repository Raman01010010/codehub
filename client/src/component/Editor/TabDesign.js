// CenteredTabs.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';

function CenteredTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'text.primary' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab onClick={() => props.set(0)} style={{ color: 'white' }} label={<AccountTreeIcon style={{ fontSize: '7vh' }} />} />
        <Tab onClick={() => props.set(1)} style={{ color: 'white' }} label={<KeyboardAltIcon style={{ fontSize: '7vh' }} className="mr-2 " />} />
        <Tab onClick={() => props.set(2)} style={{ color: 'white' }} label="Item Three" />
      </Tabs>
    </Box>
  );
}

export default CenteredTabs;
