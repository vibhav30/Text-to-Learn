export const HeadingBlock = ({ data }) => {
  const level = data?.level || 2;
  const text = data?.text || data?.title || '';
  const Tag = `h${level}`;
  const styles = {
    1: 'text-2xl md:text-4xl font-extrabold text-white mb-4 md:mb-6',
    2: 'text-xl md:text-3xl font-bold text-white mb-3 md:mb-4',
    3: 'text-lg md:text-2xl font-semibold text-white mb-2 md:mb-3',
    4: 'text-base md:text-xl font-medium text-white mb-2',
    5: 'text-sm md:text-lg font-medium text-white mb-2',
    6: 'text-xs md:text-base font-medium text-white mb-2'
  };
  return <Tag className={styles[level] || styles[2]}>{text}</Tag>;
};

export default HeadingBlock;
