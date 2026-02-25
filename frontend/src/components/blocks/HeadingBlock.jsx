export const HeadingBlock = ({ data }) => {
  const level = data?.level || 2;
  const text = data?.text || data?.title || '';
  const Tag = `h${level}`;
  const styles = {
    1: 'text-4xl font-extrabold text-white mb-6',
    2: 'text-3xl font-bold text-white mb-4',
    3: 'text-2xl font-semibold text-white mb-3',
    4: 'text-xl font-medium text-white mb-2',
    5: 'text-lg font-medium text-white mb-2',
    6: 'text-base font-medium text-white mb-2'
  };
  return <Tag className={styles[level] || styles[2]}>{text}</Tag>;
};

export default HeadingBlock;
