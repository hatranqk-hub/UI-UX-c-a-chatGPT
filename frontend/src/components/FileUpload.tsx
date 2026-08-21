import React, { useState, useRef } from 'react';
import { fileService } from '../../services/fileService';

export const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const uploaded = await fileService.uploadFile(selectedFile);
      setUploadedFile(uploaded);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Tải Lên Tệp</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.txt,.docx,.xlsx,.png,.jpg,.jpeg,.webp"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-blue-600 hover:underline font-semibold"
        >
          Nhấp để chọn tệp
        </button>
        <p className="text-gray-600 text-sm mt-2">hoặc kéo và thả tệp của bạn</p>

        {selectedFile && (
          <div className="mt-4">
            <p className="text-green-600 font-semibold">✓ {selectedFile.name}</p>
            <p className="text-gray-600 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
        >
          {isLoading ? 'Đang tải lên...' : 'Tải Lên'}
        </button>
      )}

      {uploadedFile && (
        <div className="bg-green-100 border border-green-400 rounded-lg p-4">
          <p className="font-semibold text-green-900">✓ Tải lên thành công!</p>
          <p className="text-gray-700 text-sm mt-2">
            <strong>Tệp:</strong> {uploadedFile.filename}
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Kích thước:</strong> {(uploadedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
    </div>
  );
};
