import axios from "axios";
import { useEffect, useState } from "react";
import { getProducts } from "../utils/apiRoutes";

// Interface para os dados do produto
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
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


  return (
    <div className=" flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold text-red-400 mb-4">FoodieHub</h1>
      <p className="text-teal-950">Explore as deliciosas opções do nosso menu.</p>

      {/**Filtro de produtos para escolha do cliente */}
      
      <div className="flex flex-wrap gap-4 mt-11 mb-4">
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
      </div> 

      {/*Exibi os produtos */}
      <div className="flex flex-col justify-center items-start flex-grow gap-4 w-11/12 bg-slate-100 px-4 py-2 rounded">
        {products.map((product =>(
          <div key={product.id} className="bg-white px-4 py-2 rounded w-full flex flex-row justify-between">
            {product.name}
          </div>
        )))}
      </div>

    </div>
  );
}
  