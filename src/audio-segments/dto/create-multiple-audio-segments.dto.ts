import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateAudioSegmentDto } from './create-audio-segment.dto';

export class CreateMultipleAudioSegmentsDto {
  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  @Type(() => CreateAudioSegmentDto)
  segments: CreateAudioSegmentDto[];
}
