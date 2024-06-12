import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, } from "typeorm";
import { v4 as uuid } from "uuid";
import { Venda } from "./Venda";
@Entity("clients")
class Client {
    @PrimaryColumn()
    id!: string;
    @Column()
    name!: string;
    @Column()
    codigo!: number;
    @Column()
    email!: string;
    @Column()
    telephone: string;
    @Column()
    cpf: string;
    @OneToMany(() => Venda, (venda) => venda.client)
    vendas: Venda[];
    @Column()
    endereco: string;
    @CreateDateColumn()
    created_at!: Date;
    @UpdateDateColumn()
    updated_at!: Date;
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
export { Client };