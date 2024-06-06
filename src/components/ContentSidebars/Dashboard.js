import React, { useState, useEffect } from "react";
import Aside from "../Sidebars.js/Aside";

const Dashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    fetchprojects();
    fetchtasks();
  }, []);
  const fetchprojects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setProjectData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchtasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/task/");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setTaskData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("ProjectData: ", projectData);
  return (
    <>
      <Aside />

      <div class="p-4 sm:ml-64 bg-gray-200">
        <div class="p-4 border-2 border-gray-200 bg-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="grid grid-cols-2 gap-4 mb-4 bg-">
            <div class="flex items-center  justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-black-50 dark:text-gray-500">Open Projects: {projectData.length}</p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-black-50 dark:text-gray-500">
                Open Tasks: {taskData.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex rounded bg-gray-50 dark:bg-gray-800">
              <div
                className="text-xl m-10 text-black-50 dark:text-gray-500 overflow-y-auto"
                style={{ height: "20rem", width: "40rem" }}
              >
                <p>Projects:</p>
                <div className="ml-24">
                  {projectData.map((project) => (
                    <p key={project.id} value={project.id}>
                      {project.project_name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex rounded bg-gray-50 dark:bg-gray-800">
              <div
                className="text-xl m-10 text-black-50 dark:text-gray-500 overflow-y-auto"
                style={{ height: "20rem", width: "40rem" }}
              >
                <p>Task:</p>
                <div className="ml-24">
                  {taskData.map((task) => (
                    <p key={task.id} value={task.id}>
                      {task.task_name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
