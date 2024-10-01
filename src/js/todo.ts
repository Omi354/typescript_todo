import { getElementById, getInputElementById } from "./utils/dom";

/**
 * TODOの型定義
 */
export type Todo = {
  name: string;
  person: string;
  deadline: string;
};

/**
 * DOMのinput要素から新しいTODOの値を取得する
 */
export const getNewTodo = (): Todo => ({
  name: getInputElementById("new-todo-name").value,
  person: getInputElementById("new-person").value,
  deadline: getInputElementById("new-deadline").value,
});
