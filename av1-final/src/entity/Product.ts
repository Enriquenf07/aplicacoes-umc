import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { Venda } from "./Venda";

@Entity("products")
class Product {
    @PrimaryColumn()
    id!: string;
    @Column()
    codigo!: number;
    @Column()
    name!: string;
    @Column()
    descricao!: string;
    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @OneToMany(() => Venda, (venda) => venda.product)
    vendas: Venda[];
    
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
export { Product };