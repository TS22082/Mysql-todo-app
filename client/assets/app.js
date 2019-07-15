getAllTodos = () => {
  $('#todoList').empty()
  $.get('/api', data => {
    data.forEach(element => {
      $('#todoList').append(
        `<p>${element.text}</p>` +
          `<button data-id="${element.id}" id="deleteButton">Delete</button>` +
          `<button data-id="${element.id}" id="updateButton">Update</button>` +
          '<hr>'
      )
    })
  })
}

$(document).ready(function() {
  getAllTodos()

  $('#todoSumbit').on('click', e => {
    e.preventDefault()
    const todoText = $('#textInput').val()
    let todo = {
      text: todoText
    }

    $.ajax({
      url: '/api/todo',
      method: 'POST',
      data: todo
    }).then(getAllTodos())
  })

  $(document).on('click', '#deleteButton', function() {
    const id = $(this).attr('data-id')
    const todo = {
      todoId: id
    }
    $.ajax({
      url: '/api/todo',
      method: 'DELETE',
      data: todo
    }).then(getAllTodos())
  })

  $(document).on('click', '#updateButton', function() {
    const updateId = $(this).attr('data-id')
    const text = $('#textInput')
      .val()
      .trim()
    console.log('update id: ' + updateId)
    const todo = {
      updatedText: text,
      id: updateId
    }
    $.ajax({
      url: '/api/todo/' + todo.id,
      method: 'PUT',
      data: todo
    }).then(getAllTodos())
  })
})
