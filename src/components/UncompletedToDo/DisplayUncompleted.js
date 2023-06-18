export const DisplayUncompleted = (props) => {

    const { todolist, deleteTodo, moveTodo, editTodo, editItemName, setEditItemName } = props;

    return (
        todolist.map((item) => {

            return (
                <li>
                    <div className="buttons">
                        <button className="remove" onClick={() => deleteTodo(item.id, true)} >
                            <i className="fa fa-trash-alt"></i>
                        </button>
                        {/* TEMPORARY SOLUTION */}
                        <button className="search" >
                            <i className="fa fa-search"></i>
                        </button>
                    </div>


                    {item.isEditing ? (

                        <input type='text'
                            id={item.id}
                            key={item.id}
                            className="fade-in"
                            value={editItemName}
                            onChange={e => setEditItemName(e.target.value)}
                        />

                    ) :
                        <span id={item.id}
                            key={item.id}
                            className="fade-in">{item.name}</span>

                    }


                    <div className="buttons">

                        <button className="edit" onClick={() => editTodo(item.id, editItemName)} >
                            <i class="fas fa-edit"></i>
                        </button>

                        <button className="complete" >
                            <i className="fa fa-check-circle" onClick={() => moveTodo(item.id)}></i>
                        </button>
                    </div>

                </li>

            )
        }
        )

    )


}