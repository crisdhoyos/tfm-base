import { IsOptional, IsString } from 'class-validator';

export class FilterAllAudiosDto {
  @IsString()
  @IsOptional()
  categoryId?: string;
}
