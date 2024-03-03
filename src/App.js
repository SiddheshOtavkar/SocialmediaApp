import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';

function App() {

    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    
    // const { auth } = useSelector(store => store)
    const auth = useSelector(state => state.auth);
    // You're still trying to destructure message and auth directly from the entire Redux store state. This will lead to unnecessary re-renders since any change in any part of the message or auth slices, or any other part of the Redux store, will trigger a re-render of this component.

    useEffect(() => {
        dispatch(getProfileAction(jwt))
    }, [jwt])

    return (
        <div className=''>
            <Routes>
                <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />
                <Route path='/message' element={<Message />} />
                {/* <Route path='/*' element={<Authentication />} /> */}
            </Routes>
        </div>
    );
}

export default App;
