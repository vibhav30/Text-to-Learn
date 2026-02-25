import HeadingBlock from './blocks/HeadingBlock';
import ParagraphBlock from './blocks/ParagraphBlock';
import CodeBlock from './blocks/CodeBlock';
import VideoBlock from './blocks/VideoBlock';
import MCQBlock from './blocks/MCQBlock';

const LessonRenderer = ({ content }) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="flex flex-col gap-6 text-gray-200">
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <HeadingBlock key={index} data={block} {...block} />;
          case 'paragraph':
            return <ParagraphBlock key={index} data={block} {...block} />;
          case 'code':
            return <CodeBlock key={index} data={block} {...block} />;
          case 'video':
            return <VideoBlock key={index} data={block} {...block} />;
          case 'mcq':
            return <MCQBlock key={index} data={block} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default LessonRenderer;
