export const name = "张三";
export default class User { }

// 导入方式
import User, { name } from './examples.js';

const someFunction = () => {};
export { someFunction as newName };

// 导入时重命名
import { newName as anotherName } from './examples.js';