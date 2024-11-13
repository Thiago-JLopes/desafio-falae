import { Request, Response } from 'express';
import { UserRepository } from '../../model/repository/userRepository';
import { User } from '../../model/entity/User';

// Definir uma interface para o corpo da requisição
interface RegisterRequest {
  name: string;
  email: string;
  address?: string;
  phone: string;
}

//Registro
export const register = async (req: Request, res: Response): Promise<void> => {
  // Verifica se o corpo da requisição está presente
  if (!req.body) {
    return res.status(400).json({ message: "BAD REQUEST - falta de parâmetros na requisição!" });
  }

  const { name, email, address, phone } = req.body as RegisterRequest;

  // Valida se os campos obrigatórios estão presentes
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Nome, email e telefone não podem ser nulos" });
  }

  try {
    // Cria uma nova instância de usuário
    const user = new User();
    user.name = name;
    user.email = email;
    user.address = address;
    user.phone = phone;

    // Salva o usuário
    await UserRepository.save(user);

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar o usuário:", error);
    return res.status(500).json({ message: "Erro ao cadastrar o usuário", error });
  }
};
