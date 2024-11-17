import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../utils/apiRoutes";

// Interface para os dados do cliente
interface Cliente {
  id: number;
  name: string;
  email: string;
  adreess: string,
  phone: string;
}

// Função loader para buscar os dados
export async function loader(): Promise<{ clientes: Cliente[] }> {
  try {
    const response = await axios.get(getUsers);
    return { clientes: response.data }; // Retorna os dados dos clientes
  } catch (error) {
    console.error("Erro ao carregar os clientes:", error);
    throw new Response("Erro ao carregar os clientes", { status: 500 });
  }
}

export default function Clientes() {
  const { clientes } = useLoaderData() as { clientes: Cliente[] };

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Nome</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Telefone</th>
          <th className="px-4 py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td className="border px-4 py-2">{cliente.name}</td>
            <td className="border px-4 py-2">{cliente.email}</td>
            <td className="border px-4 py-2">{cliente.phone}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => console.log(`Editar ${cliente.id}`)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => console.log(`Excluir ${cliente.id}`)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
