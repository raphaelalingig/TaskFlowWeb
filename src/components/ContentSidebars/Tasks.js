//   import React from "react";
// import Aside from "../Sidebars.js/Aside";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useState, useEffect } from "react";
// import StatusDropdown from "../MiniComponents.js/StatusDropdown";
// import PriorityDropdown from "../MiniComponents.js/PriorityDropdown";
// import axios from "axios";
// import EditTask from "../MiniComponents.js/Modals/EditTask";

// const Tasks = () => {
//   const [selected1stDate, setSelected1stDate] = useState(null);
//   const [selected2ndDate, setSelected2ndDate] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [taskdata, setProjectdata] = useState([]);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   const swal = require("sweetalert2");

//   useEffect(() => {
//     fetchtasks();
//   }, []);

//   const fetchtasks = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8080/api/task/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//       const data = await response.json();
//       setProjectdata(data); // Set the retrieved users in state
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error if needed
//     }
//   };
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   const deleteTask = async (taskId) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8080/api/task/${taskId}/`);
//       // Remove the deleted group from the state
//       setProjectdata(taskdata.filter((task) => task.id !== taskId));
//       swal.fire({
//         title: "Task deleted successfully",
//         icon: "success",
//         toast: true,
//         timer: 3000,
//         position: "top-right",
//         timerProgressBar: true,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   const updateTask = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === updatedTask.id ? updatedTask : task
//     );
//     setTasks(updatedTasks);
//   };
//   const handleEditClick = (task) => {
//     setSelectedTask(task);
//     setEditModalOpen(true);
//   };

//   return (
//     <>
//       <Aside />
//       <div class="p-4 sm:ml-64 ">
//         <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//           <div class="relative overflow-x-auto shadow-md sm:rounded-lg pb-60">
//             <div class="pb-4 bg-white dark:bg-gray-900">
//               <label for="table-search" class="sr-only">
//                 Search
//               </label>
//               <div class="relative mt-1">
//                 <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
//                   <svg
//                     class="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   id="table-search"
//                   class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Search for items"
//                 />
//               </div>
//             </div>
//             <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//               <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                 <tr>
//                   <th scope="col" class="p-4">
//                     <div class="flex items-center">
//                       <input
//                         id="checkbox-all-search"
//                         type="checkbox"
//                         class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <label for="checkbox-all-search" class="sr-only">
//                         checkbox
//                       </label>
//                     </div>
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Task Name
//                   </th>
//                   {/* <th scope="col" class="px-6 py-3">
//                     Project Name
//                   </th> */}
//                   <th scope="col" class="px-6 py-3">
//                     Status
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Due Date
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Description
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Priority
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {taskdata.map((task) => (
//                   <tr
//                     key={task.id}
//                     value={task.id}
//                     class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   >
//                     <td class="w-4 p-4">
//                       <div class="flex items-center">
//                         <input
//                           id="checkbox-table-search-1"
//                           type="checkbox"
//                           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                         />
//                         <label for="checkbox-table-search-1" class="sr-only">
//                           checkbox
//                         </label>
//                       </div>
//                     </td>
//                     <th
//                       scope="row"
//                       class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                     >
//                       {task.task_name}
//                     </th>
//                     {/* <td class="px-6 py-4">{task.project_username}</td> */}
//                     <td class="px-6 py-4">
//                       <StatusDropdown />
//                     </td>
//                     <td class="px-6 py-4">
//                       {task.start_date} - {task.start_date}
//                     </td>
//                     <td class="px-6 py-4">{task.description}</td>
//                     <td class="px-6 py-4">
//                       <PriorityDropdown />
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         type="button"
//                         class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                         onClick={() => handleEditClick(task)}
//                       >
//                         EDIT
//                       </button>
//                       <button
//                         type="button"
//                         class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                         onClick={() => deleteTask(task.id)}
//                       >
//                         DELETE
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         {isEditModalOpen && (
//           <EditTask
//             closemodal={setEditModalOpen}
//             task={selectedTask}
//             updateTask={updateTask}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Tasks;
