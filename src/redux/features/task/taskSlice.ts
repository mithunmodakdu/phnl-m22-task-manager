import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import { deleteUser } from "../user/userSlice";
// import { v4 as uuidv4 } from 'uuid';

interface IInitialState {
  tasks: ITask[];
  filter: "All" | "High" | "Medium" | "Low";
}

const initialState: IInitialState = {
  tasks: [
    {
      id: "G1imG5rU2Gk9DCqw4bMmm",
      isCompleted: false,
      title: "JavaScript",
      description:
        "JavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptvJavaScriptJavaScript",
      priority: "High",
      assignedTo: null,
      dueDate: "2025-07-16T18:00:00.000Z",
    },
    {
      id: "fHr2vMVIGE1zDlg4XJ398",
      isCompleted: false,
      title: "HTML",
      description: "htmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtmlhtml",
      priority: "Medium",
      assignedTo: "G1imG5rU2Gk9DCqw4bMm",
      dueDate: "2025-07-22T18:00:00.000Z",
    },
  ],
  filter: "All",
};

type DraftTask = Pick<
  ITask,
  "title" | "description" | "priority" | "dueDate" | "assignedTo"
>;

const createTaskData = (formTaskData: DraftTask): ITask => {
  return {
    ...formTaskData,
    id: nanoid(),
    isCompleted: false,
    assignedTo: formTaskData.assignedTo ? formTaskData.assignedTo : null,
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      // const id = uuidv4();

      // const taskData = {
      //   ...action.payload,
      //   id,
      //   isCompleted: false
      // }

      const taskData = createTaskData(action.payload);
      state.tasks.push(taskData);
    },

    toggleCompleteState: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateFilter: (
      state,
      action: PayloadAction<"All" | "High" | "Medium" | "Low">
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser, (state, action) => {
      state.tasks.forEach((task) =>
        task.assignedTo === action.payload ? (task.assignedTo = null) : task
      );
    });
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;
  if (filter === "High") {
    return state.todo.tasks.filter((task) => task.priority === "High");
  } else if (filter === "Medium") {
    return state.todo.tasks.filter((task) => task.priority === "Medium");
  } else if (filter === "Low") {
    return state.todo.tasks.filter((task) => task.priority === "Low");
  } else {
    return state.todo.tasks;
  }
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const { addTask, toggleCompleteState, deleteTask, updateFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
