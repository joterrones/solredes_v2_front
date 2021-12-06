import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {
    constructor() { }
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    public exportAsExcelFilePerfil_ejemplo(json: any, excelFileName: string): void {
        var url = "assets/perfil.xlsx";
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function(e) {
            var arraybuffer = oReq.response;
           
            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
           
            /* Call XLSX */
            var workbook = XLSX.read(bstr, {type:"binary"});
           
            /* DO SOMETHING WITH workbook HERE */
          }
           
          oReq.send();
    }

    public exportAsExcelFilePerfil(json: any, excelFileName: string): void {
        console.log(json)
        let row = 4;
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.proyectos);
        row = row + 1;
        this.add_cell_to_sheet(worksheet, "A" + (row), "DATOS GENERALES");
        row = row + 1;
        this.add_cell_to_sheet(worksheet, "A" + (row), "Nombre del Proyecto");
        this.add_cell_to_sheet(worksheet, "B" + (row), json.proyectos[0].c_nombreproyecto);
        row = row + 1;
        this.add_cell_to_sheet(worksheet, "A" + (row), "Unidad Formuladora");
        this.add_cell_to_sheet(worksheet, "B" + (row), json.proyectos[0].c_unidadformuladora);
        row = row + 1;
        this.add_cell_to_sheet(worksheet, "A" + (row), "Unidad Ejecutora");
        this.add_cell_to_sheet(worksheet, "B" + (row), json.proyectos[0].c_unidadejecutora);
        row = row + 1;
        this.add_cell_to_sheet(worksheet, "A" + (row), "Objetivo del Proyecto");
        this.add_cell_to_sheet(worksheet, "B" + (row), json.proyectos[0].c_objetivoproyecto);

        row = row + 2;
        this.add_cell_to_sheet(worksheet, "A" + (row), "IDENTIFICACIÓN");
        row = row + 1;
        this.add_cell_to_sheet(worksheet, "A" + (row), "Ubicación");
        row = row + 1;
        this.add_cell_to_sheet(worksheet, "A" + (row), "Departamento");
        this.add_cell_to_sheet(worksheet, "B" + (row), "Provincia");
        this.add_cell_to_sheet(worksheet, "C" + (row), "Cantidad de Distritos");
        this.add_cell_to_sheet(worksheet, "D" + (row), "Cantidad de Localidades");

        json.ubigeos.forEach(ubigeo => {
            row = row + 1;
            console.log(ubigeo)
            this.add_cell_to_sheet(worksheet, "A" + row.toString(), ubigeo.c_departamento);
            this.add_cell_to_sheet(worksheet, "B" + row.toString(), ubigeo.c_provincia);
            this.add_cell_to_sheet(worksheet, "C" + row.toString(), ubigeo.cantidaddistrito);
            this.add_cell_to_sheet(worksheet, "D" + row.toString(), ubigeo.cantidadccpp);

        });


        worksheet[ "D1"].s = {
            fill: {
              patternType: "none", // none / solid
              fgColor: {rgb: "E74927"},
              bgColor: {rgb: "E74927"}
              },
              font: {
              name: 'Times New Roman',
              sz: 16,
              color: {rgb: "#E74927"},
              bold: true,
              italic: false,
              underline: false
              },
              border: {
              top: {style: "thin", color: {auto: 1}},
              right: {style: "thin", color: {auto: 1}},
              bottom: {style: "thin", color: {auto: 1}},
              left: {style: "thin", color: {auto: 1}}
              }
          };
  

        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        XLSX.writeFile(workbook, "Ejemplo.xlsx");

      //  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      //  this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    add_cell_to_sheet(worksheet, address, value) {
        /* cell object */
        var cell = { t: '?', v: value };
     
            

        /* assign type */
        if (typeof value == "string") cell.t = 's'; // string
        else if (typeof value == "number") cell.t = 'n'; // number
        else if (value === true || value === false) cell.t = 'b'; // boolean
        else if (value instanceof Date) cell.t = 'd';
        else throw new Error("cannot store value");

        /* add to worksheet, overwriting a cell if it exists */
        worksheet[address] = cell;

     

       // worksheet[address].s)""

        /* find the cell range */
        var range = XLSX.utils.decode_range(worksheet['!ref']);
        var addr = XLSX.utils.decode_cell(address);

        /* extend the range to include the new cell */
        if (range.s.c > addr.c) range.s.c = addr.c;
        if (range.s.r > addr.r) range.s.r = addr.r;
        if (range.e.c < addr.c) range.e.c = addr.c;
        if (range.e.r < addr.r) range.e.r = addr.r;

        /* update range */
        worksheet['!ref'] = XLSX.utils.encode_range(range);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

     colorCell(color, pattern,wb) {

        return wb.createStyle({
            fill: {
                type: 'pattern',
                fgColor: color,
                patternType: pattern || 'solid',
            }
        });
    }

}