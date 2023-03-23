import { Outlet } from "react-router-dom";

const MainLayout : React.FC = () => <>
   
    <main>        
        <Outlet />
    </main>
   
</>;

export default MainLayout;