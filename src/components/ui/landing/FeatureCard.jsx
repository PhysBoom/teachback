import Card from "../Card";
import Icon from "../Icon";

export default function FeatureCard({ icon, iconWrapClassName, title, description }) {
  return (
    <Card className="bg-white p-8 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
      <div className={`w-14 h-14 flex items-center justify-center mb-6 rounded-xl ${iconWrapClassName}`}>
        <Icon name={icon} className="text-3xl" />
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
    </Card>
  );
}