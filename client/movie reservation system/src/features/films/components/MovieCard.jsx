import Badge from '../../../components/shared/Badge.jsx'

function MovieCard({ film }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden rounded-[var(--radius-cine-card)] border border-cine-border bg-cine-surface">
        <img
          src={film.posterUrl}
          alt={film.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Badge variant="dark" className="absolute right-3 top-3">
          {film.rating}
        </Badge>
      </div>
      <h3 className="mt-3 font-display font-semibold text-cine-text">{film.title}</h3>
      <p className="text-sm text-cine-muted">
        {film.genre} · {film.durationMinutes}m
      </p>
    </div>
  )
}

export default MovieCard
