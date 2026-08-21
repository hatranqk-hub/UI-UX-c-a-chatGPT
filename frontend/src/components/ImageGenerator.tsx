import React, { useState } from 'react';
import { imageService } from '../../services/imageService';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('dall-e-3');
  const [size, setSize] = useState('1024x1024');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const image = await imageService.generateImage(prompt, model, size);
      setGeneratedImage(image);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Image generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Tạo Ảnh AI</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Mô Tả Ảnh</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Mô tả chi tiết ảnh bạn muốn tạo..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="dall-e-2">DALL-E 2</option>
              <option value="dall-e-3">DALL-E 3</option>
              <option value="stable-diffusion">Stable Diffusion</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Kích Thước</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="256x256">256x256</option>
              <option value="512x512">512x512</option>
              <option value="1024x1024">1024x1024</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition"
        >
          {isLoading ? 'Đang tạo ảnh...' : 'Tạo Ảnh'}
        </button>
      </form>

      {generatedImage && (
        <div className="mt-6 space-y-3">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={generatedImage.url}
              alt={generatedImage.prompt}
              className="w-full h-auto"
            />
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-700">
              <strong>Prompt:</strong> {generatedImage.prompt}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <strong>Model:</strong> {generatedImage.model}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
