import {
  createElement,
  getElementById,
  getInputElementById,
} from "./utils/dom";

/**
 * TODOの型定義
 */
export type Todo = {
  id: number;
  name: string;
  person: string;
  deadline: string;
};

/**
 * DOMのinput要素から新しいTODOの値を取得する
 * @returns Todo
 */
export const getNewTodo = (): Todo => ({
  id: Date.now(),
  name: getInputElementById("new-todo-name").value,
  person: getInputElementById("new-person").value,
  deadline: getInputElementById("new-deadline").value,
});

/**
 * DOMにTodo一覧を表示する
 * @param todoList
 */
export const appendTodoList = (
  todoList: Todo[],
  _filterWord: string,
  deleteTodo: (id: number) => void,
) => {
  todoList
    .filter(
      (todo) =>
        todo.name.includes(_filterWord) || todo.person.includes(_filterWord),
    )
    .forEach((todo) => {
      const nameTd = createElement("td", todo.name);
      const personTd = createElement("td", todo.person);
      const deadlineTd = createElement("td", todo.deadline);

      // 削除ボタン
      const deleteBtnTd = createElement("td");
      const deleteBtn = createElement("button", "削除");
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      const tr = createElement("tr");

      deleteBtnTd.appendChild(deleteBtn);
      tr.appendChild(nameTd);
      tr.appendChild(personTd);
      tr.appendChild(deadlineTd);
      tr.appendChild(deleteBtnTd);

      const tBody = getElementById("todo-list");
      tBody.appendChild(tr);
    });
};

/**
 * DOMのTODO一覧をすべて削除する
 */
export const removeTodoListElement = () => {
  const tBody = getElementById("todo-list");
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }
};
