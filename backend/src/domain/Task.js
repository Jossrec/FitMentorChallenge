export class Task {
  constructor({ id, title, description, priority, storyPoints, status, createdAt, updatedAt }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.storyPoints = storyPoints;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Reglas simples de negocio
  isValid() {
    return this.title && this.title.trim().length > 0;
  }
}
