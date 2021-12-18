export interface Almacen{
    n_idalm_almacen: number,
    c_nombre: String,
    c_direccion: String,
    n_idpro_proyecto: number    
}

export interface Proyecto{
    n_idpro_proyecto: number,
    c_nombre: String    
}

export interface AlmacenEditar{
    almacen: Almacen,
    proyecto: Proyecto[]
}

export interface Guia{
    n_idalm_guia: number,
    n_idalm_almacen: number,
    n_idgen_periodo: number,
    c_nombre: String,
    c_direccion: String,
    c_ruc: String,
    c_nroguia: String,
    c_observacion: String
}

export interface Periodos{
    n_idgen_periodo: number,
    c_descripcion: String
}

export interface GuiaEditar{
    guia: Guia,
    periodos: Periodos[],
    almacen: Almacen[]
}

export interface DetalleGuia{
    n_idalm_detalleguia: number,
    n_idalm_guia: number,
    n_idpl_elemento: number,
    c_nombreguia: String,
    c_nombreel: String,
    n_cantidad: number
}

export interface Elementos{
    n_idpl_elemento: number,
    c_nombre: String
}

export interface Guias{
    n_idalm_guia: number,
    c_nombre: string
}

export interface DetalleGuiaEditar{
    detalleguia: DetalleGuia,
    guias: Guias[],
    elemento: Elementos[]
}