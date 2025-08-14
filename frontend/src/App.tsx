import { useCallback, useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import type { Task } from './types/types';
import { TaskList } from './components/TaskList';

//TODO: if have time then use .env file
export const API_BASE_URL = "http://localhost:4000/api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);


  const fetchTasks = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  return (
    <TaskList
    tasks={tasks} />
  )
}

export default App
