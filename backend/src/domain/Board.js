export class Board {
  constructor({ id, name, createdAt, ownerId, tasks = [] }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.ownerId = ownerId;
    this.tasks = tasks;
  }

  static isValidName(name) {
    return typeof name === "string" && name.trim().length > 0;
  }
}
