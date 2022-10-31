import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class User {
  //   @PrimaryGeneratedColumn() // using uuid;
  @ObjectIdColumn() // for mongodb;
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
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
