const resolvePath = (object, path) =>
  path.split(".").reduce((current, key) => current?.[key], object);

export default function Table({ rows, cols, del, edit, headings = [] }) {
  return (
    <div className="table">
      {headings.length > 0 && (
        <div className="table-head">
          {headings.map((heading) => (
            <span key={heading}>{heading}</span>
          ))}
        </div>
      )}
      {rows.map((row) => (
        <div key={row._id || row.reference || JSON.stringify(row)}>
          {cols.map((col) => (
            <span key={col}>
              {Array.isArray(resolvePath(row, col))
                ? resolvePath(row, col).join(", ")
                : col === "startsAt"
                ? new Date(resolvePath(row, col)).toLocaleString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : resolvePath(row, col)}
            </span>
          ))}
          {(edit || del) && (
            <div className="table-actions">
              {edit && (
                <button className="link" onClick={() => edit(row)}>
                  Edit
                </button>
              )}
              {del && (
                <button className="link" onClick={() => del(row)}>
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
