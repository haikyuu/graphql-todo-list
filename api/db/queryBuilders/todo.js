// @flow
import db from "..";
import uuidv4 from "uuid/v4";
import type { Todo } from "../../flowTypes";

class todo {
  static async getById(id: string) {
    return db
      .first()
      .table("Todos")
      .where("id", id);
  }

  static async getByIds(ids: Array<string>) {
    return db
      .select()
      .table("Todos")
      .whereIn("id", ids);
  }

  static async getAll() {
    return db.select().table("Todos");
  }
}

export default Todo;
