export const DisplayUncompleted = (props) => {

    const { todolist, deleteTodo, moveTodo } = props;

    return (
        todolist.map((item) => {

            return (
                <li>
                    <span id={item.id} key={item.id} className="fade-in">{item.name}</span>
                    <div className="buttons">

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