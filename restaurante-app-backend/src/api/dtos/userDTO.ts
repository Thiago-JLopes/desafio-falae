import {
    IsEmail,
    IsOptional,
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
} from 'class-validator';

  
  export class UserDTO {
    
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    name: string
   
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    @IsEmail()
    email: string
    
    @IsOptional()
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    address: string
    
    //@IsPhoneNumber() validar o formato do parametro corresponde ao phonenumber
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    phone: string
}
