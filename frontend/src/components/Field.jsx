export default function Field({ label, value, onChange, type = "text" }) {
  return (
    <label>
      {label}
      <input
        required
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
