import React, { useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { createProducts, getProducts } from "../utils/apiRoutes";

// Interface para os dados do produto
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

// Função loader para buscar os dados
export async function loader(): Promise<{ products: Product[] }> {
  try {
    const response = await axios.get(getProducts);
    return { products: response.data }; // Retorna os dados dos produtos cadastrados
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
    throw new Response("Erro ao carregar os produtos", { status: 500 });
  }
}

export default function Products() {
  const { products } = useLoaderData() as { products: Product[] };
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    imageUrl: "",
  });

  const handleAddProduct = () => {
    setShowModal(true); // Exibe o modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Oculta o modal
    setNewProduct({ id: 0, name: "", price: 0, category: "", description: "", imageUrl: "" });
  };

  const handleSaveProduct = async () => {
    //salvar o produto no backend
    try {
        const {name, price, category, description, imageUrl} = newProduct;
        const response = await axios.post(createProducts, {
            name,
            price,
            description,
            imageUrl,
            category
        });

        console.log("Produto adicionado:", response);
        setShowModal(false);
    } catch (error) {
        console.log("erro ao salvar produto", error);
    }
  };

  return (
    <div>
      {/* Botão para adicionar produto */}
      <button
        onClick={handleAddProduct}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Produto
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-1">Nome</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Preço</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Categoria</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Descrição</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-1">URL da Imagem</label>
                <input
                  type="text"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProduct}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabela de produtos */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Preço</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Imagem</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => console.log(`Editar ${product.id}`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded m-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => console.log(`Excluir ${product.id}`)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
