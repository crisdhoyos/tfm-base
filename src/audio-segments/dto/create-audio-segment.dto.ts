import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAudioSegmentDto {
  @IsNumber()
  @IsNotEmpty()
  audioId: number;

  @IsNumber()
  @IsNotEmpty()
  segmentId: number;

  @IsNumber()
  @IsNotEmpty()
  seek: number;

  @IsNumber()
  @IsNotEmpty()
  start: number;

  @IsNumber()
  @IsNotEmpty()
  end: number;

  @IsString()
  @IsOptional()
  text?: string; // transcripcion

  @IsString()
  @IsOptional()
  tokens?: string; // arreglo separado por comas

  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  avgLogprob: number;

  @IsNumber()
  @IsNotEmpty()
  compressionRatio: number;

  @IsNumber()
  @IsNotEmpty()
  noSpeechProb: number;
}
