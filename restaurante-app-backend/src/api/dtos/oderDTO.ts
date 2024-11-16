import { IsArray, IsInt, IsNotEmpty, IsNumber, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateOrderItemDto {
  @IsInt({ message: "O ID do produto deve ser um número inteiro" })
  @IsNotEmpty({ message: "O ID do produto é obrigatório" })
  productId: number;

  @IsInt({ message: "A quantidade deve ser um número inteiro" })
  @Min(1, { message: "A quantidade mínima é 1" })
  quantity: number;
}

export class CreateOrderDto {
  @IsInt({ message: "O ID do cliente deve ser um número inteiro" })
  @IsNotEmpty({ message: "O ID do cliente é obrigatório" })
  userId: number;

  @IsArray({ message: "Os itens devem ser fornecidos em um array" })
  @ValidateNested({ each: true, message: "Cada item deve ser válido" })
  @Type(() => CreateOrderItemDto)
  products: CreateOrderItemDto[];
}
