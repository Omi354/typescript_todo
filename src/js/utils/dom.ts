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

export const getInputElementById = (id: string): HTMLInputElement => {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`id ${id} の要素は見つかりませんでした。`);
  }
  return element as HTMLInputElement;
};
