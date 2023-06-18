import img from "../img.png";
import '../App.css';
import _ from 'lodash';
import DateTime from './DateTime';
import WelcomeType from './WelcomeType';
import { useEffect, useState } from 'react';
import { DisplayUncompleted } from "./UncompletedToDo/DisplayUncompleted";
import { DisplayCompleted } from "./CompletedToDo/DisplayCompleted";
import { AddToDo } from "./AddToDo";

const Home = () => {

    // =============SET STATE====================
    const [nextId, setNextid] = useState(JSON.parse(localStorage.getItem('nextId')) || 1)
    const [todo, setTodo] = useState("");
    const [todolist, setTodolist] = useState(JSON.parse(localStorage.getItem('todolist')) || [])
    const [completedlist, setCompletedlist] = useState(JSON.parse(localStorage.getItem('completedlist')) || [])
    const [on, setToggle] = useState(false)
    const [editItemName, setEditItemName] = useState("")
  
    // =======================================
    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(todolist))

    }, [todolist])

    useEffect(() => {
        localStorage.setItem('completedlist', JSON.stringify(completedlist))

    }, [completedlist])
    useEffect(() => {
        localStorage.setItem('nextId', JSON.stringify(nextId))

    }, [nextId])


    // ADD ITEM TO UNCOMPLETED LIST====================================================
    const addTodo = () => {
        setToggle(!on)
        if (todo !== "") {
            let newtodoItem = {
                id: nextId, name: todo, isEditing: false
            }

            setTodolist([...todolist, newtodoItem]);
            setNextid(nextId + 1)
            setTodo("");
        }

    }


    // DELETE ITEM====================================================
    const deleteTodo = (id, fromSource) => {

        if (fromSource) {
            let listTodoARR__delete = _.clone(todolist)
            listTodoARR__delete = listTodoARR__delete.filter((item) => item.id !== id)
            //  REMEMBER TO SET STATE AGAIN!
            setTodolist(listTodoARR__delete)

        } else {
            let listTodoARR__delete = _.clone(completedlist)
            listTodoARR__delete = listTodoARR__delete.filter((item) => item.id !== id)
            //  REMEMBER TO SET STATE AGAIN
            setCompletedlist(listTodoARR__delete)
        }

    }


    // MOVE TODO FROM UNCOMPLETED TASKS TO COMPLETED TASKS=========================
    const moveTodo = (id) => {

        const itemToSwitch = todolist.find(item => item.id === id)
        if (itemToSwitch) {
            // Remove the item from the source array
            const updatedToDoList = todolist.filter(item => item.id !== id)
            setTodolist(updatedToDoList)

            // Add the item to the destination array
            const updatedCompletedList = [...completedlist, itemToSwitch]
            setCompletedlist(updatedCompletedList)


        } else {
            const itemToSwitchCompleted = completedlist.find(item => item.id === id)

            if (itemToSwitchCompleted) {
                // Remove the item from the source array
                const updatedCompletedToDoList = completedlist.filter(item => item.id !== id)
                setCompletedlist(updatedCompletedToDoList)

                // Add the item to the destination array
                const updatedToDoList = [...todolist, itemToSwitchCompleted]
                setTodolist(updatedToDoList)
            }

        }


    }

    // SHOW ONLY COMPLETED LIST, HIDE UNCOMPLETED LIST=========================================
    const [showCompletedlist, setShowCompletedlist] = useState(true)
    const toggleCompletedlist = () => {
        setShowCompletedlist(!showCompletedlist)
    }

    // SORT TODOLIST ALPHABETICALLY============================================================
    const sortListASC = (isASC) => {
        if (isASC) {
            const sortTodolist = [...todolist].sort((a, b) => a.name.localeCompare(b.name))
            setTodolist(sortTodolist)
            const sortCompletedlist = [...completedlist].sort((a, b) => a.name.localeCompare(b.name))
            setCompletedlist(sortCompletedlist)
        } else {
            const sortTodolist = [...todolist].sort((a, b) => b.name.localeCompare(a.name))
            setTodolist(sortTodolist)
            const sortCompletedlist = [...completedlist].sort((a, b) => b.name.localeCompare(a.name))
            setCompletedlist(sortCompletedlist)
        }

    }

    // EDIT TODO============================================================

    const handleKeyPress = (e, id, newName) => {
        if (e.key ==='Enter') {
            editTodo(id, newName)
        }
    }

    const editTodo = (id, newName) => {

        const updatedToDoList = todolist.map((item) => {
            if (item.id === id) {
                return { ...item, name: newName, isEditing: !item.isEditing }
            } else {
                return item

            }
            // OR: return item.id === id? updatedToDoList : item
        })
        setTodolist(updatedToDoList)
        setEditItemName("")
    }

    // INFO
    const handleClickInfo = () => {
        alert('Version 1.3, Kristen T')
    }



    // RENDER VIEW----------------------------------------------------------------------------------------------------
    return (

        <div className="card">
            <div className="card__header">
                <img src={img} alt='todoApp' />
            </div>

            <div className="card__body">
                <div className="filter-btn">
                    <a id="one" href="#" onClick={toggleCompletedlist}><i className="fa fa-check-circle"></i></a>
                    <a id="two" href="#" onClick={() => sortListASC(false)}><i className="fa fa-sort-alpha-down"></i></a>
                    <a id="three" href="#" onClick={() => sortListASC(true)}><i className="fa fa-sort-alpha-up"></i></a>
                    <a id="all" href="#" onClick={() => handleClickInfo()}><i class="fa-solid fa-circle-info"></i></a>
                    <span className="toggle-btn">
                        <i className="fa fa-filter"></i>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div className="card__content">
                    <div className="card__title">
                        <h2 className='welcome__type'><WelcomeType /></h2>

                        <p><i className="fa fa-calendar-alt"></i> <DateTime /></p>
                        <div className="tasks__count">
                            <div className="tasks-item">
                                <p className="title">Total</p>

                                <p>{todolist.length + completedlist.length}</p>
                            </div>
                            <div className="tasks-item">
                                <p className="title">Remaining</p>
                                <p>{todolist.length}</p>
                            </div>
                            <div className="tasks-item">
                                <p className="title">Done</p>
                                <p>{completedlist.length}</p>
                            </div>

                        </div>

                    </div>

                    <AddToDo
                        todo={todo}
                        setTodo={setTodo}
                        addTodo={addTodo}
                        on={on}
                        setToggle={setToggle}

                    />


                    <div className="todo__list">
                        <p>MY TO-DO LIST</p>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks  */}
                        {showCompletedlist && (
                            <ul className="todo scale-in" id="todo">

                                <DisplayUncompleted
                                    todolist={todolist}
                                    deleteTodo={deleteTodo}
                                    moveTodo={moveTodo}
                                    editTodo={editTodo}
                                    editItemName={editItemName}
                                    setEditItemName={setEditItemName}
                                    handleKeyPress= {handleKeyPress}

                                />

                            </ul>
                        )}
                        {/* Completed tasks */}
                        <ul className="todo scale-in" id="completed">
                            <DisplayCompleted
                                completedlist={completedlist}
                                deleteTodo={deleteTodo}
                                moveTodo={moveTodo}

                            />

                        </ul>

                    </div>

                </div>

            </div>

        </div>


    );
}

export default Home;
