import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateRecipeDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  parentProductId: number; // masalan: sho‘rva

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  ingredientId: number; // masalan: kartoshka

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number; // sho‘rvaga 0.2 kg kartoshka ketadi
}



export class UpdateRecipeDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  parentProductId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  ingredientId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;
}