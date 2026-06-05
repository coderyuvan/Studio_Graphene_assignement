import RepoCard from "./RepoCard";

export default function RepoList({ repos = [] }) {
  // TODO: render list of repos
  return (
    <div>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
