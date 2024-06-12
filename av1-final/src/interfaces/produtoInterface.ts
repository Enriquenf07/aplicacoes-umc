export interface IProductDelete {
    id: string;
}

export interface IProductRequest {
    id: string
    nome: string;
    codigo: number;
    descricao: string;
    categoria: string;
}