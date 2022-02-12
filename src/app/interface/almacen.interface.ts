export interface Almacen{
    n_idalm_almacen: number,
    c_nombre: String,
    c_direccion: String,
    n_idpro_proyecto: number,
    n_id_usermodi: number 
}

export interface Proyecto{
    n_idpro_proyecto: number,
    c_nombre: String    
}

export interface AlmacenEditar{
    almacen: Almacen,
    proyectos: Proyecto[]
}

export interface Guia{
    n_idalm_guia: number,
    n_idalm_almacen: number,
    n_idgen_periodo: number,
    c_nombre: String,
    c_direccion: String,
    c_ruc: String,
    c_nroguia: String,
    c_observacion: String,
    n_id_usermodi: number,
    annio: number,
    n_mes: number,
    
}

export interface Periodos{
    n_idgen_periodo: number,
    c_descripcion: String,
    annio: number,
    mes: string,
    n_mes: number,
    n_id_usermodi: number,
}

export interface GuiaEditar{
    guia: Guia,
    periodos: Periodos[],
    almacen: Almacen[],
    n_idalm_almacen: number
}

export interface DetalleGuia{
    n_idalm_detalleguia: number,
    n_idalm_guia: number,
    n_idpl_elemento: number,
    c_nombreguia: String,
    c_nombreel: String,
    n_cantidad: number,
    c_ruta: String,
    c_nombreImg: String,
    n_id_usermodi: number
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
    elemento: Elementos[],
    n_idalm_guia: number,
}

export interface Photo {
    _id?: string;
    imagePath: string;
}