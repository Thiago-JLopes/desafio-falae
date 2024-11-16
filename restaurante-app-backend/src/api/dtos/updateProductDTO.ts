import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { IsNumberOrIsNumberString } from '../../service/productServices';

export class UpdateProductDto {
  @IsOptional()   ///IsOptional --> o campo pode não ser fornecido o valor pode ser null
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumberOrIsNumberString({message: "O valor de $property deve ser um número ou uma string que represente um número"})
  price?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
