import NavbarCompt from "./components/Navbar/NavbarCompt/NavbarCompt";
import Admin from "./components/Navbar/pages/admin/admin";
import "./components/Navbar/styles/Styles/index.scss"
import {ROLE} from './global/const'
function App() {
  const role =JSON.parse(window.localStorage.getItem("role"))
  return (
    <div>
     {role===ROLE[1].value &&  <NavbarCompt />}
      {role!==ROLE[1].value  && <Admin/>}
    </div>
  );
}

export default App;
