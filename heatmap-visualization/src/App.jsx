import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

// List of common stop words (including the new ones)
const stopWords = [
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t',
  'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he',
  'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'really', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves',
  'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through',
  'to', 'too', 'uh', 'under', 'until', 'up', 'um', 'uh', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t',
  'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with',
  'won\'t', 'would', 'wouldn\'t', 'yeah', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
];

function App() {
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileGroups, setFileGroups] = useState([]);
  const [currentFile, setCurrentFile] = useState(null); // Track current selected file


  useEffect(() => {
    // Assuming you have a list of all JSON file names
    const allFileNames = [
      '01 Shlien Mr. Rob.json',
      '01 Shlien Mr. Rob_pretty.json',
      '01 Shlien Mr. Rob_pretty_tx.json',
      'Access Your Anger - Hayley Ep 5.json',
      'Access Your Anger - Hayley Ep 5_pretty.json',
      'Access Your Anger - Hayley Ep 5_pretty_tx.json',
      'Carl Rogers and Gloria - Counselling 1965 Full Session.json',
      'Carl Rogers and Gloria - Counselling 1965 Full Session_pretty.json',
      'Carl Rogers and Gloria - Counselling 1965 Full Session_pretty_tx.json',
      'Carl Rogers Counsels An Individual On Anger.json',
      'Carl Rogers Counsels An Individual On Anger_pretty.json',
      'Carl Rogers Counsels An Individual On Anger_pretty_tx.json',
      'Carl Rogers on Marriage- An Interview with John and Nancy.json',
      'Carl Rogers on Marriage- An Interview with John and Nancy_pretty.json',
      'Celebrate Your Goodness - Hayley Ep 4.json',
      'Celebrate Your Goodness - Hayley Ep 4_pretty.json',
      'Daniel (code name) with Rogers 1983 - public.json',
      'Daniel (code name) with Rogers 1983 - public_pretty.json',
      'Discover Your Hidden Strength - Hayley Ep 7.json',
      'Discover Your Hidden Strength - Hayley Ep 7_pretty.json',
      'Kathy Interview by Carl Rogers.json',
      'Kathy Interview by Carl Rogers_pretty.json',
      'Listen To Your Inner Child - Hayley Ep 6.json',
      'Listen To Your Inner Child - Hayley Ep 6_pretty.json',
      'LIVE Narcissism Therapy Session - Evaluation.json',
      'LIVE Narcissism Therapy Session - Evaluation_pretty.json',
      'Margaret and Rogers before a group.json',
      'Margaret and Rogers before a group_pretty.json',
      'Mr. Lin 1st session circa 1955.json',
      'Mr. Lin 1st session circa 1955_pretty.json',
      "Mr. Lin 2nd session circa 1955 with Rogers' Comments.json",
      "Mr. Lin 2nd session circa 1955 with Rogers' Comments_pretty.json",
      'Mr. VAC 2 SESSIONS w-o silences 1959-1960.json',
      'Mr. VAC 2 SESSIONS w-o silences 1959-1960_pretty.json',
      'Mrs. P.S. 1st session 1960.json',
      'Mrs. P.S. 1st session 1960_pretty.json',
      'Mrs. ROC side 1.json',
      'Mrs. ROC side 1_pretty.json',
      'Mrs. ROC side 2.json',
      'Mrs. ROC side 2_pretty.json',
      'Philippe with Rogers.json',
      'Philippe with Rogers_pretty.json',
      'Rogers with Loretta.json',
      'Rogers with Loretta_pretty.json',
      'Rogers with Loretta_pretty_pretty.json',
      'Rogers, Carl (1980) - Sylvia- The Struggle for Self-Acceptance.json',
      'Rogers, Carl (1980) - Sylvia- The Struggle for Self-Acceptance_pretty.json',
      'Rogers, Carl R. (1960) - The Client.json',
      'Rogers, Carl R. (1960) - The Client_pretty.json',
      'Session 2 with Abe from Cognitive Behavioral Therapy ： Basics and Beyond, 3rd Ed.json',
      'Session 2 with Abe from Cognitive Behavioral Therapy ： Basics and Beyond, 3rd Ed_pretty.json',
      'STEVE WITH ROGERS.json',
      'STEVE WITH ROGERS_pretty.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 1.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 1_pretty.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 2.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 2_pretty.json',
      'Vivian and Rogers 1984 with comments shared.json',
      'Vivian and Rogers 1984 with comments shared_pretty.json'
    ];

    // Group files by their base name (without "_pretty" or "_pretty_tx")
    const groups = {};
    allFileNames.forEach(fileName => {
      const baseName = fileName.replace(/(_pretty|_pretty_tx)?\.json$/, '');
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(fileName);
    });

    // Convert groups object to array format for easier rendering
    const groupedFiles = Object.keys(groups).map(label => ({
      label,
      files: groups[label]
    }));

    setFileGroups(groupedFiles);
  }, []);

 useEffect(() => {
    if (data.length > 0) {
      // Clear previous heatmap
      d3.select("#heatmap").selectAll("*").remove();

      // Prepare data for heatmap and render it using D3.js
      renderHeatmap(data);
    }
  }, [data]);

  const fetchAndSetData = (fileNames) => {
    // Fetch all JSON files
    Promise.all(fileNames.map(fileName => fetch(`/JSON/${fileName}`).then(response => response.json())))
      .then(results => setData(results))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDropdownChange = (event) => {
    const selectedLabel = event.target.value;
    const selectedFiles = fileGroups.find(group => group.label === selectedLabel)?.files || [];
    setSelectedFiles(selectedFiles);
    fetchAndSetData(selectedFiles);
  };

  const renderHeatmap = (data) => {
    const words = data.flatMap(d => d.words);
    let wordCounts = {};
  
    // Count word frequencies
  data.forEach(entry => {
    const words = entry.words.map(word => {
      // Normalize word, remove punctuation, and convert to lowercase
      const cleanedWord = word.text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .trim();

      // Apply stemming or lemmatization if needed
      // Example of basic stemming (chopping off suffixes)
      const stemmedWord = cleanedWord.replace(/ing$/, ''); // Example: feelings -> feel

      // Exclude stop words and count valid words
      if (stemmedWord && !stopWords.includes(stemmedWord)) {
        if (wordCounts[stemmedWord]) {
          wordCounts[stemmedWord]++;
        } else {
          wordCounts[stemmedWord] = 1;
        }
      }
    });
  });

  // Sort wordCounts by frequency and limit to top 10 words
  const sortedWordCounts = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency (descending)
    .slice(0, 10); // Limit to top 10 words

  wordCounts = Object.fromEntries(sortedWordCounts);
  
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select("#heatmap")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Setup scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(Object.keys(wordCounts))
      .padding(0.01);
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(Object.values(wordCounts))]);
  
    // Setup color scale
    const color = d3.scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, d3.max(Object.values(wordCounts))]);
  
    // Render heatmap
    svg.selectAll()
      .data(Object.entries(wordCounts))
      .enter()
      .append("rect")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d[1]))
      .style("fill", d => color(d[1]));
  
    // Add axes
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d => d));
    svg.append("g")
      .call(d3.axisLeft(y));
  };
  
  

  return (
    <div className="App">
      <h1>Heatmap Visualization</h1>
      <select onChange={handleDropdownChange}>
        <option value="">Select a file group</option>
        {fileGroups.map(group => (
          <option key={group.label} value={group.label}>{group.label}</option>
        ))}
      </select>
      <div id="heatmap"></div>
    </div>
  );
}

export default App;
