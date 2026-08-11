export function ModalShell({ title, children, onClose }) {
  function closeWhenClickingBackdrop(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#05050a]/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={closeWhenClickingBackdrop}
    >
      <div className="max-h-[90vh] w-full max-w-[660px] overflow-y-auto rounded-3xl border border-[#2a2b42] bg-[#111119] p-7 shadow-2xl sm:p-10">
        <div className="mb-9 flex items-start justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.04em]">{title}</h2>
          <button type="button" onClick={onClose} className="text-3xl leading-none text-[#9492ba] hover:text-white" aria-label="Close modal">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}
