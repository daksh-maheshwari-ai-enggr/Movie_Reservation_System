export function StatCard({ label, value }) {
  return (
    <article className="min-h-40 rounded-2xl border border-[#292a42] bg-[#111119] p-7">
      <p className="uppercase tracking-[0.12em] text-[#8e8cb3]">{label}</p>
      <p className="mt-5 font-mono text-4xl font-medium text-[#d69b22]">{value}</p>
    </article>
  )
}
