import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "../firebase.config";
import { Icon } from "@iconify/react/dist/iconify.js";

function TodoList({ user }) {
  const [snapshot] = useCollection(
    query(collection(database, "tasks"), where("owner", "==", user.uid))
  );

  function updateTaskStatus(id, done) {
    updateDoc(doc(database, "tasks", id), {
      done: !done,
    });
  }

  function addTask() {
    const taskName = prompt("Please enter the task name");

    addDoc(collection(database, "tasks"), {
      name: taskName,
      done: false,
      owner: user.uid,
    });
  }

  function editTaskName(id) {
    const newTaskName = prompt("Please enter the new task name");

    if (!newTaskName.trim()) {
      alert("No task name provided!");
      return;
    }

    updateDoc(doc(database, "tasks", id), {
      name: newTaskName,
    });
  }

  function deleteTask(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task? This action is not revertible!"
    );

    if (!confirmDelete) {
      return;
    }

    deleteDoc(doc(database, "tasks", id));
  }

  return (
    <ul className="p-6 space-y-2">
      {snapshot === undefined ? (
        <p>Loading data</p>
      ) : (
        snapshot.docs.map((task) => {
          const data = task.data();

          return (
            <li
              key={data.id}
              className="p-6 rounded-lg bg-zinc-800 flex items-center justify-between"
            >
              <p>{data.name}</p>
              <div className="flex items-center gap-4">
                <input
                  checked={data.done}
                  onClick={() => updateTaskStatus(task.id, data.done)}
                  type="checkbox"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => editTaskName(task.id)}
                    className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100/10 hover:text-zinc-100 transition-colors"
                  >
                    <Icon icon="tabler:pencil" className="size-5" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Icon icon="tabler:trash" className="size-5" />
                  </button>
                </div>
              </div>
            </li>
          );
        })
      )}
      <button
        onClick={addTask}
        className="w-full font-medium p-4 rounded-lg flex items-center bg-zinc-100 text-zinc-900 gap-3 justify-center"
      >
        <Icon icon="tabler:plus" className="size-5" />
        Add Task
      </button>
    </ul>
  );
}

export default TodoList;
