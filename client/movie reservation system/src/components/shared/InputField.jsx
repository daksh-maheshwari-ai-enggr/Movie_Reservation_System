/**
 * Reused everywhere a form field appears (Sign In, Register, Edit Profile).
 * Label style is the same uppercase/tracked eyebrow used for "EMAIL ADDRESS",
 * "TITLE", "GENRE" etc. across the existing Figma screens.
 */
function InputField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  as = 'input',
  rows = 3,
  disabled = false,
  required = false,
}) {
  const fieldClasses = `cine-focus w-full rounded-[var(--radius-cine-input)] border bg-cine-surface
    px-4 py-3 text-sm text-cine-text placeholder:text-cine-muted-dim
    transition-colors duration-200
    ${error ? 'border-cine-danger' : 'border-cine-border focus:border-cine-gold/60'}
    disabled:cursor-not-allowed disabled:opacity-60`

  const Field = as === 'textarea' ? 'textarea' : 'input'

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="cine-label mb-2 block">
          {label}
          {required && <span className="text-cine-gold"> *</span>}
        </label>
      )}
      <Field
        id={id}
        name={id}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? rows : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={fieldClasses}
      />
      {error && <p className="mt-1.5 text-xs text-cine-danger">{error}</p>}
    </div>
  )
}

export default InputField
