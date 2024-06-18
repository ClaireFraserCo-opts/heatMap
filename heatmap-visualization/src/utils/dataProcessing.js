// src/utils/dataProcessing.js

export const processConversationData = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid conversation data');
  }

  const wordFrequency = [];

  data.forEach(conversation => {
    if (!Array.isArray(conversation.utterances)) {
      throw new Error('Invalid conversation structure');
    }

    conversation.utterances.forEach(utterance => {
      const timestamp = new Date(utterance.start).getTime();

      utterance.words.forEach(wordObj => {
        const word = wordObj.text; // Use 'text' as the word
        const frequency = 1; // Default frequency since it's not provided in the data

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
