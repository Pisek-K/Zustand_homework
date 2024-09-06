import { persist } from "zustand/middleware";
import axios from "axios";
import React from "react";
import { create } from "zustand";

const dataStore = (set) => ({
  arr: [{ id: 1, title: "best" ,status:true}],
  addArr: (newValue) =>
    set((state) => ({
      arr: [...state.arr, { id: Date.now(), title: newValue,status:false }],
    })),
  deleteArr: (id) =>
    set((state) => ({
      arr: state.arr.filter((item, index) => item.id !== id),
    })),
  editArr: (id, newValue) =>
    set((state) => ({
      arr: state.arr.map((item) =>
        item.id === id ? { ...item, title: newValue } : item
      ),
    })),
    updateStatus: (status, id) =>
      set((state) => ({
        arr: state.arr.map((item) =>
          item.id === id ? { ...item, status } : item
        ),
      })),
});

const usePersist = {
  name: "data-store",
  getStorage: () => localStorage,
  partialize: (state) => ({
    arr: state.arr,
  }),
};

const useStore = create(persist(dataStore, usePersist));

export default useStore;
