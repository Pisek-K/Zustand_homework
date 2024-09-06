import React, { useState } from "react";
import useStore from "../datastore/datastore";
import { toast } from "react-toastify";

const Todolist = () => {
  const { arr, addArr, deleteArr, editArr, updateStatus } = useStore(
    (state) => ({
      arr: state.arr,
      addArr: state.addArr,
      deleteArr: state.deleteArr,
      editArr: state.editArr,
      updateStatus: state.updateStatus,
    })
  );

  const [input1, setInput1] = useState("");
  const [editingItem, setEditingItem] = useState("");
  const [editInput, setEditInput] = useState("");

  const handleClickAdd = () => {
    if (input1.trim() === "") {
      toast.error("Please enter a valid input");
      return;
    }
    addArr(input1);
    setInput1("");
    toast.success("Item added successfully");
  };

  const handleOnChange = (e) => {
    setInput1(e.target.value);
  };

  const handleClickDelete = (id) => {
    deleteArr(id);
    toast.error("Item deleted successfully");
  };

  const handleClickEdit = (item) => {
    setEditingItem(item.id);
    setEditInput(item.title);
  };

  const handleEditChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleSaveEdit = (id) => {
    if (editInput.trim() === "") {
      toast.error("Please enter a valid input");
      return;
    }
    editArr(id, editInput);
    setEditingItem("");
    setEditInput("");
    toast.success("Item updated successfully");
  };

  const handleClick2 = (status, id) => {
    updateStatus(!status, id);
  };

  return (
    <div className="flex flex-col w-3/4 md:w-1/2 lg:w-1/3 mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">To-Do List</h1>
      <div className="mb-4">
        <input
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={input1}
          onChange={handleOnChange}
        />
      </div>
      <button
        onClick={handleClickAdd}
        className="btn btn-success w-full mb-4 py-2 px-4 rounded-lg shadow-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add
      </button>
      <div className="list-disc pl-5 space-y-2">
        {arr.map((item) => {
          if (editingItem === item.id) {
            return (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
              >
                <input
                  className="input input-bordered flex-grow p-2 border rounded-md shadow-sm mr-2"
                  type="text"
                  value={editInput}
                  onChange={handleEditChange}
                />
                <button
                  onClick={() => handleSaveEdit(item.id)}
                  className="btn btn-success py-1 px-2 text-green-600 hover:bg-green-100 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  className={`btn btn-error py-1 px-2 text-red-600 hover:bg-red-100 rounded-lg ml-2`}
                >
                  Cancel
                </button>
              </div>
            );
          } else {
            return (
              <div
                onClick={() => handleClick2(item.status, item.id)}
                key={item.id}
                className={`flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm ${
                  item.status ? "line-through" : ""
                }`}
              >
                {item.title}
                <div>
                  {item.status ? null : (
                    <button
                      onClick={() => handleClickEdit(item)}
                      className="btn btn-warning py-1 px-2 text-yellow-600 hover:bg-yellow-100 rounded-lg"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleClickDelete(item.id)}
                    className="btn btn-error py-1 px-2 text-red-600 hover:bg-red-100 rounded-lg ml-2"
                  >
                    Del
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Todolist;
