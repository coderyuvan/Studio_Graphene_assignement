"use client";

export default function SearchBar({ onSearch }) {
  // TODO: implement search bar UI
  return (
    <div>
      <input type="text" placeholder="Search GitHub username..." />
      <button onClick={() => onSearch && onSearch()}>Search</button>
    </div>
  );
}
