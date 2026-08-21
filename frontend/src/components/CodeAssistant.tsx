import React, { useState } from 'react';
import { codeService } from '../../services/codeService';

type AssistantMode = 'complete' | 'explain' | 'refactor';

export const CodeAssistant: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [mode, setMode] = useState<AssistantMode>('explain');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (mode === 'complete') {
        response = await codeService.completeCode(code, language);
      } else if (mode === 'explain') {
        response = await codeService.explainCode(code, language);
      } else {
        response = await codeService.refactorCode(code, language);
      }
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Trợ Lý Lập Trình</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Mode Selection */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('complete')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            mode === 'complete'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Hoàn Thành
        </button>
        <button
          onClick={() => setMode('explain')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            mode === 'explain'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Giải Thích
        </button>
        <button
          onClick={() => setMode('refactor')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            mode === 'refactor'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Tái Cấu Trúc
        </button>
      </div>

      {/* Language Selection */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Ngôn Ngữ</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="react">React</option>
          <option value="sql">SQL</option>
        </select>
      </div>

      {/* Code Input */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Mã Của Bạn</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Dán mã ${language} của bạn tại đây...`}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleProcess}
        disabled={isLoading || !code.trim()}
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {isLoading ? 'Đang xử lý...' : `${mode === 'complete' ? 'Hoàn Thành' : mode === 'explain' ? 'Giải Thích' : 'Tái Cấu Trúc'}`}
      </button>

      {/* Result */}
      {result && (
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Kết Quả:</h4>
          <div className="bg-white p-3 rounded border border-gray-200 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
              {result}
            </pre>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(result);
              alert('Đã sao chép!');
            }}
            className="mt-3 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm font-semibold"
          >
            Sao Chép
          </button>
        </div>
      )}
    </div>
  );
};
