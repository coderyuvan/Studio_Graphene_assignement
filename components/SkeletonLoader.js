export default function SkeletonLoader({ type = "card" }) {
  // TODO: render skeleton loading placeholder
  return <div className={`skeleton skeleton-${type}`} aria-busy="true" />;
}
