import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])
export class Usuario {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Length(1, 100)
	email: string;

	@Column()
	@Length(1, 255)
	nome: string;

	@Column()
	@Length(1, 100)
	senha: string;

	hashSenha() {
		this.senha = bcrypt.hashSync(this.senha, 8);
	}

	senhaDescriptografadaEValida(senhaDescriptografada: string) {
		return bcrypt.compareSync(senhaDescriptografada, this.senha);
	}
}
