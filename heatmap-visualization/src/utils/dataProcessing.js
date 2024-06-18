// src/utils/dataProcessing.js

export const processConversationData = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid conversation data');
  }

  const wordFrequency = [];

  // Object to store word frequencies
  const wordCounts = {};

  // Iterate through each conversation
  data.forEach(conversation => {
    if (!Array.isArray(conversation.utterances)) {
      throw new Error('Invalid conversation structure');
    }

    // Iterate through each utterance in the conversation
    conversation.utterances.forEach(utterance => {
      // Iterate through each word in the utterance
      utterance.words.forEach(wordObj => {
        const word = wordObj.text.toLowerCase(); // Normalize to lowercase
        // Increment word count in the wordCounts object
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    });
  });

  // Iterate through wordCounts to create wordFrequency array
  Object.keys(wordCounts).forEach(word => {
    wordFrequency.push({
      word,
      frequency: wordCounts[word]
    });
  });

  return wordFrequency;
};
