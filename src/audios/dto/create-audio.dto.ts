import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Category } from '../../entities';

export class CreateAudioDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  youtubeId?: string;

  @IsString()
  @IsNotEmpty()
  transcription: string;

  @IsString()
  @IsOptional()
  keywords?: string; // lista separada por comas

  @IsString()
  @IsOptional()
  description?: string; // texto descriptivo creado a partir de la info obtenida

  @IsString()
  @IsOptional()
  tokens?: string; // arreglo del vector de la descripción (se puede usar luego en la búsqueda)

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => Category)
  categories?: Category[];

  // @IsNotEmpty()
  // @ValidateNested()
  // @IsArray()
  // @Type(() => CreateAudioSegmentDto)
  // audioSegments: CreateAudioSegmentDto[];
}
