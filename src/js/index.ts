import "../css/style.css";
import { getNewTodo, Todo } from "./todo";
import { getElementById } from "./utils/dom";

let todoList: Todo[] = [];

document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = getElementById("register");
  registerBtn.addEventListener("click", () => {
    // 新しいTODOをDOMから取得する
    todoList.push(getNewTodo());
    // TODO一覧を表示する
  });
});
