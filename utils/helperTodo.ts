import { todoObject } from "types";

export function getListTodo(tmpList: todoObject) {
  if (Array.isArray(tmpList)) {
    tmpList.map(({ id, name, status }) => ({
      id,
      name,
      status,
    }));
    return tmpList;
  } else {
    return [];
  }
}
