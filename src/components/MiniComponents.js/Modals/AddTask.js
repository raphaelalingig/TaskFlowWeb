import React, { useEffect, useState } from "react";
import DueDateDropdown from "../DueDateDropdown";
import PriorityDropdown from "../PriorityDropdown";
import axios from "axios";

const AddTask = ({ closemodal, addNewTask, project_name }) => {
  const [taskName, setTaskName] = useState("");
  const [asignee, setAsignee] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const swal = require("sweetalert2");

  useEffect(() => {
    fetchProjectdata();
    fetchUsers();
  }, []);

  const fetchProjectdata = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch task data");
      }
      const data = await response.json();
      setProjectData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/user/");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const postdata = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/task/", {
        task_name: taskName,
        project_name: projectName,
        assignee: asignee,
        description: description,
        start_date: selectedStartDate,
        due_date: selectedEndDate,
      });
      console.log("Task added successfully", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskName);
    console.log(projectName);
    console.log(asignee);
    console.log(description);
    console.log("Selected Start Date: ", selectedStartDate);
    console.log("Selected End Date:", selectedEndDate);
    const newTask = {
      taskName,
      projectName,
      asignee,
      description,
      selectedStartDate,
      selectedEndDate,
    };
    console.log(newTask);
    addNewTask(newTask);
    postdata();
    swal.fire({
      title: "Task added successfully, Please reload the page",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });

    setTaskName("");
    setAsignee("");
    setDescription("");
    setSelectedStartDate("");
    setSelectedEndDate("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-none bg-gray-900 bg-opacity-30">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              New Task
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => closemodal(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type task name"
                  required
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project: Please Select "{project_name}"
                </label>

                <select
                  type="text"
                  name="project"
                  id="project"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Appointed person"
                  required
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                >
                  <option>Select a Project:</option>

                  {projectData.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.project_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  for="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Due Date
                </label>
                <DueDateDropdown
                  setSelectedStartDate={setSelectedStartDate}
                  setSelectedEndDate={setSelectedEndDate}
                />
              </div>
              <div>
                <label
                  for="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Asignee
                </label>

                <select
                  type="text"
                  name="asignee"
                  id="asignee"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  onChange={(e) => {
                    setAsignee(e.target.value);
                  }}
                >
                  {userdata.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div class="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write task description here"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add task
            </button>
            <button
              type="button"
              onClick={() => closemodal(false)}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
