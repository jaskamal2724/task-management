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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to calculate progress percentage
TaskSchema.virtual("progress").get(function () {
  if (this.subtasks.length === 0) return 0;
  const completed = this.subtasks.filter((sub) => sub.status === "Done").length;
  return Math.round((completed / this.subtasks.length) * 100);
});

// Convert virtuals to JSON and Objects
TaskSchema.set("toJSON", { virtuals: true });
TaskSchema.set("toObject", { virtuals: true });

const Task = mongoose.model("Task", TaskSchema);
export default Task;
