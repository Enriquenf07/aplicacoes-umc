export interface IVendaDelete {
    id: string;
}
//Cliente, produto, quantidade desconto, ValorTotal
export interface IVendaRequest {
    id: string
    cliente: string;
    produto: string;
    quantidade: number;
    desconto: number;
    valorTotal: number
}