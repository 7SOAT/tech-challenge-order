import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray({ message: 'The order productIds should be an array' })
  @ApiProperty({
    type: 'array',
    description: 'Product Ids',
    items: { type: 'string' },
  })
  productIds: Array<UUID>;

  @IsOptional()
  @IsString({ message: 'Customer CPF should be a string' })
  @IsNotEmpty({ message: 'Customer CPF should be not empty' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF must be in format XXX.XXX.XXX-XX',
  })
  @ApiProperty({ type: 'string', description: 'Customer CPF', required: false })
  document: string;

  @IsOptional()
  @IsString({ message: 'Customer e-mail should be a string' })
  @IsEmail(undefined, { message: 'Customer e-mail should be valid' })
  @ApiProperty({
    type: 'string',
    description: 'Customer e-mail',
    required: false,
  })
  email: string;
}
