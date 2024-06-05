"use client";
import { ChangeEvent, useState } from "react";
import { BiTask } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "./components/task-item";

interface Task {
  id: string;
  text: string;
  status: "active" | "completed";
}

interface FilterOption {
  code: string;
  name: string;
}



export default function Home() {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [userInput, setUserInput] = useState("");

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const addTask = () => {
    if (!userInput) return;
    const newTask = {
      id: uuidv4(),
      text: userInput,
      status: "active",
    };
    const newTasks = [...tasks, newTask] as Task[];
    setTasks(newTasks);
    setUserInput("");
    console.log(tasks);
  };


  const completeTask = (id: string) => {
    const updatedTasks = tasks.map((task: Task) => {
      if (task.id === id) {
        return { ...task, status: "completed" };
      }
      return task;
    }) as Task[];
    setTasks(updatedTasks);
    console.log("task updated", updatedTasks);
  };

  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

  const [selectedOrderFilterOption, setSelectedOrderFilterOption] =
    useState("0");

  const orderFilterOptions = [
    {
      code: "0",
      name: "All tasks",
    },
    {
      code: "1",
      name: "Active tasks",
    },
    {
      code: "2",
      name: "Completed tasks",
    },
  ];

  const handleFilterOption = (index: number) => {
    const selectedOption = orderFilterOptions[index].code;
    setSelectedOrderFilterOption(selectedOption);
    setFilterDropdownVisible(false);
  };

  return (
    <div className="container mx-auto max-w-2xl py-5">
      <div className="flex justify-between">
        <div className="lg:w-4/6">
          <button className="bg-red-500 flex items-center justify-between gap-3 px-4 py-2 text-white text-sm rounded-lg" onClick={() => setShowTaskModal(true)}>
            Add a new task
          </button>
        </div>
        <div className="lg:w-2/6">
        <div className="relative">
          <ul>
            <li>
              <span
                onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
                className="flex items-center justify-between gap-3 px-4 py-2 text-white bg-black text-sm rounded-lg active"
              >
                <FaFilter />
                {orderFilterOptions.map((item, index) => (
                  <>
                    {item.code === selectedOrderFilterOption && (
                      <>{item.name}</>
                    )}
                  </>
                ))}
                <FaChevronDown />
              </span>
            </li>
          </ul>
          <ul
            className={
              filterDropdownVisible
                ? "flex flex-col order-filter-options absolute bg-white w-full"
                : "flex flex-col order-filter-options absolute bg-white hidden"
            }
          >
            {orderFilterOptions.map((item, index) => (
              <li className="me-2" key={index}>
                <button
                  onClick={() => handleFilterOption(index)}
                  className="flex px-4 py-2 gap-2 text-gray-500 text-sm font-medium text-sm rounded-lg"
                >
                  <span className="w-4 h-4 border border-black flex items-center justify-center rounded-full">
                    {selectedOrderFilterOption === item.code && (
                      <span className="w-2 h-2 bg-black rounded-full flex"></span>
                    )}
                  </span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={
          showTaskModal
            ? "bg-gray-900/20 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            : "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        }
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setShowTaskModal(false)}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <BiTask />
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Type a task..."
                  onChange={handleTaskChange}
                  value={userInput}
                />
              </div>
              <button
                onClick={addTask}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="tasks-list flex flex-col gap-2 mt-2">
        {tasks.map((task: any, index: number) => (
          <TaskItem 
            task={task} 
            completeTask={completeTask}
            key={index} 
          />
        ))}
      </div>
    </div>
  );
}
