export interface TodoType {
  _id: Id<'todos'>;
  _creationTime: number;
  text: string;
  isCompleted: boolean;
}

export type Todo = Doc<'todos'>;
