import { useState } from "react";
import { createUser } from "../utils/apiRoutes";
import axios from "axios";

export default function Users() {
    const[showModal, setShowModal] = useState(false);
    const[newUser, setNewUser] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    })

  // Fecha o modal e reseta os dados do usuario
    const handleCloseModal = () => {
        setShowModal(false); // Oculta o modal
        setNewUser({ name: "", email: "", address: "", phone: ""});
    };

    const[msgError, setMsgError] = useState('');
    
    const register = async () => {
        const { name, email, address, phone } = newUser;

        try {
            const response = await axios.post(createUser, {
                name,
                email,
                address,
                phone
            })

            window.alert("Usuario salvo com sucesso!");
            console.log(response);
            handleCloseModal();
        } catch (error) {
            setMsgError("Erro ao cadastrar usuário!");
        }
    }

    return(
        <div>
            {/*Botão para abrir modal de cadastro */}
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
                Cadastrar cliente
            </button>
        
            {/**Form de cadastro */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h1 className="text-2xl">Cadastrar Novo cliente</h1>
                        <span className="text-red-700 text-sm font-bold">{msgError}</span> {/**Exibe mensagem se o correr erro na requisição de cadastro */}

                        <form className="mt-3">
                            <div className="mb-4">
                                <label className="block mb-1">Nome</label>
                                <input 
                                    type="text" className="w-full px-3 py-2 border rounded"
                                    value={newUser.name}
                                    onChange={(e) => {setNewUser({...newUser, name: e.target.value}) ; setMsgError('')}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email</label>
                                <input 
                                    type="text" className="w-full px-3 py-2 border rounded"
                                    value={newUser.email}
                                    onChange={(e) => {setNewUser({...newUser, email: e.target.value}); setMsgError('')}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Endereço</label>
                                <input 
                                    type="text" className="w-full px-3 py-2 border rounded"
                                    value={newUser.address}
                                    onChange={(e) => {setNewUser({...newUser, address: e.target.value}); setMsgError('')}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Telefone</label>
                                <input 
                                    type="text" className="w-full px-3 py-2 border rounded"
                                    value={newUser.phone}
                                    onChange={(e) => {setNewUser({...newUser, phone: e.target.value}); setMsgError('')}}
                                />
                            </div>
                        </form>
                        <div>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={handleCloseModal}>Cancelar</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer" onClick={register}>Salvar</button>
                        </div>    
                    </div>
                </div>
            )}
            
        </div>
    );
}