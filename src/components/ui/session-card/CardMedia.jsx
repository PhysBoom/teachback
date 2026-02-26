import EditMenu from "./EditMenu";
import TopicBadge from "./TopicBadge";

export default function CardMedia({ image, topic, showEditMenu = false }) {
  return (
    <div className="h-48 relative overflow-hidden">
      {image ? (
        <img
          alt={topic}
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
      <div className="flex flex-row absolute top-4 justify-between w-full px-4">
        <TopicBadge topic={topic} />
        {showEditMenu && <EditMenu onEditClicked={() => console.log("Edit clicked")} onDeleteClicked={() => console.log("Delete clicked")}/>}
      </div>
    </div>
  );
}