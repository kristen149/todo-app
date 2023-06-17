export const AddToDo = (props) => {
  
    const {todo, setTodo, addTodo, on} = props;

   

    return (
        <div className="card__add">
            <input className = {`${on? "slide":"Off"}`} 
            value = {todo} id="newTask" 
            type="text" 
            placeHolder="Add new activity..."
            onChange={(event) => setTodo(event.target.value)} />
            <button className = {`${on ? "buttonOn button-slide" : "buttonOff"}`}id="addItem" onClick={() => addTodo()} >
                <i className="fa fa-plus"></i>
            </button>
        </div>
    )


}