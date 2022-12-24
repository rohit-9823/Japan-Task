import Insertform from "../components/landingPage/insertForm"
import InsertRecord from "../components/landingPage/outlayDesign"
import Login from "../components/Login/login"
import Register from "../components/Login/register"
import Construction from "../components/underConstruction/construction"
import Viewproduct from "../components/Product/viewProduct"
import Viewuser from "../components/User/viewUser"
import Insertuser from "../components/User/insertUser"
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
        name:"Viewproduct",
        component:Viewproduct,
        path:"/viewproduct",
        type:"public"
    },
    {
        name:"Viewuser",
        component:Viewuser,
        path:"/viewuser",
        type:"public"
    },
    {
        name:"Insertuser",
        component:Insertuser,
        path:"/insertuser",
        type:"public"
    },
    

]