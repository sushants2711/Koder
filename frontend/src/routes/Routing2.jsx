import React from 'react'
import { Routes, Route } from "react-router-dom"
import { MainPage2 } from '../pages/Static2/MainPage2'
import { Signup } from '../pages/Auth/Signup'
import { Login } from '../pages/Auth/Login'
import { About } from '../pages/Static2/About'
import { Project } from '../pages/Projects/Project'
import { EditorProject } from '../pages/Projects/EditorProject'
import { Logout } from '../pages/Auth/Logout'

export const Routing2 = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainPage2 />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/about' element={<About />} />
                <Route path='/all/projects' element={<Project />} />
                <Route path='/editor/:id' element={<EditorProject />} />
            </Routes>
        </>
    )
}
