export default function TopicBadge({ topic }) {
  return (
    <div className="bg-navy-deep/80 backdrop-blur-md text-white px-3 py-1 rounded text-[10px] font-bold uppercase h-fit">
      {topic}
    </div>
  );
}