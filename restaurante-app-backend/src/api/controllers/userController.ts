import { Request, Response } from 'express';
import { UserRepository } from '../../model/repository/userRepository';
import { User } from '../../model/entity/User';
import { UserDTO } from '../dtos/userDTO';
import { validate } from 'class-validator';

// Registro
//POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  // Verifica se o corpo da requisição está presente
  if (!req.body) {
    return res.status(400).json({ message: "BAD REQUEST - falta de parâmetros na requisição!" });
  }

  try {
    let userDto = new UserDTO();
    Object.assign(userDto, req.body); // Copia dados para o DTO
    
    // Validação do DTO
    const errors = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Parâmetros incorretos!", errors });
    }

    // Cria uma nova instância de usuário
    const user = new User();
    Object.assign(user, userDto); // Copia dados para o user

    // Salva o usuário
    await UserRepository.save(user);

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao cadastrar o usuário", error });
  }
};
