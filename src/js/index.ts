import "../css/style.css";
import {
  appendTodoList,
  getNewTodo,
  removeTodoListElement,
  sortTodoList,
  Todo,
} from "./todo";
import { getElementById, getInputElementById } from "./utils/dom";

let todoList: Todo[] = [];
let filterWord: string = "";

document.addEventListener("DOMContentLoaded", () => {
  // 登録ボタン押下時の処理
  const registerBtn = getElementById("register");
  registerBtn.addEventListener("click", () => {
    // 新しいTODOをDOMから取得してTodoリストに追加する
    const newTodo = getNewTodo();
    if (newTodo) {
      todoList = [...todoList, newTodo];
      // TODO一覧を表示する
      removeTodoListElement();
      appendTodoList(todoList, filterWord, deleteTodo);
    }
  });

  // 絞り込み入力時の処理
  const filterInput = getInputElementById("filter");

  filterInput.addEventListener("input", () => {
    filterWord = filterInput.value;
    removeTodoListElement();
    appendTodoList(todoList, filterWord, deleteTodo);
  });

  const sortElem = getElementById("sort");
  let sortHelper = true;
  sortElem.addEventListener("click", () => {
    // 配列の中身を並べ替えて、新しい配列を作成
    const sortedTodoList = sortTodoList(todoList, sortHelper);
    // 並べ替えたTodoListを再表示
    removeTodoListElement();
    appendTodoList(sortedTodoList, filterWord, deleteTodo);
    sortHelper = !sortHelper;
  });
});

/**
 * todoを削除する
 * @param id
 */
const deleteTodo = (id: number) => {
  todoList = todoList.filter((todo) => todo.id !== id);
  removeTodoListElement();
  appendTodoList(todoList, filterWord, deleteTodo);
};
