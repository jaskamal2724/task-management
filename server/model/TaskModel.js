import mongoose from "mongoose";

const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["Done", "Not Done"], default: "Not Done" },
});

const TaskSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    subtasks: [SubtaskSchema],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
