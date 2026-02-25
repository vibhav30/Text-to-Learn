export const ParagraphBlock = ({ data }) => {
  const text = data?.text || data?.content || '';
  return (
    <p className="text-gray-200 text-lg leading-relaxed mb-4">
      {text}
    </p>
  );
};

export default ParagraphBlock;
