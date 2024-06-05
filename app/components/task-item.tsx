"use client";
import { FC } from "react";
import { LiaCheckCircle, LiaTrashAlt } from "react-icons/lia";


interface Task {
  id: string;
  text: string;
  status: "active" | "completed";
}

const TaskItem: FC<{
  task: Task,
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
}> = ({
  task,
  completeTask,
  deleteTask
}) => {

  return (
    <div
    className="flex items-center justify-start gap-2 bg-white rounded-xl border border-gray-200 p-3"
  >
    <span
      role="button"
      onClick={() => completeTask(task.id)}
      className={
        task.status === "completed"
          ? "w-6 h-6 rounded-full bg-green-500 border-green-500 flex items-center justify-center"
          : "w-6 h-6 rounded-full bg-white border border-gray-200 hover:bg-green-500 hover:border-green-500 flex items-center justify-center"
      }
    >
      <LiaCheckCircle
        className={
          task.status === "completed"
            ? "text-white"
            : "text-gray-300 hover:text-white"
        }
      />
    </span>
    <p>{task.text}</p>
    <span 
      role="button" 
      onClick={() => deleteTask(task.id)}
      className="ms-auto w-6 h-6 bg-red-200 flex items-center justify-center rounded-full">
      <LiaTrashAlt className="text-red-400" />
    </span>
  </div>
  );
};

export default TaskItem;
