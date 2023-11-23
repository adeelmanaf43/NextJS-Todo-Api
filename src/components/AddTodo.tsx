"use client";
import { NewTodo } from "@/lib/drizzle";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTodo() {
  const [task, setTask] = useState<NewTodo | null>(null);
  const { refresh } = useRouter();
  const handleSubmit = async () => {
    try {
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: task.task }),
        });
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-x-3">
      <input
        placeholder="Enter new Task"
        className="border border-black p-2 w-full"
        onChange={(e) => setTask({ task: e.target.value })}
        type="text"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
