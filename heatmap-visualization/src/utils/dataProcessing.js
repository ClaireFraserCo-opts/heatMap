// src/utils/dataProcessing.js

export const processConversationData = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid conversation data');
  }

  const wordFrequency = [];
  const wordCountMap = {}; // Object to store word frequencies

  data.forEach(conversation => {
      if (!Array.isArray(conversation.utterances)) {
          throw new Error('Invalid conversation structure');
      }

      conversation.utterances.forEach(utterance => {
          const timestamp = new Date(utterance.start).getTime();

          utterance.words.forEach(wordObj => {
              const word = wordObj.text;

              // Update word count in wordCountMap
              if (wordCountMap[word]) {
                  wordCountMap[word]++;
              } else {
                  wordCountMap[word] = 1;
              }

              const frequency = wordCountMap[word]; // Get current frequency

              wordFrequency.push({
                  speaker: utterance.speaker,
                  timestamp,
                  word,
                  frequency
              });
          });
      });
  });

  return wordFrequency;
};
