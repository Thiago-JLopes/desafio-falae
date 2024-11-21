import axios from "axios";
import { useEffect, useState } from "react";
import { getOrderById, getUser } from "../utils/apiRoutes";

interface Product {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    totalPrice: string;
    status: string;
    createAt: string;
}

interface User {
    id: number;
    name: string;
    address: string;
    phone: string;
    role: string;
    email: string;
    orders: Order[];
}

export function Orders() {
    const [currentUser, setCurrentUser] = useState<User>({
        id: 0,
        name: "",
        address: "",
        phone: "",
        role: "",
        email: "",
        orders: [],
    });

    const [detailsOrderProducts, setDetailsOrderProducts] = useState<Product[]>([]);
    const [visibleOrderId, setVisibleOrderId] = useState<number | null>(null); // Gerencia qual pedido está visível

    useEffect(() => {
        async function loadingData() {
            const userLoggedin = localStorage.getItem("currentUser");

            if (userLoggedin) {
                const user: User = JSON.parse(userLoggedin);

                try {
                    const response = await axios.get(`${getUser}/${user.id}`);
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error("Erro ao obter dados do usuario:", error);
                }
            }
        }

        loadingData();
    }, []);

    const toggleDetails = async (idOrder: number) => {
        if (visibleOrderId === idOrder) {
            setVisibleOrderId(null); // Oculta os detalhes se o mesmo pedido for clicado novamente
            return;
        }

        try {
            const response = await axios.get(`${getOrderById}/${idOrder}`);
            setDetailsOrderProducts(response.data.products);
            setVisibleOrderId(idOrder); // Define o ID do pedido que deve exibir os detalhes
        } catch (error) {
            console.error("Erro ao obter detalhes do pedido!!", error);
        }
    };

    return (
        <div className="p-4">
            {currentUser.orders.length === 0 ? (
                <div className="flex justify-center items-center text-gray-500">
                    Você ainda não tem nenhum pedido
                </div>
            ) : (
                <div className="space-y-4">
                    {currentUser.orders.map((order) => (
                        <div
                            key={order.id}
                            className="p-4 border rounded-lg shadow-sm bg-white"
                        >
                            <div className="flex flex-row justify-between">
                                <p className="text-lg font-bold">Pedido #{order.id}</p>
                                <span
                                    className="text-gray-500 underline hover:text-green-700 cursor-pointer"
                                    onClick={() => toggleDetails(order.id)}
                                >
                                    {visibleOrderId === order.id ? "Ocultar detalhes" : "Mais detalhes"}
                                </span>
                            </div>
                            <p>Total: R$ {order.totalPrice}</p>
                            <p>Status: {order.status}</p>
                            <p>
                                Criado em:{" "}
                                {new Date(order.createAt).toLocaleString("pt-BR")}
                            </p>
                            {visibleOrderId === order.id && (
                                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                    <h4 className="font-semibold">Detalhes do Pedido:</h4>
                                    {detailsOrderProducts.length > 0 ? (
                                        <ul>
                                            {detailsOrderProducts.map((product, index) => (
                                                <li key={index}>
                                                    {product.name} - {product.quantity} x R$ {product.price.toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Nenhum produto encontrado neste pedido.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
