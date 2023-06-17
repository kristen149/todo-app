export const DisplayUncompleted = (props) => {

    const { todolist, deleteTodo, moveTodo, edit, editTodo, editItemName,setEditItemName, handleKeyPress } = props;

    return (
        todolist.map((item) => {

            return (
                <li>
                    {
                        edit? (
           
                    <span id={item.id} key={item.id} className="fade-in">{item.name}</span>
                    ) :
                    <input type='text' id={item.id} key={item.id} className="fade-in" value= {editItemName}
                        onChange={e => setEditItemName(e.target.value)} onKeyDown = {e => handleKeyPress(item.id, e)}
                    />


                }

                    <div className="buttons">

                        <button className="remove" onClick={() => editTodo(item.id, editItemName)} >
                            <i class="fas fa-edit"></i>
                        </button>

                        <button className="remove" onClick={() => deleteTodo(item.id, true)} >
                            <i className="fa fa-trash-alt"></i>
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