import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'Order Id' })
  id: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'Order status' })
  status: string;
}
