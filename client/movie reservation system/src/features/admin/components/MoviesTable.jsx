import { films } from '../data/mockData'

export function MoviesTable({ onAddFilm }) {
  return (
    <div>
      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Films</h2>
        <button onClick={onAddFilm} className="rounded-xl bg-[#d69b22] px-5 py-3 font-semibold text-black transition hover:bg-[#ecaf32]">+ Add Film</button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[#292a42] bg-[#111119]">
        <table className="w-full min-w-[780px] border-collapse text-lg">
          <thead><tr><th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Title</th><th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Genre</th><th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Duration</th><th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Rating</th><th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Year</th><th className="px-6 py-5 text-left text-sm font-medium uppercase tracking-[0.12em] text-[#585780]">Actions</th></tr></thead>
          <tbody>{films.map((film) => <tr key={film[0]}><td className="border-t border-[#232438] px-6 py-5 font-medium text-[#f7f3ed]">{film[0]}</td><td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">{film[1]}</td><td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">{film[2]}</td><td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">{film[3]}</td><td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]">{film[4]}</td><td className="border-t border-[#232438] px-6 py-5 text-[#9997bd]"><button className="mr-5 hover:text-[#d69b22]">Edit</button><button className="hover:text-[#e37979]">Remove</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
