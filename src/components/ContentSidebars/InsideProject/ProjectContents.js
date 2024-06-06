import React, { useState, useEffect } from "react";
import Aside from "../../Sidebars.js/Aside";
import { Link } from "react-router-dom";
import StatusDropdown from "../../MiniComponents.js/StatusDropdown";
import DueDateDropdown from "../../MiniComponents.js/DueDateDropdown";
import PriorityDropdown from "../../MiniComponents.js/PriorityDropdown";
import AddTask from "../../MiniComponents.js/Modals/AddTask";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import EditTask from "../../MiniComponents.js/Modals/EditTask";
import axios from "axios";

const ProjectContents = ({}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { project_name } = useParams();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const swal = require("sweetalert2");

  useEffect(() => {
    fetchTaskData();
  }, [project_name]);
  console.log(project_name);

  const fetchTaskData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/projects/${project_name}/tasks/`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setTaskData(data);
    } catch (error) {}
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = taskData.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskData(updatedTasks);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };
  const addNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setModalOpen(false);
  };
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8080/api/projects/${project_name}/tasks/${taskId}/`
      );
      // Remove the deleted task from the state
      setTaskData(taskData.filter((task) => task.id !== taskId));
      swal.fire({
        title: "Task deleted successfully",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Aside />
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg pb-60">
            <div class="flex pb-4 bg-white dark:bg-gray-900 flex-row justify-between">
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative mt-1">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li class="inline-flex items-center">
                    <Link to="/dashboard">
                      <div
                        href="/dashboard"
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        <svg
                          class="w-3 h-3 me-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <svg
                        class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <Link to="/projects">
                        <div class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                          Projects
                        </div>
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div class="flex items-center">
                      <svg
                        class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                        {project_name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>{" "}
              <div>
                <button
                  type="submit"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  class="text-white mr-24 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  + Add Task
                </button>
              </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Task
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Due Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Assignee
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody>
                {taskData.map((task) => (
                  <tr
                    key={task.id}
                    value={task.id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="checkbox-table-search-1" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.task_name}
                    </th>
                    {/* <td class="px-6 py-4">{task.project_username}</td> */}
                    <td class="px-6 py-4">
                      <StatusDropdown />
                    </td>
                    <td class="px-6 py-4">
                      {task.start_date} - {task.due_date}
                    </td>
                    <td class="px-6 py-4">{task.get_user_name}</td>
                    <td class="px-6 py-4">
                      <PriorityDropdown />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => handleEditClick(task)}
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => deleteTask(task.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <AddTask
              closemodal={setModalOpen}
              addNewTask={addNewTask}
              project_name={project_name}
            />
          )}
          {isEditModalOpen && (
            <EditTask
              closemodal={setEditModalOpen}
              task={selectedTask}
              updateTask={updateTask}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectContents;
