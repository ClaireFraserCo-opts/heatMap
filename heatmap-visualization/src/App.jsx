// src/App.jsx

import React, { useState, useEffect } from 'react';
import Dropdown from './components/Dropdown';
import Heatmap from './components/HeatMap'; // Ensure correct import
import { fetchAndProcessData, groupFileNames } from './utils/dataUtils'; // Assuming these utilities are implemented
import { stopWords } from './utils/stopWords'; // Assuming this is defined

import './App.css';

const App = () => {
  const [fileGroups, setFileGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [conversationData, setConversationData] = useState(null);

  useEffect(() => {
    const fileNames = [
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
      'Session 2 with Abe from Cognitive Behavioral Therapy： Basics and Beyond, 3rd Ed_pretty.json',
      'STEVE WITH ROGERS.json',
      'STEVE WITH ROGERS_pretty.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 1.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 1_pretty.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 2.json',
      'The Inner World of Counseling with Carl Rogers (1980) Part 2_pretty.json',
      'Vivian and Rogers 1984 with comments shared.json',
      'Vivian and Rogers 1984 with comments shared_pretty.json',
            // Add more file names as needed
          ];
const groups = groupFileNames(fileNames); // Implement groupFileNames utility function
setFileGroups(groups);
  }, []);

const handleGroupChange = async (label) => {
  const selectedGroup = fileGroups.find(group => group.label === label);
  if (selectedGroup) {
    try {
      const data = await fetchAndProcessData(selectedGroup.files); // Implement fetchAndProcessData utility function
      if (data && Array.isArray(data) && data.length > 0) {
        setConversationData(data);
      } else {
        console.error('No data or invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setSelectedGroup(label);
  }
};

return (
  <div className="App">
    <h1>Conversation Heatmap</h1>
    <Dropdown fileGroups={fileGroups} onChange={handleGroupChange} />
    {conversationData && <Heatmap data={conversationData} />}
  </div>
);
};

export default App;
