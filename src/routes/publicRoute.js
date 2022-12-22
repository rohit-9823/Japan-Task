import { Route } from "react-router";
import Outlaydesign from "../components/landingPage/outlayDesign";



export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          return(
            <div>
                <Outlaydesign/>
                <Component {...routeProps}></Component>
                
            </div>
          );
        }}
      ></Route>
    );
  };