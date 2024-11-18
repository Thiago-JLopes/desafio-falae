import { Link, Outlet } from "react-router-dom";
import logo from '../assets/park-junk-food-fast-food (1).png';

  export default function Root() {
    return (
      <div className="flex flex-col h-screen bg-slate-200">
        {/* Header */}
        <header className="flex flex-row justify-between items-center p-2 w-full h-14 bg-cyan-900 shadow-slate-700">
          <Link to={'/'} className="flex flex-row justify-center items-center p-2">
            <img src={logo} alt="logo foodiehub" className="w-10"/>
            <h1 className="text-2xl text-gray-950 font-bold mx-5">FoodieHub</h1>            
          </Link>
        </header>
  
        {/* Layout principal */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="h-full w-56 bg-gray-100 border-r p-3 flex flex-col rounded-e-lg">
          <ul>
            <li>
                <Link to="/home" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Home</Link>
            </li>
            
            <li>
                <Link to="/users" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Clientes</Link>
            </li>
            
            <li>
                <Link to="/products" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Produtos</Link>
            </li>
            
            <li>
                <Link to="/pedidos" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">Pedidos</Link>
            </li>
           </ul>

          </div>
  
          {/* Detalhes */}
          <div className="flex-1 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
  