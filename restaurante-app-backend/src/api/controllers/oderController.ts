import { Request, Response } from "express";
import { validate } from "class-validator";
import { CreateOrderDto } from "../dtos/oderDTO";
import { Order, OrderStatus } from "../../model/entity/Order";
import { OrderItem } from "../../model/entity/OrderItem";
import { ProductRepository } from "../../model/repository/productRepository";
import { UserRepository } from "../../model/repository/userRepository";
import { OrderRepository } from "../../model/repository/orderRepository";

//post /api/orders
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const createOrderDto = new CreateOrderDto();
  Object.assign(createOrderDto, req.body);

  // Validação dos dados de entrada
  const errors = await validate(createOrderDto);
  if (errors.length > 0) {
    const formattedErrors = errors.map((err) => Object.values(err.constraints || {}));
    return res.status(400).json({ errors: formattedErrors });
  }

  try {
    const { userId, products } = createOrderDto;

    // Verifica se o cliente existe
    const user = await UserRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: `Cliente com ID ${userId} não encontrado.` });
    }

    // Valida os produtos e calcula o total do pedido
    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of products) {
      const product = await ProductRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        return res.status(404).json({ message: `Produto com ID ${item.productId} não encontrado.` });
      }

      // Calcula o subtotal
      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;

      // Cria o item do pedido
      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = item.quantity;
      orderItems.push(orderItem);
    }

    // Cria o pedido vinculado ao cliente
    const order = new Order();
    order.user = user; // Vincula o cliente
    order.items = orderItems; // Vincula os itens
    order.status = OrderStatus.PENDENTE;
    order.totalPrice = totalPrice;

    // Salva o pedido e os itens no banco de dados
    const savedOrder = await OrderRepository.save(order);

    // Salva os itens vinculados ao pedido
    for (const item of orderItems) {
      item.order = savedOrder; // Vincula o pedido a cada item
      await OrderRepository.manager.save(OrderItem, item); // Salva cada item
    }

    return res.status(201).json({
      message: "Pedido criado com sucesso!",
      orderId: savedOrder.id,
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({ message: "Erro ao criar pedido", error });
  }
};



// get/api/orders/:id
export const getOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "ID inválido, o valor deve ser numérico." });
  }

  try {
    // Busca o pedido pelo ID, carregando as relações
    const order = await OrderRepository.findOne({
      where: { id: parseInt(id) },
      relations: ["items", "items.product"], // Carrega os itens e os produtos associados
    });

    if (!order) {
      return res.status(404).json({ message: "O pedido não existe." });
    }

    // Formata os dados para a resposta
    const formattedOrder = {
      id: order.id,
      totalPrice: parseFloat(order.totalPrice.toString()),
      status: order.status,
      createdAt: order.createAt,
      products: order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: parseFloat(item.product.price.toString()),
      })),
    };

    return res.status(200).json(formattedOrder);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ message: "Erro ao buscar pedido", error });
  }
};


export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Verifica se o ID é válido
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "ID inválido, o valor deve ser numérico." });
  }

  try {
    const orderId = parseInt(id);

    // Verifica se o pedido existe
    const order = await OrderRepository.findOne({
      where: { id: orderId },
      relations: ["items"], 
    });

    if (!order) {
      return res.status(404).json({ message: "O pedido não existe." });
    }

    // Exclui o pedido (e itens em cascata)
    await OrderRepository.delete(orderId);

    return res.status(200).json({ message: "Pedido excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    res.status(500).json({ message: "Erro ao excluir pedido.", error });
  }
};