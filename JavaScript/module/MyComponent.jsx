// 既有默认导出又有命名导出
export const ComponentName = 'MyAwesomeComponent';
export const useMyHook = () => { /* ... */ };

export default function MyComponent() {
  return <div>Hello</div>;
}

// 导入方式
import MyComponent, { ComponentName, useMyHook } from './MyComponent';