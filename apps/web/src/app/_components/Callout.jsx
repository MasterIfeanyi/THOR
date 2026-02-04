// src/components/callout.tsx

export function Callout({ children, type = "note" }) {
  const styles = {
    note: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-400",
    warning:
      "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-500",
    danger:
      "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-200 dark:border-red-400",
  };

  return (
    <div className={`p-4 my-6 border-l-4 ${styles[type]}`}>{children}</div>
  );
}
