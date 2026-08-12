import Field from "./Field.jsx";

export default function Modal({ form, setForm, movies, theaters, submit }) {
  const fields =
    form.kind === "movies"
      ? [
          ["title"],
          ["genre"],
          ["duration", "number"],
          ["rating"],
          ["year", "number"],
          ["director"],
          ["description"],
          ["posterUrl"],
        ]
      : form.kind === "theaters"
      ? [
          ["name"],
          ["rows", "number"],
          ["seatsPerRow", "number"],
          ["description"],
        ]
      : [];

  return (
    <div className="modal">
      <form className="card" onSubmit={submit}>
        <button type="button" className="close" onClick={() => setForm(null)}>
          ×
        </button>
        <h1>Add {form.kind.slice(0, -1)}</h1>
        {form.kind === "showtimes" ? (
          <>
            <label>
              Film
              <select
                value={form.movie}
                onChange={(e) => setForm({ ...form, movie: e.target.value })}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Theater
              <select
                value={form.theater}
                onChange={(e) => setForm({ ...form, theater: e.target.value })}
              >
                {theaters.map((theater) => (
                  <option key={theater._id} value={theater._id}>
                    {theater.name}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Date & time"
              type="datetime-local"
              value={form.startsAt}
              onChange={(value) => setForm({ ...form, startsAt: value })}
            />
            <Field
              label="Ticket price"
              type="number"
              value={form.price}
              onChange={(value) => setForm({ ...form, price: +value })}
            />
          </>
        ) : (
          fields.map(([key, type]) => (
            <Field
              key={key}
              label={key}
              type={type}
              value={form[key]}
              onChange={(value) =>
                setForm({ ...form, [key]: type === "number" ? +value : value })
              }
            />
          ))
        )}
        <button className="gold wide">Create</button>
      </form>
    </div>
  );
}
