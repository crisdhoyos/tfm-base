import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAudioDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsNotEmpty()
  transcription: string;

  @IsString()
  @IsOptional()
  keywords?: string; // lista separada por comas

  @IsString()
  @IsOptional()
  topics?: string; // lista separada por comas

  @IsString()
  @IsOptional()
  description?: string; // texto descriptivo creado a partir de la info obtenida

  @IsString()
  @IsOptional()
  tokens?: string; // arreglo del vector de la descripción (se puede usar luego en la búsqueda)

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  // @IsNotEmpty()
  // @ValidateNested()
  // @IsArray()
  // @Type(() => CreateAudioSegmentDto)
  // audioSegments: CreateAudioSegmentDto[];
}
