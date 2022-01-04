
export interface Archivo{
    n_iddoc_archivo: number,
    n_idpro_proyecto: number,    
    c_nombre: String,
    c_ruta: String,
    c_rutalogica: String,
    c_checksum: String,
    c_tipo: String,
    n_iddoc_archivopadre: number
}

export interface ArchivoEditar{
    archivo: Archivo,
    n_iddoc_archivopadre: number
}