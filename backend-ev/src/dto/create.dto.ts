/* eslint-disable prettier/prettier */
import { IsString, MaxLength, MinLength } from 'class-validator';

export class createDetail {
  @MinLength(2)
  @MaxLength(48)
  name: string;

  @MinLength(7)
  @MaxLength(15)
  phone: string;

  @MinLength(2)
  @MaxLength(248)
  @IsString()
  Address: string;

  @MinLength(2)
  @MaxLength(8)
  userID: string
}
