import { useSyncExternalStore, useCallback } from 'react';

export default function useLocalStorage(key, initialValue) {
  const subscribe = useCallback((callback) => {
    const handleStorageChange = (e) => {
      if (!e.key || e.key === key) {
        callback();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  const getSnapshot = () => {
    if (typeof window === 'undefined') return initialValue;
    const saved = localStorage.getItem(key);
    return saved ? saved : initialValue;
  };

  const getServerSnapshot = () => initialValue;

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = (newValue) => {
    localStorage.setItem(key, newValue);
    // useSyncExternalStore listens to the 'storage' event, which only fires in OTHER tabs when localStorage changes, You have to manually notify your own tab.
    window.dispatchEvent(new StorageEvent('storage', { key }));
    // Manually trigger re-render by dispatching storage event
};

  return [value, setValue];
}

