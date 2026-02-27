import EditMenu from "./EditMenu";
import TopicBadge from "./TopicBadge";

export default function CardMedia({ sessionId, image, onEditClicked, onDeleteClicked, topics = [], showEditMenu = false }) {
  return (
    <div className="h-48 relative overflow-hidden">
      {image ? (
        <img
          alt="Session cover"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
        />
      ) : (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <span className="text-slate-300">
            <svg viewBox="0 0 24 24" className="w-14 h-14" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
            </svg>
          </span>
        </div>
      )}

      {/* Top overlay */}
      <div className="absolute top-4 left-0 right-0 px-4 flex items-start gap-3">
        {/* Topics (left) */}
        <div className="flex flex-wrap gap-2 min-w-0">
          {topics
            .filter(Boolean)
            .map((topic) => (
              <TopicBadge key={topic} topic={topic} />
            ))}
        </div>

        {/* Edit menu (right) */}
        {showEditMenu && (
          <div className="ml-auto shrink-0">
            <EditMenu
              onEditClicked={onEditClicked}
              onDeleteClicked={onDeleteClicked}
              sessionId={sessionId}
            />
          </div>
        )}
      </div>
    </div>
  );
}