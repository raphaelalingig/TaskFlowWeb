import React, { useState, useEffect } from "react";
import Aside from "../Sidebars.js/Aside";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import StatusDropdown from "../MiniComponents.js/StatusDropdown";
import DueDateDropdown from "../MiniComponents.js/DueDateDropdown";
import PriorityDropdown from "../MiniComponents.js/PriorityDropdown";
import AddProject from "../MiniComponents.js/Modals/AddProject";
import axios from "axios";
import EditProject from "../MiniComponents.js/Modals/EditProject";

const swal = require("sweetalert2");

const Projects = () => {
  const [editProjectModal, setEditProjectModal] = useState(false); // State for edit modal
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project for editing
  const [projects, setProjects] = useState([]); // Initialize projects state
  const [addProjectModal, setAddprojectModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [projectdata, setProjectdata] = useState([]);
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    fetchprojects();
    fetchUsers();
  }, []);

  const fetchprojects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setProjectdata(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const addNewProject = (newProject) => {
    setProjects([...projects, newProject]);
  };
   const updateProject = (updatedProject) => {
     setProjectdata(
       projectdata.map((project) =>
         project.id === updatedProject.id ? updatedProject : project
       )
     );
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
  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/projects/${projectId}/`);
      // Remove the deleted group from the state
      setProjectdata(projectdata.filter((project) => project.id !== projectId));
      swal.fire({
        title: "Project deleted successfully",
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
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-60">
            <div className="flex pb-4 bg-white dark:bg-gray-900 flex-row justify-between ">
              <label for="table-search" class="sr-only">
                Search
              </label>

              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setAddprojectModal(true);
                }}
                className="mr-24 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                + Add Project
              </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Project Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                    <div class="flex items-center">
                      Due Date
                      <a href="#">
                        <svg
                          class="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectdata.map((project) => (
                  <tr key={project.id} value={project.id}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <Link to={`/projects/${project.project_name}`}>
                      <a className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-1000 dark:text-gray-400 dark:hover:text-white mt-4">
                        <td className="px-6 py-4">{project.project_name}</td>
                      </a>
                    </Link>
                    <td className="px-6 py-4">
                      <StatusDropdown />
                    </td>
                    <td className="px-6 py-4">
                      {project.start_date} - {project.due_date}
                    </td>

                    <td className="px-6 py-4">
                      <PriorityDropdown />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => {
                          setSelectedProject(project);
                          setEditProjectModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => deleteProject(project.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {addProjectModal && (
            <AddProject
              closemodal={setAddprojectModal}
              addNewProject={addNewProject}
            />
          )}
          {editProjectModal && selectedProject && (
            <EditProject
              closeModal={setEditProjectModal}
              project={selectedProject}
              updateProject={updateProject}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
