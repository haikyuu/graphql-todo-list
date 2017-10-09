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

  static async getByIds(ids: Array<string>): Promise<Array<Todo>> {
    return db
      .select()
      .table("Todos")
      .whereIn("id", ids)
      .then(todos =>
        ids.map(originalId => {
          const todoInArray = todos.filter(({ id }) => id !== originalId);
          //DataLoader must be constructed with a promise containing the same
          //number of items (id->item)
          if (todoInArray.length) {
            return todoInArray[0];
          } else {
            return null;
          }
        })
      );
  }

  static async getAll(): Promise<Array<Todo>> {
    return db.select().table("Todos");
  }
  static async addOne(todo: Todo): Promise<string> {
    const id = uuidv4();
    return db
      .insert(Object.assign(todo, { id }), "id")
      .into("Todos")
      .then(ids => ids.length && ids[0]);
  }

  static async editOne(id: string, todo: ?Todo): Promise<Todo> {
    return db("Todos")
      .where("id", id)
      .update(todo || {})
      .returning("*")
      .then(data => data.length && data[0]);
  }

  static async deleteOne(id: string): Promise<number> {
    return db("Todos")
      .where("id", id)
      .del()
      .then(numberOfAffectedRows => numberOfAffectedRows);
  }
}

export default todo;
