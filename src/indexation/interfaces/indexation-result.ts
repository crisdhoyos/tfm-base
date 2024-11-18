import { Audio, AudioSegment } from '../../entities';

export interface IIndexationResult {
  audio: Audio;
  segments: AudioSegment[];
}
