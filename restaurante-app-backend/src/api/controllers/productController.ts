import { Request, Response } from 'express';
import { ProductRepository } from '../../model/repository/productRepository';
import { Product } from '../../model/entity/Product';
import { validate, Validate } from 'class-validator';
import { UpdateProductDto } from '../dtos/productDTO';

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


//Endpoint para listar produtos
export const products = async (req: Request, res: Response): Promise<void> => {
  const { category, minPrice, maxPrice, sortBy, order } = req.query;
  try {
    //Construindo query
    const queryBuilder = ProductRepository.createQueryBuilder('product');
    
    //Filtragem por categoria
    if(category) {
      queryBuilder.andWhere('product.category = :category', {category});
    }

    //filtragem por faixa de preço
    const minPriceNumber = minPrice ? parseFloat(minPrice as string) : undefined;
    const maxPriceNumber = maxPrice ? parseFloat(maxPrice as string) : undefined;
    
    if (minPriceNumber) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: minPriceNumber });
    }
    if (maxPriceNumber) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: maxPriceNumber });
    }
    
    //Ordenação
    if(sortBy && ['name', 'price'].includes(sortBy.toString())) {
      queryBuilder.orderBy(`product.${sortBy}`, order === 'desc' ? 'DESC' : 'ASC');
    }

    //Executando Query
    const products = await queryBuilder.getMany();

    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({message: "Erro ao buscar os produtos", error});
  }
}

//Buscar produto específico
export const productFindOne = async (req: Request, res: Response): Promise<void> => {

  const { id } = req.params;
  if(isNaN(Number(id))) {
    return res.status(400).json({message: "O ID deve ser válido"});
  }

  try {
    //busca o produto
    const product = await ProductRepository.findOneBy({ id: parseInt(id) });

    if(!product) {
      return res.status(404).json({message: "Produto não encontrado"})
    }

    return res.status(200).json(product)

  } catch (error) {
    return res.status(500).json({message: "Erro ao buscar o produto", error});
  }
}

//Endpoit para atualizr um produto
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Encontra o produto pelo ID
    const product = await ProductRepository.findOneBy({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Valida o DTO de atualização
    const updateData = new UpdateProductDto();
    Object.assign(updateData, req.body); // Copia dados para o DTO
    
    const errors = await validate(updateData);
    if (errors.length > 0) {
      const formattedErrors = errors.map(error => Object.values(error.constraints || {}));
      return res.status(400).json({ errors: formattedErrors });
    }


    // Atualiza os campos do produto
    ProductRepository.merge(product, req.body);
    const updatedProduct = await ProductRepository.save(product);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar produto' });
  }

}