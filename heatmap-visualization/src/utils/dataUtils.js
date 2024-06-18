// src/utils/dataUtils.js

export const fetchAndProcessData = async (files) => {
    const fetchPromises = files.map(file => fetch(`/JSON/${file}`).then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    }));
    
    const data = await Promise.all(fetchPromises);
    return data;
  };
  
  export const groupFileNames = (fileNames) => {
    const groups = fileNames.reduce((acc, fileName) => {
      const group = fileName.split(' ')[0]; // Example grouping by first word
      if (!acc[group]) acc[group] = [];
      acc[group].push(fileName);
      return acc;
    }, {});
  
    return Object.keys(groups).map(key => ({
      label: key,
      files: groups[key]
    }));
  };
  
  export const validateConversationData = (data) => {
    return data && Array.isArray(data) && data.every(item => item && typeof item === 'object');
  };
  