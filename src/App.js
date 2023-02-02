import React from 'react';
import {Outlet, Route, Routes} from "react-router-dom";  
import NavBar from './routes/NavBar';
import Home from './routes/Home'
//import ErrorPage from './routes/ErrorPage';
import { StoreConsumer } from "./contexts/store";
import Projects from './routes/Projects';
import Documentation from './routes/Documentation';
import Store from './routes/Store';
import Settings from './routes/Settings';
import Tabs from './components/Tabs/Tabs'
import Editor from './components/Editor/Editor';
import EmptyContainer from './components/Empty';

export default function App(){
  return(
    <StoreConsumer>
      {(data)=>(
        <div>
          <Tabs/>
          <div>
            <NavBar/>
            <Routes>
              <Route path='/' element={<EmptyContainer/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route 
                path='/projects' 
                element={
                  <>
                    <Projects/>
                    <Outlet/>
                  </>
                }
              >
                <Route path='/projects/:name' element={<Editor/>}/>
              </Route>
              <Route path='/store' element={<Store/>}/>
              <Route path='/documentation' element={<Documentation/>}/>
              <Route path='/settings' element={<Settings/>}/>
            </Routes>
          </div>
        </div>
      )}
    </StoreConsumer>
  )
}