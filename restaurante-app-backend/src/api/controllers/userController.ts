import { Request, Response } from 'express';
import { UserRepository } from '../../model/repository/userRepository';
import { User } from '../../model/entity/User';
import { UserDTO } from '../dtos/userDTO';
import { validate } from 'class-validator';
import { UptadeUserDTO } from '../dtos/updateUserDTO';

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

//getUser
//GET api/user/:id
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "ID inválido, o valor deve ser numérico." });
  }

  //busca dados do usuario
  try {
    const user = await UserRepository.findOne({
      where: {id: parseInt(id)},
      relations: ["orders"]
    })

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("erro ao buscar dados do usuario");
  }
}


//login
//POST api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  // Verifica se o corpo da requisição está presente
  if (!req.body) {
    return res.status(400).json({ message: "BAD REQUEST - falta de parâmetros na requisição!" });
  }
  
  try {
    const {login, passwordReq} = req.body; //obtem os parametros de login obs: pode ser email ou telefone
    
    if(isNaN(Number(login))) { //se true o parametro de entrada não é um numero de telefone busca user por email
      const user = await UserRepository.findOneBy({email: login, password: passwordReq}) 
      
      // Remove a senha
      const { password, ...userData } = user;

      return res.status(200).json(userData);
      
    } else {
      const user = await UserRepository.findOneBy({phone: login, password: passwordReq}) 
      
      // Remove a senha
      const { password, ...userData } = user;

      return res.status(200).json(userData);
       
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar o usuário", error });
  }
}

//GET api/users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { currentUserId } = req.query;
  
  if(isNaN(Number(currentUserId))) {
    return res.status(400).json({message: "Id inválido"})
  }

  try {
    
    const currentUser = await UserRepository.findOneBy({id: currentUserId});
    
    if(currentUser.role !== "admin") {
      return res.status(400).json({message: "Usuario não autorizado"})
    }

    const users = await UserRepository.find({
      relations: ["orders"]
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: "Falha ao obter usuarios"});
  }
}

//PUT api/users/
export const setUsers = async (req: Request, res: Response): Promise<void> => {
  const { currentUserId, id } = req.query;

  if(isNaN(Number(id)) || isNaN(Number(currentUserId))) {
    return res.status(400).json({message: "O ID deve ser válido"});
  }

  try {
    const currentUser = await UserRepository.findOneBy({id: currentUserId});
    
    if(currentUser.role !== "admin") {
      return res.status(400).json({message: "Usuario não autorizado"})
    }
    
    const user =  await UserRepository.findOneBy({id: parseInt(id)});
    if(!user) {
      return res.status(404).json({message: "usuario nao encontrado"});
    }

    // Valida o DTO de atualização
    const updateData = new UptadeUserDTO();
    Object.assign(updateData, req.body); // Copia dados para o DTO
    
    const errors = await validate(updateData);
    if (errors.length > 0) {
      const formattedErrors = errors.map(error => Object.values(error.constraints || {}));
      return res.status(400).json({ errors: formattedErrors });
    }


    // Atualiza os campos do usuario
    UserRepository.merge(user, req.body);
    const updatadUser = await UserRepository.save(user);
    const {password, ...userData} = updatadUser

    return res.status(200).json(userData);
    
  } catch (error) {
    return res.status(500).json({message: "Erro ao atualizar usuarios"})
  }
}