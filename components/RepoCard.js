export default function RepoCard({ repo }) {
  // TODO: render individual repo card
  if (!repo) return null;
  return <div>{repo.name}</div>;
}
