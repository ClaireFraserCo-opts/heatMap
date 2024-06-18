// src/utils/dataProcessing.js

export const processConversationData = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid conversation data');
    }
  
    return data.flatMap(conversation => {
      if (!Array.isArray(conversation.utterances)) {
        throw new Error('Invalid conversation structure');
      }
  
      return conversation.utterances.map(utterance => {
        const timestamp = new Date(utterance.start).getTime(); // Ensure this is a valid timestamp
        return {
          speaker: utterance.speaker,
          timestamp,
          percentile: utterance.Percentile || 0 // Default to 0 if Percentile is missing
        };
      });
    });
  };
  