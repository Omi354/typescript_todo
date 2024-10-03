/**
 * id属性からHTML要素を取得する
 * @param id
 * @returns HTMLElement
 */
export const getElementById = (id: string): HTMLElement => {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`id ${id} の要素は見つかりませんでした。`);
  }
  return element;
};

/**
 * id属性からinput要素を取得する
 * @param id
 * @returns HTMLInputElement
 */
export const getInputElementById = (id: string): HTMLInputElement => {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`id ${id} の要素は見つかりませんでした。`);
  }
  return element as HTMLInputElement;
};

/**
 * 引数に受け取った名前のDOM要素を生成する
 * @param elementName 要素名
 * @param textContent 要素のテキストコンテント
 * @returns HTMLElement
 */
export const createElement = (
  elementName: string,
  textContent?: string,
): HTMLElement => {
  const element = document.createElement(elementName);
  if (typeof textContent !== "undefined") {
    element.textContent = textContent;
  }
  return element;
};

/**
 * インプットタグを生成する
 * @returns HTMLinputElement
 */
export const createInputElement = (): HTMLInputElement => {
  const inputElement = document.createElement("input");
  return inputElement;
};
