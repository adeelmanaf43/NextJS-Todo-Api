"use client";
import { useState } from "react";
import { Todo } from "@/lib/drizzle";
import { useRouter } from "next/navigation";

export default function Task({ task }: any) {
  const [isEdit, setIsEdit] = useState(false);
  const [taskk, setTask] = useState(task);
  const [text, setText] = useState(task.task);
  const { refresh } = useRouter();
  let taskContent;

  const handleDelete = async () => {
    try {
      if (taskk.id) {
        await fetch("/api/todo", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: taskk.id }),
        });
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      if (taskk.id && taskk.task) {
        await fetch("/api/todo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: taskk.task, id: taskk.id }),
        });
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isEdit) {
    taskContent = (
      <>
        <input
          onChange={(e) => {
            setTask({ ...taskk, task: e.target.value });
            setText(e.target.value);
          }}
          value={taskk.task}
          type="text"
        />
        <button
          onClick={() => {
            setIsEdit(false);
            handleEdit();
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.task}
        <button onClick={() => setIsEdit(true)}>Edit</button>
      </>
    );
  }
  return (
    <div className="flex">
      {taskContent}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
