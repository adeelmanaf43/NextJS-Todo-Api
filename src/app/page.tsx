import Image from "next/image";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="pt-20 bg-gradient-to-tr from-pink-500 to-orange-700 h-screen">
      <div className="max-w-md mx-auto">
        <TodoList />
        <AddTodo />
      </div>
    </main>
  );
}
