import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { Length } from "class-validator";

@Entity()
//@Unique(["id"])
export class Evento {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(1, 255)
	nome: string;

	@Column()
	@Length(1, 255)
	local: string;

	@Column()
	@Length(1, 4000)
	comentario: string;

	@Column()
	likes: number;

	@Column()
	deslikes: number;

	@Column()
	foto: string;
}
