import { Exclude } from '@nestjs/class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Alkalmazott {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kezdoDatum: Date;

  @Exclude()
  @Column('int')
  haviber: number;

  @Column()
  hivatalosEmail: string;
}
