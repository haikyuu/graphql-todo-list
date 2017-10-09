export type priority = "HIGH" | "MEDIUM" | "LOW";

export type todo = {
  id: number,
  text: string,
  dueDate?: string,
  priority?: Priority
};
