import {
    IsEmail,
    IsOptional,
    IsString,
    IsNotEmpty,
} from 'class-validator';

  
  export class UptadeUserDTO {
    
    @IsOptional()
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    name: string
   
    @IsOptional()
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    @IsEmail()
    email: string
    
    @IsOptional()
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    address: string
    
    //@IsPhoneNumber() validar o formato do parametro corresponde ao phonenumber
    @IsOptional()
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    phone: string

    @IsOptional()
    @IsString()
    role?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty({message: 'o $property não pode ser vazio'})
    password: string
        
}
