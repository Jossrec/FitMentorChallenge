export class Task {
  constructor({ id, title, description, priority, storyPoints, status, createdAt, updatedAt, boardId }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.storyPoints = storyPoints;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.boardId = boardId;
  }

  isValid() {
    return this.title && this.title.trim().length > 0;
  }
}
