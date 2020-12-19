export class Pedido {
    descripcion: string;
    monto: number;
    contratoUrl: string;
    fechaEnvio: any;
    direccion: string;
    clienteId: number;
    empresaId: number;
    estadoPedidoId: number;
}

export class CreatePedido {
    descripcion: string;
    fechaEnvio: string;
    direccion: string;
    monto: number;
    pedidoId: number;
    estadoId: number;
}

export class UpdateEstadoPedido 
{
    estadoPedido: number;
    pedidoId: number;
}

export class DeleteMaterialPedido{
    pedidoId: number;
    materialId: number;
}