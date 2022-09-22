export interface Reporte{
    n_anio : number,
    n_mes: number,
    n_idgen_zona: number,
    //c_zona: string,
    //c_tipo: string,
    /*n_metrado_contractual: number,
    n_metrado_replanteo,
    n_llegado_obra: number,
    n_cantidadesposteizado: number,
    saldoLlegar: number,
    saldoIzar: number,
    fechaInicio: Date,
    avanceIzadoPoste: number,
    izadoPendiente: number,*/
    //n_id_usermodi: number 
}

export interface EditarReporte{
    reporte: Reporte;
}

export interface ReporteEncabezado{
    n_anio : number,
    n_mes: number,
    n_idgen_zona: number,
}