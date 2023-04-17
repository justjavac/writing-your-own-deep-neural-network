export interface ButtonProps {
  disabled?: boolean;
  children?: string;
  onClick: () => void;
}

export function Button({ disabled = false, children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      class={`border focus:outline-none rounded px-4 py-1 text-center ${
        disabled
          ? "cursor-not-allowed text-gray-700"
          : "hover:text-white hover:bg-blue-800 border-blue-700 text-blue-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
