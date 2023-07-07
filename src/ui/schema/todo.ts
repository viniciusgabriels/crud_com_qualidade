import { z as schema } from "zod";

// Model ou Schema
// interface ITodo {
//   id: string;
//   content: string;
//   date: Date;
//   done: boolean;
// }

export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().nonempty(),
  date: schema.string().datetime(),
  done: schema.boolean(),
});

export type ITodo = schema.infer<typeof TodoSchema>;
