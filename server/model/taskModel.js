const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  //id of task's admin
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //id of team member whom to assign
    documents: [{ type: String }], // Store file paths or URLs
  });
  const Task = mongoose.model('Task', taskSchema);