// src/components/callout.tsx
export function Callout({ children, type = "note" }) {
  const styles = {
    note: "border-blue-500 bg-blue-50 text-blue-900",
    warning: "border-yellow-500 bg-yellow-50 text-yellow-900",
    danger: "border-red-500 bg-red-50 text-red-900",
  };

  return (
    <div className={`my-6 border-l-4 p-4 ${styles[type]}`}>
      {children}
    </div>
  );
}
