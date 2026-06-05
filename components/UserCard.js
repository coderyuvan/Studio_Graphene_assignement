export default function UserCard({ user }) {
  // TODO: render user card with avatar, name, bio, etc.
  if (!user) return null;
  return <div>{user.login}</div>;
}
