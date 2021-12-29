export interface Carpeta{
    id_carpeta: number,
    c_nombre: String,
    d_fechamodi: String
}

export interface CarpetaEditar{
    carpeta: Carpeta
}

export interface Archivo{
    id_archivo: number,
    id_carpeta: number,
    c_nombre: String,
    c_ruta: String
}

export interface ArchivoEditar{
    archivo: Archivo,
    id_carpeta: number,
    carpetas: Carpeta[]
}