import { useState } from 'react';

export const MCQBlock = ({ data }) => {
  const question = data?.question || '';
  const options = data?.options || [];
  const answer = data?.answer;
  const explanation = data?.explanation || '';
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (index) => {
    if (selectedOption === null) {
      setSelectedOption(index);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-sm my-8">
      <h3 className="text-xl font-semibold text-white mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectIndex = answer === index;
          const isAnswered = selectedOption !== null;

          let btnClass = "w-full text-left px-5 py-4 rounded-lg border transition-all duration-200 font-medium ";

          if (!isAnswered) {
            btnClass += "border-gray-600 hover:border-blue-500 hover:bg-blue-900/30 text-gray-200 bg-[#2a2a2a]";
          } else {
            if (isCorrectIndex) {
              btnClass += "border-green-500 bg-green-900/30 text-green-400";
            } else if (isSelected && !isCorrectIndex) {
              btnClass += "border-red-500 bg-red-900/30 text-red-400";
            } else {
              btnClass += "border-gray-700 bg-[#2a2a2a] text-gray-500 opacity-70";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={isAnswered}
              className={btnClass}
            >
              {option}
            </button>
          );
        })}
      </div>
      
      {selectedOption !== null && explanation && (
        <div className={`mt-6 p-4 rounded-lg border ${selectedOption === answer ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
          <p className="text-sm font-semibold mb-1 text-gray-200">Explanation</p>
          <p className="text-gray-300 text-sm">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MCQBlock;
