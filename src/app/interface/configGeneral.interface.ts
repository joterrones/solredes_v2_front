export interface Empresa{
    n_idgen_empresa: number,
    c_nombrecorto: String,
    c_ruc: String,
    c_razonsocial: String
}

export interface EmpresaEditar{
    empresa: Empresa,
}

export interface Linea{
    n_idpl_linea: number,
    c_nombre: String,
    c_codigo: String,
    n_idpl_tipolinea: number    
}

export interface Tipolinea{
    n_idpl_tipolinea: number,
    c_nombre: String    
}

export interface LineaEditar{
    linea: Linea,
    tipolinea: Tipolinea[]
}

export interface EditarTipoLinea{
    tipolinea: Tipolinea
}

export interface Zona{
    n_idpl_zona: number,
    n_idpl_proyecto: number,
    c_codigo: String,
    c_nombre: String
}
export interface ZonaEditar{
    zona: Zona,
    proyecto: Proyecto[]
}

export interface Proyecto{
    n_idpl_proyecto: number,
    c_nombre: String,
}

export interface EditarProyecto{
    proyecto: Proyecto
}

export interface TipoFoto{
    n_idgen_tipofoto: number,
    c_nombre: String,
    c_codigo: String,
    n_tipo: String
}

export interface EditarTipoFoto{
    tipofoto: TipoFoto
}

export interface Estructura{
    n_idpl_estructura: number,
    n_idpl_zona: number,
    c_nombre: String,
    c_latitud: String,
    n_altitud: number,
    c_longitud: String
}

export interface EditarEstructura{
    estructura: Estructura
    zona: Zona[]
}

export interface TipoEmpresa{
    n_idgen_tipoempresa: number,
    c_nombre: String
}

export interface EditarTipoEmpresa{
    tipoempresa: TipoEmpresa
}
