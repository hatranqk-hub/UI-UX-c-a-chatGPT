import api from './api';

export const codeService = {
  async completeCode(code: string, language: string, context?: string) {
    const response = await api.post('/code/complete', {
      code,
      language,
      context
    });
    return response.data.completion;
  },

  async explainCode(code: string, language: string) {
    const response = await api.post('/code/explain', {
      code,
      language
    });
    return response.data.explanation;
  },

  async refactorCode(code: string, language: string, improvements?: string) {
    const response = await api.post('/code/refactor', {
      code,
      language,
      improvements
    });
    return response.data.refactored;
  }
};
