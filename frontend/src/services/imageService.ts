import api from './api';

export const imageService = {
  async generateImage(
    prompt: string,
    model: string = 'dall-e-3',
    size: string = '1024x1024'
  ) {
    const response = await api.post('/images/generate', {
      prompt,
      model,
      size
    });
    return response.data.image;
  },

  async getImageDetails(imageId: string) {
    const response = await api.get(`/images/${imageId}`);
    return response.data.image;
  },

  async getUserImages() {
    const response = await api.get('/images');
    return response.data.images;
  }
};
