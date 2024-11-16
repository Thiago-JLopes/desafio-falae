import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl, Min, IsNumberString } from 'class-validator';
import { IsNumberOrIsNumberString } from '../../service/productServices';

export class ProductDto {
  @IsString()
  @IsNotEmpty({message: 'o $property não pode ser vazio'})
  name: string;

  @IsNumberOrIsNumberString({message: "O valor de $property deve ser um número ou uma string que represente um número"})
  @IsNotEmpty({message: 'o $property não pode ser vazio'})
  @Min(0, {message: 'o $property não pode ser menor que 0'})
  price: number;

  @IsString()
  @IsNotEmpty({message: 'o $property não pode ser vazio'})
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl()
  imageUrl?: string;
}
