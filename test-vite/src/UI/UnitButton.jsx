export default function UnitButton({ active, onClick, label }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${active ? "bg-white/10" : "hover:bg-white/5"}`}
      >
        <span>{label}</span>
        {active ? "✓" : ""}
      </button>
    );
  }
  