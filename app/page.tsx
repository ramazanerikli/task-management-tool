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

  let localTasks;
  if (localStorage.getItem('tasks')) {
    localTasks = JSON.parse(localStorage.getItem('tasks') as any);
  } else {
    localTasks = [];
  }

  const saveToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  const [tasks, setTasks] = useState<Task[]>(localTasks);
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
    saveToLocalStorage(newTasks)
  };


  const completeTask = (id: string) => {
    const updatedTasks = tasks.map((task: Task) => {
      if (task.id === id) {
        if (task.status === "active") {
        return { ...task, status: "completed" };
        } else if (task.status === "completed") {
          return { ...task, status: "active" }
        }
      }
      return task;
    }) as Task[];
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
    console.log("task updated", updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task: Task) => (
      task.id !== id
    ))
    setTasks(updatedTasks)
    saveToLocalStorage(updatedTasks)
  }

  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

  const filterOptions = [
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


  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>({
    code: "0",
    name: "All tasks",
  });


  const handleFilterOption = (index: number) => {
    const selectedOption = filterOptions[index];
    setSelectedFilterOption(selectedOption);
    setFilterDropdownVisible(false);
  };

  const renderTasks = () => {
    let filteredTasks = tasks;
    if (selectedFilterOption.code === "1") {
      filteredTasks = tasks.filter(task => task.status === "active");
    } else if (selectedFilterOption.code === "2") {
      filteredTasks = tasks.filter(task => task.status === "completed");
    }
    return { count: filteredTasks.length, tasks: filteredTasks };
  };

  const { count, tasks: filteredTasks } = renderTasks();


  return (
    <div className="container mx-auto max-w-2xl py-5 px-2">
      <div className="flex flex-col">
        <div className="flex justify-between gap-3 py-3">
        <div className="lg:w-5/6">
          <input
            type="text"
            placeholder="Type a task..."
            className="border rounded-lg ps-4 w-full h-full"
            onChange={handleTaskChange}
            value={userInput}
          />
          </div>
          <div className="lg:w-1/6">
            <button 
              onClick={addTask}
              className="w-full bg-red-500 flex items-center justify-between gap-3 px-4 py-2 text-white text-sm rounded-lg">Add task</button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="lg:w-4/6">
          <p className="text-sm text-gray-400">{count} tasks found</p>
        </div>
        <div className="lg:w-2/6">
        <div className="relative">
          <ul>
            <li>
              <span
                onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
                className="flex items-center justify-start gap-3 px-4 py-2 text-white bg-black text-sm rounded-lg active"
              >
                <FaFilter />
                {filterOptions.map((item, index) => (
                  <>
                    {item.code === selectedFilterOption.code && (
                      <>{item.name}</>
                    )}
                  </>
                ))}
                <FaChevronDown className="ms-auto" />
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
            {filterOptions.map((item, index) => (
              <li className="me-2" key={index}>
                <button
                  onClick={() => handleFilterOption(index)}
                  className="flex px-4 py-2 gap-2 text-gray-500 text-sm font-medium text-sm rounded-lg"
                >
                  <span className="w-4 h-4 border border-black flex items-center justify-center rounded-full">
                    {selectedFilterOption.code === item.code && (
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
      <div className="tasks-list flex flex-col gap-2 mt-2">
      {filteredTasks.map((task, index) => (
          <TaskItem task={task} completeTask={completeTask} deleteTask={deleteTask} key={index} />
        ))}
      </div>
    </div>
  );
}
