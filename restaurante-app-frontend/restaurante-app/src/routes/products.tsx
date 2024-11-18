import { useEffect, useState } from "react";
import axios from "axios";
import { createProducts, deleteProducts, getProducts, updateProducts } from "../utils/apiRoutes";

// Interface para os dados do produto
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

// // Função loader para buscar os dados dos produtos
// export async function loader(): Promise<{ products: Product[] }> {
//   try {
//     const response = await axios.get(getProducts); // Faz uma requisição para obter os produtos cadastrados
//     return { products: response.data }; // Retorna os dados no formato esperado
//   } catch (error) {
//     console.error("Erro ao carregar os produtos:", error); // Exibe erros no console para facilitar o debug
//     throw new Response("Erro ao carregar os produtos", { status: 500 }); // Lança um erro para ser tratado pelo React Router
//   }
// }

export default function Products() {
  //produtos
  const [products, setProducts] = useState<Product[]>([]);
   
  // Estado para os filtros
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    order: "asc", // Valores possíveis: 'asc' ou 'desc'
  });

  useEffect(() => {
    fetchProducts();
  }, [filters, products]); // Atualiza sempre que os filtros mudarem


  async function fetchProducts() {
    try {
      const { category, minPrice, maxPrice, sortBy, order } = filters;

      // Monta os parâmetros de consulta para o endpoint
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);

      const response = await axios.get(`${getProducts}?${params.toString()}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
    }
  }

  

  // Estados para controlar a exibição do modal e os dados do novo produto
  const [showModal, setShowModal] = useState(false);
  const [labelModal, setLabelModal] = useState('');
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    imageUrl: "",
  });

  // Função para abrir o modal no modo "Adicionar Produto"
  const handleAddProduct = () => {
    setLabelModal("Adicionar Produto");
    setShowModal(true); // Exibe o modal
  };

  // Função para abrir o modal no modo "Editar Produto"
  const editProduct = (product: Product) => {
    setLabelModal('Editar Produto');
    setNewProduct(product)
    setShowModal(true); // Exibe o modal
  }

  //Função para deletar produto
  const deleteProduct = async (id: Number) => {

    try {
      console.log("id que será removido: ", id);
      const response = await axios.delete(`${deleteProducts}/${id}`);

      console.log(response);
      window.alert("Produto excluido com sucesso!");
      
      // Atualize a lista de produtos localmente
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  // Fecha o modal e reseta os dados do produto
  const handleCloseModal = () => {
    setShowModal(false); // Oculta o modal
    setNewProduct({ id: 0, name: "", price: 0, category: "", description: "", imageUrl: "" });
  };


  // Salva o produto no backend, verificando se é criação ou edição
  const handleSaveProduct = async () => {
    try {
      const { id, name, price, category, description, imageUrl } = newProduct;
  
      if (labelModal === "Adicionar Produto") {
        const response = await axios.post(createProducts, {
          name,
          price,
          description,
          imageUrl,
          category,
        });
        console.log("Produto adicionado:", response);
        window.alert("Produto adicionado com sucesso!");
        
        // Atualiza a lista de produtos
        setProducts((prev) => [...prev, response.data]); // Adiciona o novo produto
      } else {
        const response = await axios.put(`${updateProducts}/${id}`, {
          name,
          price,
          description,
          imageUrl,
          category,
        });
        console.log("Produto editado com sucesso!", response);
        window.alert("Produto editado com sucesso!");
        
        // Atualiza a lista de produtos
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id ? { ...product, name, price, category, description, imageUrl } : product
          )
        );
      }
  
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };
  
  return (
    <div className="overflow-auto">
      {/* Modal para adicionar ou editar um produto */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{labelModal}</h2>
            <form>
              {/* Campos do formulário para os dados do produto */}
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
              {/* Botões de ação no modal */}
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProduct}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
      <h2>Filtrar Produtos</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Filtros */}
        <input
          type="text"
          placeholder="Categoria"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Preço mínimo"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="">Ordenar por</option>
          <option value="name">Nome</option>
          <option value="price">Preço</option>
        </select>
        <select
          value={filters.order}
          onChange={(e) => setFilters({ ...filters, order: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>

        <div className="flex flex-wrap gap-4">
          {/* Botão para aplicar filtro */}
          <button
            onClick={fetchProducts}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Aplicar Filtros
          </button>

          {/* Botão para abrir o modal e adicionar um produto */}
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Adicionar Produto
          </button>
        </div>
      </div>

      {/* Tabela que exibe os produtos */}
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
              {/* Exibe as informações do produto em cada linha */}
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
                {/* Botões para editar e excluir o produto */}
                <button
                  onClick={() => editProduct(product)}
                  className="bg-blue-500 text-white px-2 py-1 rounded m-2 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
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
