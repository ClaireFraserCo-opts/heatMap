// src/components/Dropdown.jsx
import React from 'react';

const Dropdown = ({ fileGroups, onChange }) => {
  const handleChange = (event) => {
    const selectedLabel = event.target.value;
    onChange(selectedLabel);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select a file group</option>
      {fileGroups.map(group => (
        <option key={group.label} value={group.label}>{group.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
