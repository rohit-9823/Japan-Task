import Insertform from "../components/landingPage/insertForm"
import InsertRecord from "../components/landingPage/outlayDesign"
import Login from "../components/Login/login"
import Register from "../components/Login/register"
import Construction from "../components/underConstruction/construction"
import Viewuser from "../components/User/viewUser"
export const Routes=[
    {
        name:"Login",
        component:Login,
        path:"/",
        type:"protected"
    },

    {
        name:"Register",
        component:Register,
        path:"/register",
        type:"protected"
    },
    {
        name:"InsertForm",
        component:Insertform,
        path:"/Dashboard",
        type:"public"
    },
    
    {
        name:"Construction",
        component:Construction,
        path:"/Construction",
        type:"public"
    },
    {
        name:"Viewuser",
        component:Viewuser,
        path:"/viewuser",
        type:"public"
    },
    

]