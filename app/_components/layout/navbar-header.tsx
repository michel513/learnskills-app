import SidebarHeader from "./sidebar";
import MobileHeader from "./modile-header";

const NavbarHeader = () => {
    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm ">
            <MobileHeader/>
            <SidebarHeader/>
        </div>
     );
}
 
export default NavbarHeader;