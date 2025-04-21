const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { logAction } = require('./utils/auditLogger');

const app = express();
app.use(cors());
app.use(express.json());

const db = new Pool({ user: 'postgres', password: 'Lovealll@7', host: 'localhost', port: 5432, database: 'taskdb' });

app.post('/tasks', async (req, res) => {
	const { title, assignee, status } = req.body;
	await db.query('INSERT INTO tasks(title, assignee, status) VALUES($1, $2, $3)', [title, assignee, status]);

	await logAction(
		'CREATE_TASK',
		`Task created with title: ${title} and assigned to: ${assignee}`
	);

	res.status(201).json({ message: 'Task created' });
});

app.get('/tasks', async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM tasks ORDER BY id');
		res.json(result.rows);
	} catch (err) {
		console.error('Error fetching tasks:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.put('/tasks/:id/status', async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
		const result = await db.query(
			'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
			[status, id]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: 'Task not found' });
		}

		await logAction(
			'UPDATE_TASK',
			`Task status updated to "${status}" for task: ${result.rows[0].title}`
		);


		res.json(result.rows[0]);
	} catch (err) {
		console.error('Error updating task status:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.listen(4001, () => console.log('Task service running on port 4001'));
