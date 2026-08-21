import api from './api';

export const fileService = {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.file;
  },

  async analyzeFile(fileId: string) {
    const response = await api.post('/files/analyze', { fileId });
    return response.data;
  },

  async getFileDetails(fileId: string) {
    const response = await api.get(`/files/${fileId}`);
    return response.data.file;
  },

  async deleteFile(fileId: string) {
    const response = await api.delete(`/files/${fileId}`);
    return response.data;
  }
};
