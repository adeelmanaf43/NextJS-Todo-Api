import { NewTodo, Todo } from "@/lib/drizzle";
import { getData } from "@/lib/data";
import Task from "./Task";

export default async function TodoList() {
  const data = await getData();
  return (
    <div>
      {data.res.map((item: Todo) => (
        <div className="flex gap-x-3 items-center bg-gray-200 mb-2 p-2">
          <div className="h-3 w-3 bg-gradient-to-r from-pink-300 to-orange-700 rounded-full"></div>
          <div>
            <Task task={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
