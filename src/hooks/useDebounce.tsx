import React from 'react';

const useDebounce = (value: string, delay: number, initialValue?: string) => {
  const [state, setState] = React.useState(initialValue);

  React.useEffect(() => {
    const timer = setTimeout(() => setState(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return state;
};

export default useDebounce;
