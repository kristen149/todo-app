export const DisplayCompleted = (props) => {

    const { completedlist, deleteTodo, moveTodo } = props;

    return (
        completedlist.map((item) => {

            return (
                <li>
                    <div className="buttons">
                        <button className="remove" onClick={() => deleteTodo(item.id, false)} >
                            <i className="fa fa-trash-alt"></i>
                        </button>
                    </div>
                    <span id={item.id} key={item.id} className="fade-in">{item.name}</span>
                    <div className="buttons">


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