import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // using uuid;
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  tmdb_key: string;
}
