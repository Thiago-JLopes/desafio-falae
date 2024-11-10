import { Request, Response } from 'express';
import { ProductRepository } from '../repository/productRepository';
import { Product } from '../entity/Product';

// Definir uma interface para o corpo da requisição
interface RegisterRequest {
  name: string;
  price: number;
  category: string;
  description?: string;
  imageUrl?: string
}

//Registro de produto
export const product = async (req: Request, res: Response): Promise<void> => {
  // Verifica se o corpo da requisição está presente
  if (!req.body) {
    return res.status(400).json({ message: "BAD REQUEST - falta de parâmetros na requisição!" });
  }

  const { name, price, category, description, imageUrl } = req.body as RegisterRequest;

  // Valida se os campos obrigatórios estão presentes
  if (!name || !price || !category) {
    return res.status(400).json({ message: "Existem campos obrigatórios que não foram fornecidos" });
  }

  try {
    // Cria uma nova instância de usuário
    const product = new Product();
    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
    product.imageUrl = imageUrl;

    // Salva o usuário
    await ProductRepository.save(product);

    return res.status(201).json({ message: "Produto cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar o produto:", error);
    return res.status(500).json({ message: "Erro ao cadastrar o produto", error });
  }
};
