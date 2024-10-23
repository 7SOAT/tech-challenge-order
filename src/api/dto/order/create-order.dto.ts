import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Order Customer ID' })
  customerId: UUID;
}
