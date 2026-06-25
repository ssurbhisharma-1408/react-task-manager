import pool from '../config/db.js'

// GET /api/tasks — sare tasks lao
const getAllTasks = async (req, res) => {
  try {
    const { search } = req.query;

    let query = "SELECT * FROM tasks ORDER BY created_at DESC";
    let values = [];

    // Search filter — title ya description mein
    if (search) {
      query = `
        SELECT * FROM tasks
        WHERE title ILIKE $1 OR description ILIKE $1
        ORDER BY created_at DESC
      `;
      values = [`%${search}%`];
    }

    const result = await pool.query(query, values);
    res.json({ success: true, tasks: result.rows });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/tasks — naya task banao
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ success: false, message: "Title required" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description)
       VALUES ($1, $2) RETURNING *`,
      [title.trim(), description?.trim() || null]
    );

    res.status(201).json({ success: true, task: result.rows[0] });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/tasks/:id/status — status update karo
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["todo", "progress", "completed", "deleted"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const result = await pool.query(
      `UPDATE tasks
       SET status = $1, updated_at = NOW()
       WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, task: result.rows[0] });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/tasks/:id — task edit karo (title + description)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ success: false, message: "Title required" });
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [title.trim(), description?.trim() || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, task: result.rows[0] });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/tasks/:id — permanently delete
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted permanently" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  getAllTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
};