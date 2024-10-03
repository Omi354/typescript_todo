import {
  createElement,
  createInputElement,
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
export const getNewTodo = (): Todo | null => {
  const newName = getInputElementById("new-todo-name").value;
  const newPerson = getInputElementById("new-person").value;
  const newDeadline = getInputElementById("new-deadline").value;

  if (newName === "" || newPerson === "" || newDeadline === "") {
    window.alert("未入力の項目があります");
    return null;
  }

  const todo: Todo = {
    id: Date.now(),
    name: newName,
    person: newPerson,
    deadline: newDeadline,
  };

  return todo;
};

/**
 * DOMにTodo一覧を表示する
 * @param todoList
 */
export const appendTodoList = (
  todoList: Todo[],
  _filterWord: string,
  deleteTodo: (id: number) => void,
  updateTodo: (id: number) => void,
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
      const handleBtnTd = createElement("td");
      const deleteBtn = createElement("button", "削除");
      const editBtn = createElement("button", "編集");
      const updateBtn = createElement("button", "更新");
      updateBtn.style.display = "none";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      editBtn.addEventListener("click", () => {
        // 編集ボタン押下後、インプットタグを表示

        // 要素の生成と命名
        const nameInputElem = createInputElement();
        nameInputElem.id = `${todo.id}inputName`;
        const personInputElem = createInputElement();
        personInputElem.id = `${todo.id}inputPerson`;
        const deadlineInputElem = createInputElement();
        deadlineInputElem.id = `${todo.id}inputDeadline`;

        // 該当の配列を取得
        const editedObj = todoList.find(
          (_todo) => _todo.id === todo.id,
        ) as Todo;

        // 該当の配列にアクセスし、inputタグに現在の値を代入
        nameInputElem.value = editedObj.name;
        personInputElem.value = editedObj.person;
        deadlineInputElem.value = editedObj.deadline;

        // 元のtdのテキストを非表示
        nameTd.textContent = "";
        personTd.textContent = "";
        deadlineTd.textContent = "";

        // インプットタグを表示
        nameTd.appendChild(nameInputElem);
        personTd.appendChild(personInputElem);
        deadlineTd.appendChild(deadlineInputElem);

        // 編集ボタンを消し、更新ボタンを表示
        editBtn.style.display = "none";
        updateBtn.style.display = "inline-block";
      });

      updateBtn.addEventListener("click", () => updateTodo(todo.id));

      const tr = createElement("tr");

      handleBtnTd.appendChild(deleteBtn);
      handleBtnTd.appendChild(editBtn);
      handleBtnTd.appendChild(updateBtn);
      tr.appendChild(nameTd);
      tr.appendChild(personTd);
      tr.appendChild(deadlineTd);
      tr.appendChild(handleBtnTd);

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

/**
 * 期限を昇順、降順に並べ替える
 */
export const sortTodoList = (todoList: Todo[], sortHelper: boolean) => {
  // ボタンを押すたびにtrueとfalseを逆にできるように変数を定義
  let sortedTodoList: Todo[] = [];

  // 変数がtrueの場合とfalseの場合で逆順に並べ替え
  if (sortHelper) {
    sortedTodoList = [...todoList].sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  } else {
    sortedTodoList = [...todoList].sort((a, b) => {
      return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
    });
  }

  return sortedTodoList;
};
