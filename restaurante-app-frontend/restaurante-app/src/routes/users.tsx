import { useState, useEffect } from "react";
import axios from "axios";
import { createUser, getUsers, updateUser } from "../utils/apiRoutes";

// Definição do tipo para usuários
type User = {
  id: number | null;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
};

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: null,
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "user",
  });
  const [users, setUsers] = useState<User[]>([]); // Define o tipo como um array de `User`
  const [isEditing, setIsEditing] = useState(false);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const currentUser = localStorage.getItem("currentUser");
  
      if (!currentUser) {
        throw new Error("Usuário atual não encontrado no localStorage.");
      }
  
      const user: User = JSON.parse(currentUser);
  
      if (!user || !user.id) {
        throw new Error("Dados do usuário inválidos no localStorage.");
      }
  
      const response = await axios.get(`${getUsers}currentUserId=${user.id}`); 
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setNewUser({ id: null, name: "", email: "", address: "", phone: "", role: "user" });
    setIsEditing(false);
    setMsgError("");
  };

  const handleOpenModal = (user: User | null = null) => {
    if (user) {
      setNewUser(user);
      setIsEditing(true);
    } else {
      setNewUser({ id: null, name: "", email: "", address: "", phone: "", role: "user" });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const saveUser = async () => {
  };

  const promoteToAdmin = async (id: number | null) => {
    
  };

  return (
    <div>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => handleOpenModal()}>
        Cadastrar Usuário
      </button>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Endereço</th>
            <th className="py-2 px-4 border-b">Telefone</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.address}</td>
              <td className="py-2 px-4 border-b">{user.phone}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleOpenModal(user)}>
                  Editar
                </button>
                {user.role !== "admin" && (
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => promoteToAdmin(user.id)}>
                    Tornar Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h1 className="text-2xl">{isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}</h1>
            <span className="text-red-700 text-sm font-bold">{msgError}</span>
            <form className="mt-3">
              <div className="mb-4">
                <label className="block mb-1">Nome</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Endereço</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Telefone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
            </form>
            <div>
              <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveUser}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
