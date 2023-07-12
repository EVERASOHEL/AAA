import React, { useState } from 'react';
import { Autocomplete } from "@mui/material";

const options = [
  { display: 'Apple', value: 'apple' },
  { display: 'Banana', value: 'banana' },
  { display: 'Cherry', value: 'cherry' },
  { display: 'Date', value: 'date' },
  { display: 'Elderberry', value: 'elderberry' },
  { display: 'Fig', value: 'fig' },
  // Add more options as needed
];

function MyAutocomplete(props) {
//   const [value, setValue] = useState('');

//   const handleSelect = (val) => {
//     setValue(val);
//   };

//   const getDisplayValue = (selectedValue) => {
//     const selectedOption = options.find(option => option.value === selectedValue);
//     return selectedOption ? selectedOption.display : '';
//   };

  return (
    <div>
      <Autocomplete
        value={props.value}
        onChange={props.onChange}
        // onSelect={handleSelect}
        items={props.options}
        getItemValue={(item) => item.value}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.display}
          </div>
        )}
      />
      {/* <p>Selected value: {getDisplayValue(value)}</p> */}
    </div>
  );
}

export default MyAutocomplete;
