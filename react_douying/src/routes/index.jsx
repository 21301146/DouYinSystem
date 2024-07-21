import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Player from '../pages/Player'
import Login from '../pages/Login'
const Mine = lazy(() => import('../pages/Mine'))
const UserDetail = lazy(() => import('../pages/UserDetail'))
// const Login = lazy(() => import('../pages/Login'))
const Sign = lazy(() => import('../pages/Sign'))
const UploadComponent = lazy(() => import('../pages/Upload'))

const RoutesConfig = () => (
    <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/mine' element={<Mine />}></Route>
        <Route path='/userdetail/:id' element={<UserDetail />}></Route>
        <Route path='/player/:id' element={<Player />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign' element={<Sign />}></Route>
        <Route path='/upload' element={<UploadComponent />}></Route>
    </Routes>
)

export default RoutesConfig