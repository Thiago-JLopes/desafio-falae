import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo ao FoodieHub</h1>
          <p className="text-xl mb-6">
            Encontre os melhores pratos para satisfazer o seu paladar.
          </p>
          <Link to={'menu/'} className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">
            Explore Agora
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Categorias Populares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Pratos Principais"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-4">Pratos Principais</h3>
              <p className="text-gray-600 mt-2">
                Descubra os melhores pratos principais para uma refeição perfeita.
              </p>
            </div>
            {/* Category Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Sobremesas"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-4">Sobremesas</h3>
              <p className="text-gray-600 mt-2">
                Satisfaça seu lado doce com sobremesas deliciosas.
              </p>
            </div>
            {/* Category Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Bebidas"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-4">Bebidas</h3>
              <p className="text-gray-600 mt-2">
                Explore uma seleção de bebidas refrescantes e exclusivas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Veganos"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-4">Veganos</h3>
              <p className="text-gray-600 mt-2">
                Opções deliciosas e saudáveis para todos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para explorar?</h2>
          <p className="text-lg mb-6">
            Cadastre-se e comece a salvar seus restaurantes e pratos favoritos agora!
          </p>
        </div>
      </div>
    </div>
  );
}
