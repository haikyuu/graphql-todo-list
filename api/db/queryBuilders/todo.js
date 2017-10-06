// @flow
import db from "..";

class Todo {
  static async getById(id: number) {
    return db
      .first()
      .table("Todos")
      .where("id", id);
  }

  static async getByIds(ids: Array<number>) {
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
