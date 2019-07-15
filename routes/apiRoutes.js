const mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'todo_db'
})

connection.connect(err => {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)
})

module.exports = app => {
  //show all todos
  app.get('/api', (req, res) => {
    connection.query('SELECT * FROM todos', (err, data) => {
      if (err) throw err
      res.send(data)
    })
  })
  //add a todo
  app.post('/api/todo', (req, res) => {
    connection.query(
      'INSERT INTO todos (text) VALUES (?)',
      [req.body.text],
      err => {
        if (err) throw err
        console.log('Todo item added')
      }
    )
  })
  //delete a todo
  app.delete('/api/todo', (req, res) => {
    connection.query(
      'DELETE FROM todos WHERE ?',
      {
        id: req.body.todoId
      },
      function(err, res) {
        if (err) throw err
        console.log('succesfully deleted')
      }
    )
  })
  //update a todo
  app.put('/api/todo/:id', (req, res) => {
    connection.query(
      'UPDATE todos SET text = ? WHERE id = ?',
      [req.body.updatedText, req.body.id],
      err => {
        if (err) throw err
        console.log('succesfully updated')
      }
    )
  })
}
