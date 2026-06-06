'use client'
import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter GitHub username..."
        className="flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600"
      />
      <button
        type="submit"
        className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Search
      </button>
    </form>
  )
}