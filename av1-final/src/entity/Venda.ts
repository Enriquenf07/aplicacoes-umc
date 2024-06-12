import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./Client";
import { Product } from "./Product";

@Entity("vendas")
class Venda {
  @PrimaryColumn()
  id!: string;
  @ManyToOne(() => Client, (client) => client.vendas)
  client!: Client;
  @ManyToOne(() => Product, (product) => product.vendas)
  product: Product;
  @Column()
  quantidade: number;
  @Column()
  desconto: number;
  @Column()
  valorTotal: number;
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
export { Venda };