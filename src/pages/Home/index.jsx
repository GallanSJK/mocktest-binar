import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getApi } from '../../store/todos/todosApi';
import './home.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getApi());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTodos(data);
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos([...todos, {title: input, id: Math.random() * 100}]);
        setInput('');
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(item => item.id !== id))
    };

    const handleCompleted = (id) => {
        setTodos(todos.map(item => {
            if(item.id === id) {
                return {...item, completed: !item.completed}
            } else return item
        }))
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <>
            <div className="home">
            <div className="home-container">
                <div className="home__up">
                    <h5 className='home__user'>{user}</h5>
                    <Button className='home__logout' variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </div>
                <h1 className='home__title'>Todo App</h1>
                <div>
                    <form className="home__form" onSubmit={handleSubmit}>
                        <input className='home__form-input' value={input} type="text" placeholder='Enter a todo . . .' onChange={(e) => setInput(e.target.value)}/>
                        <Button className='home__form-button' variant="info" type='submit'>Add</Button>
                    </form>
                </div>
                <div>
                    {
                        todos && todos.map(todo => (
                            <div className="home__todos" key={todo.id}>
                                <p className={`home__todos-title ${todo.completed? 'completed': ''}`}>{todo.title}</p>
                                <div className="home__todos-button">
                                    <Button onClick={() => handleCompleted(todo.id)} variant="success">Finish</Button>
                                    <Button onClick={() => handleDelete(todo.id)} variant="danger">Delete</Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        </>
    )
}