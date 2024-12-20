import axios from "axios";
import { useEffect, useState } from "react";
import { createOrder, getProducts } from "../utils/apiRoutes";
import cartImage from "../assets/vista-lateral-vazia-do-carrinho-de-compras.png"

// Interface para os dados do produto
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

//Interface para carrinho
interface CartItem {
  product: Product;
  quantity: number;
}

//Inteface User
interface User {
  id: number;
  nome: string;
  address: string;
  phone: string;
  role: string;
  email: string
}

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    order: "asc", // Valores possíveis: 'asc' ou 'desc'
  });

  const [cart, setCart] = useState<CartItem[]>([]); // Estado para armazenar o carrinho
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if(currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, [localStorage.getItem("currentUser")]);

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

  //função de controle de exibição
  function toggleCart() {
    setShowCart(!showCart);
  }

  // //função para excluir item do carrinho
  // function deleteProductCar(product: Product) {

  // }


  //Função para adicionar produto ao carrinho
  function addToCart(product: Product) {
    //verifica se o produto já está no carrinho 
    const existingItem = cart.find((item) => item.product.id === product.id);
    if(existingItem) {
      setCart(
        cart.map((item) => item.product.id === product.id
      ? { ...item, quantity: item.quantity + 1}
      : item)     
      );
    } else {
      setCart([...cart, {product, quantity: 1}]);
    }
  }

  //calcula valor do subtotal antes de finalizar pedido
  function calculateSubtotal() {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  }

  const finalizeOrder = async () => {
    const currentUser = localStorage.getItem("currentUser");
    
    if(currentUser){
      const user : User = JSON.parse(currentUser);
      try {
        const response = await axios.post(createOrder, {
          userId: user.id,
          products: cart
        })

        console.log(response);
        window.alert("Pedido recebido")
        setCart([]);
      } catch (error) {
        console.log(error);
      }
    }
    return;
  }


  return (
    <div className=" flex flex-col justify-center items-center text-center">
    <div className="w-full flex justify-end px-1 pr-14 mb-3"> <img src={cartImage} alt="Carrinho" className="h-10 cursor-pointer"  onClick={toggleCart}/> {cart.length >= 1 &&(<span className="flex justify-center items-center w-4 h-4 text-white text-xs bg-red-600 rounded-full">{cart.length}</span>)}</div>
      <p className="text-teal-950 mb-6">Explore as deliciosas opções do nosso menu.</p>
      {/**Filtro de produtos para escolha do cliente */}
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Categoria"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="number"
          placeholder="Preço mínimo"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="">Ordenar por</option>
          <option value="name">Nome</option>
          <option value="price">Preço</option>
        </select>
        <select
          value={filters.order}
          onChange={(e) => setFilters({ ...filters, order: e.target.value })}
          className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>
      </div>

      {/*Exibi os produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 w-full px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 w-full text-center">
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 cursor-pointer hover:text-blue-500">Detalhes</p>
              <span className="block mt-2 text-green-600 text-lg font-bold">
                R${product.price}
              </span>
              <button className="mt-4 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                onClick={() => addToCart(product)}
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>



      {showCart && (
        <div className="absolute top-24 sm:right-24 right-10 bg-white shadow-lg rounded-lg p-4 w-80">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-semibold text-lg">Carrinho</h3>
            <button onClick={toggleCart} className="text-red-500 text-lg">
              ✕
            </button>
          </div>
          {!user && cart.length > 0 && (<span className="text-red-600 text-sm font-bold">Efetue login para concluir seu pedido</span>)}
          {cart.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span>R${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2">
                <span className="font-semibold">Subtotal:</span>{" "}
                <span>R${calculateSubtotal()}</span>
              </div>
              <button className="mt-4 w-full bg-gray-400 text-white py-2 rounded" onClick={() => setCart([])}>
                Esvaziar Carrinho
              </button>
              <button className="mt-4 w-full bg-red-400 text-white py-2 rounded hover:bg-red-500" onClick={finalizeOrder}>
                Finalizar Pedido
              </button>
            </div>
          )}
        </div>
      )}


    </div>
  );
}
  