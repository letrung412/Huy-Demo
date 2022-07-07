import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
const minDistance = 10;
export default function SearchPrice() {
  const [value, setValue] = React.useState([0, 10]);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };
  return (
    <>
    <p>Lọc theo giá</p>
    <Box sx={{ width: 200 }}>
        <strong>{value[0]*20}{value[1]*20}</strong>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value}
        onChange={handleChange}
        disableSwap
      />
    </Box>
    </>
  );
}
