import { Link, Outlet, useNavigation } from "react-router-dom";
import logo from '../assets/park-junk-food-fast-food (1).png';
import perfil from '../assets/perfil.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { createUser, newLogin } from "../utils/apiRoutes";

  export default function Root() {
    const [role, setRole] = useState(null);
    // Verifica se há usuário logado ao carregar o componente
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser && currentUser.role) {
      setLoggedin(true);
      setRole(currentUser.role);
    }
  }, []);
    
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const[newUser, setNewUser] = useState({
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      login: ""
    });
    const [newOperation, setNewOperation] = useState("");
    const [msgError, setMsgError] = useState("");
    const [loggedin, setLoggedin] = useState(false);
    const [showConfig, setShowConfig] = useState(false);

    //fecha modal e seta os valores
    const handleCloseModal = () => {
      setShowModal(false);
      setNewUser({ name: "", email: "", address: "", phone: "", password: "", login: ""});
    }

    //altera campos do formulario de acordo com a solicitação da operação
    const handleOpenModal = (operation: string) => {
      setNewOperation(operation);
      setShowModal(true);
    }

    //registrar usuario
    const registerUser = async () => {
      try {
        const { name, email, address, phone, password } = newUser;
        const response = await axios.post(createUser, {
          name,
          email,
          address,
          phone,
          password
        });

        console.log(response);
        window.alert("Registro realizado com sucesso! Você já pode fazer o login.");
        handleCloseModal();
      } catch (error) {
        console.log(error);
        setMsgError("Erro ao efetuar o cadastro, verifique os campos digitados!")
      }
    }

    //login
    const loginUser = async () => {
      const { login, password } = newUser;
      try {
        const response = await axios.post(newLogin, {
          login,
          password
        });

        const { role } = response.data;
        setRole(role);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        handleCloseModal();
        setLoggedin(true);
      } catch (error) {
        console.log(error);
        setMsgError("Dados incorretos!")
      }
    }

    //logout
    const logout = () => {
      localStorage.removeItem("currentUser");
      localStorage.clear();
      setLoggedin(false);
      setShowConfig(false);
      setRole(null);
    }

    return (
      <div className="flex flex-col sm:min-h-screen bg-slate-200">
        {/* Header */}
        <header className="flex flex-row justify-between items-center p-2 w-full h-14 bg-cyan-900 shadow-slate-700">
          <Link to={'/'} className="flex items-center p-2">
            <img src={logo} alt="logo foodiehub" className="w-8 sm:w-10" />
            <h1 className="text-lg sm:text-2xl text-gray-100 font-bold mx-2 sm:mx-5">FoodieHub</h1>
          </Link>
          {loggedin ? (
            <div className="flex items-center">
              <Link to={'orders/'} className="hidden sm:flex px-4 py-2 bg-teal-400 rounded text-sm sm:text-base">
                Meus Pedidos
              </Link>
              <img
                src={perfil}
                alt="Perfil"
                className="w-8 sm:w-10 ml-3 cursor-pointer"
                onClick={() => setShowConfig(!showConfig)}
              />
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded"
                onClick={() => handleOpenModal("Login")}
              >
                Login
              </button>
              <button
                className="bg-red-200 text-white px-3 sm:px-4 py-2 rounded"
                onClick={() => handleOpenModal("Registre-se")}
              >
                Registre-se
              </button>
            </div>
          )}
        </header>
  
        {/* Layout principal */}
        <div className="flex flex-1 flex-col sm:flex-row">
          {/* Sidebar */}
          <div className="w-full sm:w-56 bg-gray-100 border-r p-3 flex flex-col rounded-e-lg">
            <ul className="flex justify-between flex-row sm:flex-col sm:justify-normal">
              <li className="sm:mb-3">
                <Link to="" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Home
                </Link>
              </li>
              
              <li className="sm:mb-3">
                <Link to="/menu" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Cardápio
                </Link>
              </li>
              {loggedin && role === "admin" &&(<div className="sm:flex sm:flex-col flex flex-row"><li className="sm:mb-3">
                <Link to="/users" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Usuários
                </Link>
              </li>
              <li className="sm:mb-3">
                <Link to="/products" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Produtos
                </Link>
              </li>
              <li className="sm:mb-3">
                <Link to="/orders" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Pedidos
                </Link>
              </li></div>)}
            </ul>
          </div>
  
          {/* Detalhes */}
          <div className={`${navigation.state === "loading" ? "loading" : "flex-1 p-5"} overflow-auto`}>
            <Outlet />
          </div>
        </div>
  
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-96">
              <h1 className="text-xl sm:text-2xl">{newOperation}</h1>
              <span className="text-red-700">{msgError}</span>
  
              <form className="mt-3 space-y-4">
                {newOperation === "Registre-se" && (
                  <>
                    <div>
                      <label className="block mb-1">Nome</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={newUser.name}
                        onChange={(e) => {setNewUser({ ...newUser, name: e.target.value }); setMsgError('')}}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Endereço</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={newUser.address}
                        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Telefone</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      />
                    </div>
                  </>
                )}
                {newOperation === "Login" &&(<div>
                  <label className="block mb-1">Email ou telefone</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={newUser.login}
                    onChange={(e) => {setNewUser({ ...newUser, login: e.target.value }); setMsgError('')}}
                  />
                </div>)}
                <div>
                  <label className="block mb-1">Senha</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
              </form>
  
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="bg-gray-500 text-white px-3 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  className="bg-lime-600 text-white px-3 py-2 rounded"
                  onClick={newOperation === "Registre-se" ? registerUser : loginUser}
                >
                  {newOperation === "Registre-se" ? "Salvar" : "Entrar"}
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Configurações */}
        {showConfig && (
          <div className="absolute top-16 right-10 bg-slate-400 shadow-lg rounded p-4 w-36">
            <p className="mb-4 hover:text-orange-800 hover:underline cursor-pointer">Configurações</p>
            <button
              className="bg-red-300 text-white px-4 py-1 rounded cursor-pointer"
              onClick={logout}
            >
              <Link to="/">Sair</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
  