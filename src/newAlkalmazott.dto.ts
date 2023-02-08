import { IsEmail } from 'class-validator';
import {
  IsInt,
  Min,
  IsDateString,
  IsOptional,
  IsDefined,
} from 'class-validator/types/decorator/decorators';

export default class NewAlkalamzottDto {
  @IsOptional()
  @IsDateString()
  kezdoDatum: string | Date;

  @IsDefined({ message: 'A havibér megadása kötelező' })
  @Min(0, { message: 'A havibérnek minimum 0-nak kell lennie' })
  @IsInt({ message: 'A havibérnek egész számnak kell lennie' })
  haviBer: number;

  @IsEmail()
  hivatalosEmail: string;
}
