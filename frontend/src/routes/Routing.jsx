import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Home } from '../pages/Static/Home'
import { Signup } from '../pages/Auth/Signup'
import { Login } from '../pages/Auth/Login'
import { Logout } from '../pages/Auth/Logout'
import { Error404 } from '../pages/Auth/Error404'
import { Navbar } from '../components/Navbar'
import { About } from '../pages/Static/About'
import { Contact } from '../pages/Static/Contact'
import { Project } from '../pages/Projects/Project'
import { EditorProject } from '../pages/Projects/EditorProject'
import { CreateProject } from '../pages/Projects/CreateProject'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const Routing = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
                <Route path='/logout' element={<PrivateRoute><Logout /></PrivateRoute>} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/all/project' element={<PrivateRoute><Project /></PrivateRoute>} />
                <Route path='/create-project' element={<PrivateRoute><CreateProject /></PrivateRoute>} />
                <Route path='/editor/:id' element={<PrivateRoute><EditorProject /></PrivateRoute>} />
                <Route path='*' element={<Error404 />} />
            </Routes>
        </>
    )
}
