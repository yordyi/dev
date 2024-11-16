import { useState } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  // ...
  return { count, increment, decrement };
}

// 导入方式
import { useCounter } from './hooks/useCounter'; 