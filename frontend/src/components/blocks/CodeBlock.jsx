export const CodeBlock = ({ data }) => {
  const code = data?.code || data?.text || '';
  const language = data?.language || '';
  return (
    <div className="bg-gray-900 rounded-lg p-4 my-6 overflow-x-auto shadow-md">
      {language && (
        <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
          {language}
        </div>
      )}
      <pre className="text-gray-100 font-mono text-sm leading-snug">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
