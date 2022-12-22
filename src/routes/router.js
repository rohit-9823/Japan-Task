import React from 'react';
import { BrowserRouter ,Route,Switch} from 'react-router-dom';

import { Routes } from './mapper';
import { ProtectedRoute } from './protectedRoute';
import { PublicRoute } from './publicRoute';
export default function Router() {
  return (
      <BrowserRouter>
      <Switch>
        {
          Routes.map((item)=>{
            return item.type==="public"?
            <PublicRoute exact key={item.path} component={item.component} path={item.path}></PublicRoute>:
            <ProtectedRoute exact key={item.path}component={item.component} path={item.path}></ProtectedRoute>
        })
        }
        </Switch>
      </BrowserRouter>

  );
}
