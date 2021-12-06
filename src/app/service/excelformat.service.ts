import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { DatePipe, formatPercent, PercentPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ExcelFormatService {

  constructor(private datePipe: DatePipe) {

  }

  async generateExcel(proyecto, ubigeos) {

    const title = 'ESTUDIO DEL PERFIL DE PROYECTO';

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Perfil');

    let row = 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 12, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS GENERALES", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Nombre del Proyecto", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nombreproyecto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "CUI", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_codigocui, 10, false);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "Unidad Formuladora", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_unidadformuladora, 10, false);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "Unidad Ejecutora", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_unidadejecutora, 10, false);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "IDENTIFICACIÓN", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "Ubicación", 11, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    worksheet.addRow([]);
    // Add Header Row
    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "Departamento", 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "Provincia", 10, true, '1873bb');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "D" + row, "Distrito", 10, true, '1873bb');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "E" + row, "Centro Poblado", 10, true, '1873bb');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    ubigeos.forEach(ubigeo => {
      row = row + 1;
      this.setdatogeneral(worksheet, "B" + row, ubigeo.c_departamento, 10, false);
      worksheet.getCell("B" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "C" + row, ubigeo.c_provincia, 10, false);
      worksheet.getCell("C" + row).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "D" + row, ubigeo.cantidaddistrito, 10, false);
      worksheet.getCell("D" + row).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "E" + row, ubigeo.cantidadccpp, 10, false);
      worksheet.getCell("E" + row).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    row = row + 1;
    worksheet.getRow(row).height = 5;

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Objetivo del Proyecto", 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_objetivoproyecto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
      left: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "FORMULACION Y EVALUACION", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inversión", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.n_montoinversiontotal, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fuente de Financiamiento", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_fuentefinanciamiento, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Plazo de ejecución (Días)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.plazo, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "PROCESO Y CONTRATO DE CONSULTORÍA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha Inclusion PAC", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_inlusionpack, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Convocatoria", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_convocatoria, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Otorgamiento de Buena Pro", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_otorgamientobuenapro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Consentimiento de Buena Pro", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_consentimientobuenapro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha Sucripcion Contrato", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_suscripcioncontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inicio del plazo", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_iniciocontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Plazo (Días)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazo, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fin de plazo Contractual", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_fincontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Ampliación (Días)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.n_ampliacion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Nuevo fin, con plazo Ampliado", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_fincontratoampliado, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Contrato de Consultoría", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrosolicitud, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Consultor", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_contratista, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Representante Legal", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_representantelegal, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Dirección", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_direccion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto de contrato incluye IGV (S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montocontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    worksheet.getColumn(1).width = 2;
    worksheet.getColumn(2).width = 55;
    worksheet.getColumn(3).width = 55;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;

    worksheet.getRow(2).height = 3;
    worksheet.getRow(4).height = 3;
    worksheet.getRow(5).height = 30;
    worksheet.getRow(9).height = 3;
    worksheet.getRow(12).height = 3;
    worksheet.getRow(22).height = 40;
    worksheet.getRow(43).height = 30;

    worksheet.mergeCells(`B1:E1`)
    worksheet.mergeCells(`B3:E3`)
    worksheet.mergeCells(`C5:E5`)
    worksheet.mergeCells(`C6:E6`)
    worksheet.mergeCells(`C7:E7`)
    worksheet.mergeCells(`C8:E8`)

    worksheet.mergeCells(`B10:E10`)
    worksheet.mergeCells(`B11:E11`)



    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Perfil.xlsx');
    });
  }

  async generateExcelDiseno(proyecto, ubigeos) {

    const title = 'ESTUDIO DEFINITIVO DE PROYECTO';

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Diseño');

    let row = 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 12, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS GENERALES", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "Nombre del Proyecto", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nombreproyecto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "CUI", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_codigocui, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "NIVEL DE ESTUDIO", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "Estudio Definitivo", 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "IDENTIFICACIÓN", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "Ubicación", 11, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    //  worksheet.addRow([]);
    // Add Header Row
    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "Departamento", 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "Provincia", 10, true, '1873bb');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "D" + row, "Distrito", 10, true, '1873bb');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "E" + row, "Centro Poblado", 10, true, '1873bb');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    ubigeos.forEach(ubigeo => {
      row = row + 1;
      this.setdatogeneral(worksheet, "B" + row, ubigeo.c_departamento, 10, false);
      worksheet.getCell("B" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "C" + row, ubigeo.c_provincia, 10, false);
      worksheet.getCell("C" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "D" + row, ubigeo.cantidaddistrito, 10, false);
      worksheet.getCell("D" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "E" + row, ubigeo.cantidadccpp, 10, false);
      worksheet.getCell("E" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "POBLACION BENEFICIADA Y N° ABONADOS", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "N° Localidades Beneficiadas", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrolocalidad, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Poblacion Beneficiada", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.n_nrousuarios, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Abonados Totales", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.n_nroviviendas, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "DOCUMENTO DE FACTIBILIDAD DE SUMINISTRO", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Empresa Concesionaria", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_contratista, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Documento que otorga la factibilidad de suministro y fijación del punto de diseño", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_documento, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha de emisión", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_fecharev, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Documento de revalidación", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_docrevalidacion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha de revalidacion del punto de diseño", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.d_fecharevpunto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Otorgamiento Certificado de Inexistencia de Restos Arqueologicos (CIRA)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_otocira, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Resolución Directorial del CIRA", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_resoluciondirectorialcira, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Vigencia CIRA", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_vigenciacira, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, ">Otorgamiento Declaracion de Impacto Ambiental (DIA)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_otodia, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Resolución de la DIA", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_resoluciondirectorialdia, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Vigencia DIA", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_vigenciadia, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Otorgamiento Calificación SER", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_otocalifica, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Documento SER", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_documentoser, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Análisis de Riesgo del Proyecto", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_anariesgo, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Valor referencial del proyecto", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_valorreferencial, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Entidad que licita los suministros, obras civiles y montaje", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_licitarsuministros, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Entidad que administra el contrato de obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_administrarcontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Plazo de ejecución de obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazoejecucionobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "TRÁMITES PREVIOS Y CONTRATO DE CONSULTORÍA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Incorporación al PAC", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_ip, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Convocatoria Concurso", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_convocatoria, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Otorgamiento de la Buena pro", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_otobuenapro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Consentimiento de la Buena Pro (Publicación de buena pro consentida)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_conbuenapro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "SUSCRIPCIÓN DE CONTRATO", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    // this.setdatogeneral(worksheet, "C" + row, proyecto.c_subcontrato, 10, false);
    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Contrato de Consultoría N°", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrocontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Consultor", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_consultorname, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Representante Legal", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_reprelegalname, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Dirección", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_direccionactu, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto de Contrato, incluido IGV (S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montocontratoactu, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inicio Elaboración ET (Inicio de contrato)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.inicioet, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Plazo de Prestacion (Días)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazoprestacion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fin según Contrato", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_finseguncontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Plazo Otorgado (Ampliaciones) (Días)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_finplazoampliado, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Nuevo fin con plazo ampliado", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazootorgado, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Aprobación Último Informe", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_ultimoinforme, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Acta de Conformidad", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_confet, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha de aprobación Liquidación Consultoría", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_liquidconsultoria, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Documento que aprueba (DGER)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_documaprueba, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto de Liquidación, incl. IGV (S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montopagarincligv, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Registro en Banco de Inversiones", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_regbancoform, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Estado de Viabilidad", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_estadoviabilidad, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha de Declaratoria de Viabilidad", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_dechadeclarativa, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    worksheet.getColumn(1).width = 2;
    worksheet.getColumn(2).width = 65;
    worksheet.getColumn(3).width = 55;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;

    worksheet.getRow(2).height = 3;
    worksheet.getRow(4).height = 3;
    worksheet.getRow(5).height = 25;
    worksheet.getRow(8).height = 3;
    worksheet.getRow(11).height = 3;
    worksheet.getRow(28).height = 25;
    worksheet.getRow(56).height = 25;

    worksheet.mergeCells(`B1:E1`)
    worksheet.mergeCells(`B3:E3`)
    worksheet.mergeCells(`C5:E5`)
    worksheet.mergeCells(`C6:E6`)
    worksheet.mergeCells(`C7:E7`)
    worksheet.mergeCells(`B9:E9`)

    worksheet.mergeCells(`B10:E10`)
    worksheet.mergeCells(`B11:E11`)

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Estudio_Definitivo.xlsx');
    });
  }

  async generateExcelEjecucion(proyecto, ubigeos) {

    const title = 'EJECUCIÓN DEL PROYECTO';

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Ejecucion');

    let row = 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 12, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS GENERALES DE LA OBRA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Nombre de la Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nombreproyecto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "Código Único de Inversión(CIU) y/o SNIP", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_codigocui, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "UBICACIÓN GEOGRÁFICA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    // worksheet.addRow([]);
    // Add Header Row
    this.setdatogeneral(worksheet, "B" + row, "Departamento", 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "Provincia", 10, true, '1873bb');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "D" + row, "Distrito", 10, true, '1873bb');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "E" + row, "Centro Poblado", 10, true, '1873bb');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    ubigeos.forEach(ubigeo => {
      row = row + 1;
      this.setdatogeneral(worksheet, "B" + row, ubigeo.c_departamento, 10, false);
      worksheet.getCell("B" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "C" + row, ubigeo.c_provincia, 10, false);
      worksheet.getCell("C" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "D" + row, ubigeo.cantidaddistrito, 10, false);
      worksheet.getCell("D" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      this.setdatogeneral(worksheet, "E" + row, ubigeo.cantidadccpp, 10, false);
      worksheet.getCell("E" + row).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "PROCESO DE LICITACIÓN", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Convocatoria Concurso", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_convocatoriaconcurso, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Otorgamiento de la Buena pro", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_otorgamientopro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Consentimiento de la Buena Pro (Publicación de buena pro consentida)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_consentimientopro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Suscripción de contrato", 11, false);
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_suscripcioncontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "DATOS DEL CONTRATO", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Datos del Contratista", 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Empresa", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_consultorname, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Representante legal", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_reprelegalname, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Dirección", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_direccionactu, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Nro Contrato", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrocontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Valor Referencial del proyecto(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_valorreferencial, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto de Ejecución de la Obra(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montocontratoactu, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Entrega del expediente técnico de obra completo", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_entregaexpediente, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Entrega Total o parcial del terreno", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_entregaterreno, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Notificación al Contratista quien es el Inspector o Supervisor", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_notificacionsupervisor, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Calendario de entrega de los materiales e insumos", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, 'No Aplica', 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Otorgamiento del Adelanto Directo", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_adelantodirecto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inicio de Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_incioobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Plazo de Ejecución (días)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazoejecucion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;

    let arrFecha = proyecto.c_incioobra.split('/');
    let fecha = new Date(arrFecha[1] + '/' + arrFecha[0] + '/' + arrFecha[2]);
    fecha.setDate(fecha.getDate() + parseInt(proyecto.c_plazoejecucion));
    const dateText = fecha.getDate() + '/' +
      (fecha.getMonth() + 1) + '/' + fecha.getFullYear();

    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fin de Plazo Contractual", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, dateText, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Ampliación Plazo Otorgado (días)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazootorgadodias, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };


    let fechaNuevoTermino = new Date();
    fechaNuevoTermino = fecha; //--important
    fechaNuevoTermino.setDate(fecha.getDate() + parseInt(proyecto.c_plazootorgadodias));
    const dateTextNuevoTermino = fechaNuevoTermino.getDate() + '/' +
      (fechaNuevoTermino.getMonth() + 1) + '/' + fechaNuevoTermino.getFullYear();

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fin de Plazo Ampliado", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, dateTextNuevoTermino, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "EXPEDIENTE REPLANTEO", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Documento de Aprobación", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_documentoaprobacion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha de Aprobación", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_fechaaprobacion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Tipo de Modena", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "Soles", 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Presupuesto de Replanteo de Obra(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_presupuestoreplanteo, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "CULMINACIÓN DE OBRA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Solicitud de Recepción de Obra(Documento Anotacion en cuaderno de Obra)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_solicitudrecepcionobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Designación de Comité de Recepción", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_designacioncomiterecepcion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "PROCESO DE RECEPCIÓN", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inicio del Proceso de Recepción", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_inicioprocesorecepcion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe de Comité(1ra Visita)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_informecomite, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Acta Situacional o de Observaciones o de Recepcion de Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_actasituacional, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Nueva Solicitud de recepción de obra(2da. Visita)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nuevasolitudrecepcion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Proceso de verificación del levantamiento de Observaciones", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_verificacionlevantamiento, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe de Comité(2da. Visita)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_informecomite2visita, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Acta de Recepción de Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_actarecepcionobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inicio de Operación Experimental", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_inicioexperimental, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Entrega de Expediente conforme a obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_entregaexpedienteobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Acta de Conformidad de Operación Experimental", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_actaconformidad, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Periodo de Garantía Inicial", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_periodogarantia, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inspección del Comité de Recepción", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_inspeccioncomite, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Suscripción del Acta de Conformidad", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_suscripcionacta, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    worksheet.getColumn(1).width = 2;
    worksheet.getColumn(2).width = 65;
    worksheet.getColumn(3).width = 55;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;

    worksheet.getRow(2).height = 3;
    worksheet.getRow(4).height = 3;
    worksheet.getRow(5).height = 25;
    worksheet.getRow(26).height = 25;
    worksheet.getRow(28).height = 25;
    worksheet.getRow(50).height = 25;

    worksheet.mergeCells(`B1:E1`)
    worksheet.mergeCells(`B3:E3`)
    worksheet.mergeCells(`C5:E5`)
    worksheet.mergeCells(`C6:E6`)
    worksheet.mergeCells(`C7:E7`)
    worksheet.mergeCells(`B8:E8`)

    // worksheet.mergeCells(`B10:E10`)
    // worksheet.mergeCells(`B11:E11`)

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Ejecucion.xlsx');
    });
  }

  async generateExcelCierre(proyecto, ubigeos) {

    const title = 'CIERRE DEL PROYECTO';

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Cierre');

    let row = 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 12, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS GENERALES DE LA OBRA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Nombre de la Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nombreproyecto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "Código Único de Inversión(CIU) y/o SNIP", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_codigocui, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;

    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "LIQUIDACIÓN DE OBRA", 10, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    // this.setdatogeneral(worksheet, "C" + row, proyecto.c_liquidacionobra, 10, false);
    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Nro de Documento que aprueba(DGER)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrodocumento, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Costo Obra(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_costoobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto Pagado incl. IGV(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montonpagadoigv, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto por Pagar incl. IGV(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montoporpagarigv, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Certificación de Conformidad Ejecutor", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_certificacionejecutor, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "LIQUIDACIÓN DE SUPERVISIÓN", 10, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    // this.setdatogeneral(worksheet, "C" + row, proyecto.c_liquidacionsupervicion, 10, false);
    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Nro de Documento que aprueba(DGER)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrodocsuper, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto Contrato Supervisor incl. IGV(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montocontratoigvsuper, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto Pagado incl. IGV(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montopagadosuper, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto por Pagar incl. IGV(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montoporpagarsuper, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Certificación de Conformidad Supervisión", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_certificacionsupervision, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Registro en Banco de Inv. Formato 09", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_registrobanco, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Recepción Definitiva", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_recepciondefinida, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Declaratoria de Fábrica o Memoria descriptiva valorizada", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_declaratoriafrabrica, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Nro de Documento que presenta", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrodocpresenta, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "TRANSFERENCIA DE OBRA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inventario Físico", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_inventariofisico, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Aprobar la liquidación de Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_aprobarliquidacion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Desiganación de la Comisión de Tranferencia de Obras", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_designacioncomision, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Elaborar el expediente de Transferencia", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_elaborarexpedientetrans, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Elaborar el informe de transferencia de la obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_elaborarinformetrans, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Acto de Transferencia", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_actotransferencia, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Emisión de Resolución que aprueba Transferencia", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_emisionresolucion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Saneamiento Contable", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_saneamientocontable, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "EVALUACIÓN EXPOST", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Evaluación Ex Post de inversiones al proyecto de inversión", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_evaluacionexpost, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    worksheet.getColumn(1).width = 2;
    worksheet.getColumn(2).width = 55;
    worksheet.getColumn(3).width = 55;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;

    worksheet.getRow(2).height = 3;
    worksheet.getRow(4).height = 3;
    worksheet.getRow(5).height = 25;

    worksheet.mergeCells(`B1:E1`)
    worksheet.mergeCells(`B3:E3`)
    worksheet.mergeCells(`C5:E5`)
    worksheet.mergeCells(`C6:E6`)

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Cierre.xlsx');
    });
  }

  async generateExcelProyecto(proyecto, ubigeos) {

    const title = 'CONTROL DEL PROYECTO';

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Proyecto');

    let row = 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 12, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS GENERALES DE LA OBRA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Nombre de la Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nombreproyecto, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    this.setdatogeneral(worksheet, "B" + row, "Código Único de Inversión(CIU) y/o SNIP", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_codigocui, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;

    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "PROCESO DE LICITACIÓN", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Incorporación al PAC", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_incorporacionpac, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Convocatoria Concurso", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_convocatoriaconcurso, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Otorgamiento de la Buena Pro", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_otorgamientobuenapro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Consentimiento de la Buena Pro", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_consentimientobuenapro, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Suscrición Contrato Ejecución", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_suscipcioncontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;

    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "DATOS DE CONTRATO DE CONSULTORÍA", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Empresa Supervisora", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_empresa, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Representante legal", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_reprelegal, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Dirección", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_direccion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "N° Contrato", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_nrocontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto Contrato Incl.IGV(S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_montocontrato, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, ' ', 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, ' ', 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Inicio de Supervisión de obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_iniciosuperobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Plazo de ejecución (Dias)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazoejecucion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;

    let arrFecha = proyecto.c_inicioobra.split('/');
    let fecha = new Date(arrFecha[1] + '/' + arrFecha[0] + '/' + arrFecha[2]);
    fecha.setDate(fecha.getDate() + parseInt(proyecto.c_plazoejecucion));
    const dateText = fecha.getDate() + '/' +
      (fecha.getMonth() + 1) + '/' + fecha.getFullYear();

    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fin de Plazo Contractual", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, dateText, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Plazo otorgado 1 (Dias)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_plazootorgado, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;

    let fechaNuevoTermino = new Date();
    fechaNuevoTermino = fecha; //--important
    fechaNuevoTermino.setDate(fecha.getDate() + parseInt(proyecto.c_plazootorgado));
    const dateTextNuevoTermino = fechaNuevoTermino.getDate() + '/' +
      (fechaNuevoTermino.getMonth() + 1) + '/' + fechaNuevoTermino.getFullYear();

    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fin de Plazo Ampliado", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, dateTextNuevoTermino, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;

    row = row + 1;
    worksheet.mergeCells("B" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "INFORMES MENSUAL DE SUPERVISIÓN", 11, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe sobre Adelanto para materiales solicitados por el contratista", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "", 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe de Conformidad al Expediente de Replanteo", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_informeexpereplanteo, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Informe conformidad, sobre Ampliación de plazo solicitado por el Contratista", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "", 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe conformidad sobre Suspención del plazo de ejecución", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "", 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe conformidad de Reprogramación de obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, "", 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.getRow(row).height = 5;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, ' ', 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, ' ', 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe de Culminación (Fin de Obra)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_informeculminacion, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe sobre levantamiento de observaciones", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_informelevantamientoobs, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Informe de Comité(1ra Visita)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_informecomite, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Acta de Recepción de obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_recepcionobra, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Fecha Inicio de Operación Experimental", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_fechainicioopexp, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Aprobación del Expediente conforma a obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.c_aprobacionexpconf, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Comunicación Termino de Operación Experimental", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.comunicaciontermino, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("C" + row + ":E" + row)
    this.setdatogeneral(worksheet, "B" + row, "Acta de Conformidad de Operación Experimental", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    this.setdatogeneral(worksheet, "C" + row, proyecto.actaconformidad, 10, false);
    worksheet.getCell("C" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };


    worksheet.getColumn(1).width = 2;
    worksheet.getColumn(2).width = 60;
    worksheet.getColumn(3).width = 55;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;

    worksheet.getRow(2).height = 3;
    worksheet.getRow(4).height = 3;
    worksheet.getRow(5).height = 25;
    worksheet.getRow(16).height = 25;
    worksheet.getRow(18).height = 25;
    worksheet.getRow(31).height = 28;

    worksheet.mergeCells(`B1:E1`)
    worksheet.mergeCells(`B3:E3`)
    worksheet.mergeCells(`C5:E5`)
    worksheet.mergeCells(`C6:E6`)

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Control_Proyecto.xlsx');
    });
  }

  async generateExcelOtros(proyecto, ubigeos, amp_plazo, mod_presupuestal,
    adel_directo, adel_materiales, emp_generados, contractual, programadoejecutado) {

    let c_nrovalorizacion = contractual.length;
    let arrValorizacionMensual = contractual[c_nrovalorizacion - 1];
    let c_mes = arrValorizacionMensual.mes_anio;
    let c_montovalorizado = arrValorizacionMensual.val_bruta;
    let c_montoacumulado = parseFloat(contractual.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));

    let arrAcumuladoObra = programadoejecutado[c_nrovalorizacion - 1];
    let c_total = parseFloat(contractual.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));
    const tatalMensualProg = parseFloat(programadoejecutado.reduce((acum, val) => val.mensual_prog + acum, 0).toFixed(2));
    let programadoAcumYPor: any = [];
    let variable = 0;
    let acum, porcen = 0;
    for (let i = 0; i < programadoejecutado.length; i++) {
      let mensual = parseFloat(programadoejecutado[i].mensual_prog);
      acum = (mensual + variable);
      porcen = parseFloat(((acum / tatalMensualProg) * 100).toFixed(2));
      programadoAcumYPor.push({ mensual, acum, porcen })
      variable = acum;
    }
    let c_avancefisicoacumuladoprog = programadoAcumYPor[c_nrovalorizacion - 1].porcen;
    let c_avancefisicoreal = programadoejecutado[c_nrovalorizacion - 1].porcentaje_eje;
    let c_fisicoacumuladoprogsoles = programadoAcumYPor[c_nrovalorizacion - 1].acum;
    let c_fisicorealeje = programadoejecutado[c_nrovalorizacion - 1].total_acumulado_eje;

    let ampliacionPlazo = amp_plazo;
    let countAmpliacionPlazo = ampliacionPlazo.length;

    let modificacionPresupuestal = mod_presupuestal;
    let countModificacionPresupuestal = modificacionPresupuestal.length;

    let adelantoDirecto = adel_directo;
    let countAdelantoDirecto = adelantoDirecto.length;

    let adelantoMateriales = adel_materiales;
    let countAdelantoMateriales = adelantoMateriales.length;

    let empleadosGenerados = emp_generados;
    let countEmpleadosGenerados = empleadosGenerados.length;

    const title = 'ACTIVIDADES ADICIONALES AL CONTRATO DE EJECUCION';

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Otros');

    let row = 1;
    worksheet.mergeCells("B" + row + ":H" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 12, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "DATOS GENERALES DE LA OBRA", 9, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.getRow(row).height = 5;

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Nombre de la Obra", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, proyecto.c_nombreproyecto, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Código Único de Inversión(CIU) y/o SNIP", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.mergeCells("E" + row + ":H" + row)
    this.setdatogeneral(worksheet, "E" + row, proyecto.c_codigocui, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // VALORIZACIÓN MENSUAL

    row += 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "VALORIZACIÓN MENSUAL", 9, true, '061673');
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "N° valorización", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_nrovalorizacion, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Mes", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_mes, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto Valorizado", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_montovalorizado, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Monto Valorizado Acumulado", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_montoacumulado, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    //
    // Avance Acumulado de la Obra
    //

    row += 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "AVANCE ACUMULADO DE OBRA", 9, true, '061673');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "N° Avance Acumulado", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_nrovalorizacion, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Mes - Año", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_mes, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Avance Físico Acumulado Programado (%)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_avancefisicoacumuladoprog, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Avance Físico Real Ejecutado (%)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_avancefisicoreal, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Avance Físico Acumulado Programado (S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_fisicoacumuladoprogsoles, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Avance Físico Real Ejecutado (S/)", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, c_fisicorealeje, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'left' };
    this.setdatogeneral(worksheet, "B" + row, "Situación Actual", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, proyecto.c_situacionactual, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    row = row + 1;
    worksheet.mergeCells("B" + row + ":D" + row)
    this.setdatogeneral(worksheet, "B" + row, "Comentarios", 10, false, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      right: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("E" + row + ":H" + row)
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
    this.setdatogeneral(worksheet, "E" + row, proyecto.c_comentario, 10, false);
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };


    // --------------------------------------------------------------
    // AMPLIACIÓN DE PLAZO
    // --------------------------------------------------------------

    row += 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "AMPLIACIÓN DE PLAZO", 9, true, '061673');
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'N° Ampliación', 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("C" + row + ":D" + row)
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'N° Documento que solicita', 10, true, '1873bb');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("C" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'Fecha de solicitud', 10, true, '1873bb');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'Fecha de Aprobación', 10, true, '1873bb');
    worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row)
    worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'N° documento que aprueba', 10, true, '1873bb');
    worksheet.getCell('G' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'Plazo otorgado (Dias)', 10, true, '1873bb');
    worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'Nueva fecha de término de obra', 10, true, '1873bb');
    worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'Causal', 10, true, '1873bb');
    worksheet.getCell('K' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countAmpliacionPlazo; i++) {
      let Arr = ampliacionPlazo[i];
      row += 1;
      if (i !== (countAmpliacionPlazo - 1)) {
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, 'Nro ' + Arr.c_nroampliacion, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("C" + row + ":D" + row)
        worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.c_nrodocumento, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_fechasolicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.c_documentoaprueba, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.c_plazootrogado, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_nuevafechaterminoobra, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.c_causal, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, 'Nro ' + Arr.c_nroampliacion, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("C" + row + ":D" + row)
        worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.c_nrodocumento, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_fechasolicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.c_documentoaprueba, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.c_plazootrogado, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_nuevafechaterminoobra, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.c_causal, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    // --------------------------------------------------------------
    // MODIFICACIÓN PRESUPUESTAL
    // -------------------------------------------------------------
    //

    row += 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "MODIFICACIÓN PRESUPUESTAL", 9, true, '061673');
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'N° de Adicional', 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'Tipo de Adicional', 10, true, '1873bb');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("C" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'Documento que solicita el Adicional', 10, true, '1873bb');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'Fecha de solicitud', 10, true, '1873bb');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("F" + row + ":G" + row)
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'Documento que aprueba el Adicional', 10, true, '1873bb');
    worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'H' + row, 'Fecha de aprobación', 10, true, '1873bb');
    worksheet.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'Porcentaje de Adicional/Deductivo (%)', 10, true, '1873bb');
    worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'Monto de Aprobación', 10, true, '1873bb');
    worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'Causal', 10, true, '1873bb');
    worksheet.getCell('K' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countModificacionPresupuestal; i++) {
      let Arr = modificacionPresupuestal[i];
      row += 1;
      if (i !== (countModificacionPresupuestal - 1)) {
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, 'Nro ' + Arr.c_nro_adicional, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.c_tipoadicional, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_docsolititaadicional, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_fechasolicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("F" + row + ":G" + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_docapruebaadicional, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, (Arr.c_porcenadicionaldeductivo * 100).toFixed(2) + '%', 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_montoaprobacion, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.c_causal, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, 'Nro ' + Arr.c_nro_adicional, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.c_tipoadicional, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_docsolititaadicional, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_fechasolicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("F" + row + ":G" + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_docapruebaadicional, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, (Arr.c_porcenadicionaldeductivo * 100).toFixed(2) + '%', 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_montoaprobacion, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.c_causal, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    // --------------------------------------------------------------
    // ADELANTO DIRECTO
    // -------------------------------------------------------------
    //

    row += 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "ADELANTO DIRECTO", 9, true, '061673');
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row)
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'N° Documento que solicita', 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'Fecha que solicita', 10, true, '1873bb');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("E" + row + ":F" + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'Documento que aprueba', 10, true, '1873bb');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'Fecha de aprobación', 10, true, '1873bb');
    worksheet.getCell('G' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'H' + row, 'Porcentaje (%)', 10, true, '1873bb');
    worksheet.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'Monto de Adelanto', 10, true, '1873bb');
    worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("J" + row + ":K" + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'Documento de desembolso AD', 10, true, '1873bb');
    worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countAdelantoDirecto; i++) {
      let Arr = adelantoDirecto[i];
      row += 1;
      if (i !== (countAdelantoDirecto - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.c_documento_solicita, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_fecha_solicitud, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("E" + row + ":F" + row);
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_doc_aprueba, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, (Arr.c_porcentaje * 100).toFixed(2) + '%', 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.c_monto_total, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("J" + row + ":K" + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_doc_aprueba_adicional, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.c_documento_solicita, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_fecha_solicitud, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("E" + row + ":F" + row);
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_doc_aprueba, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, (Arr.c_porcentaje * 100).toFixed(2) + '%', 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.c_monto_total, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("J" + row + ":K" + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_doc_aprueba_adicional, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    // --------------------------------------------------------------
    // ADELANTO PARA MATERIALES
    // --------------------------------------------------------------
    //

    row += 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "ADELANTO PARA MATERIALES", 9, true, '061673');
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'N° Adelanto', 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'N° Documento que solicita', 10, true, '1873bb');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("C" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'Fecha de solicitud', 10, true, '1873bb');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'Documento que aprueba', 10, true, '1873bb');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'Fecha de aprobación', 10, true, '1873bb');
    worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'Porcentaje', 10, true, '1873bb');
    worksheet.getCell('G' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'H' + row, 'Monto de Adelanto', 10, true, '1873bb');
    worksheet.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'Documento desembolso AM', 10, true, '1873bb');
    worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'Monto Acumulado incl. IGV', 10, true, '1873bb');
    worksheet.getCell('K' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countAdelantoMateriales; i++) {
      let Arr = adelantoMateriales[i];
      row += 1;
      if (i !== (countAdelantoMateriales - 1)) {
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, 'Nro ' + Arr.c_nro_adelanto, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.c_doc_solicita, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_fecha_solicita, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_doc_aprueba, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, (Arr.c_porcentaje * 100).toFixed(2) + '%', 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, Arr.c_monto_adelanto, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.c_doc_desembolso, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.c_monto_acumulado_igv, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, 'Nro ' + Arr.c_nro_adelanto, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.c_doc_solicita, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_fecha_solicita, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'E' + row, Arr.c_doc_aprueba, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_fechaaprobacion, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, (Arr.c_porcentaje * 100).toFixed(2) + '%', 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, Arr.c_monto_adelanto, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.c_doc_desembolso, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.c_monto_acumulado_igv, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    // --------------------------------------------------------------
    // EMPLEOS GENERADOS ACUMULADO (PERSONAS)
    // --------------------------------------------------------------
    //

    row += 2;
    worksheet.mergeCells("B" + row + ":H" + row)
    this.setdatogeneral(worksheet, "B" + row, "EMPLEOS GENERADOS ACUMULADO (PERSONAS)", 9, true, '061673');
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'Directo (N° Trabajadores)', 10, true, '1873bb');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'Indirecto', 10, true, '1873bb');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("F" + row + ":G" + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'Oficina Central', 10, true, '1873bb');
    worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("H" + row + ":I" + row);
    worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'H' + row, 'Oficina de campo (Hoteles, restaurante)', 10, true, '1873bb');
    worksheet.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("J" + row + ":K" + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'Subcontrato', 10, true, '1873bb');
    worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countEmpleadosGenerados; i++) {
      let Arr = empleadosGenerados[i];
      row += 1;
      if (i !== (countEmpleadosGenerados - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.c_nro_trabajadores, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_indirecto, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("F" + row + ":G" + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_of_central, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("H" + row + ":I" + row);
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'H' + row, Arr.c_of_campo, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("J" + row + ":K" + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_sub_contrato, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.c_nro_trabajadores, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.c_indirecto, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("F" + row + ":G" + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.c_of_central, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("H" + row + ":I" + row);
        worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'H' + row, Arr.c_of_campo, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("J" + row + ":K" + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.c_sub_contrato, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    if (countEmpleadosGenerados == 0) {
      row += 1;
      worksheet.mergeCells("B" + row + ":C" + row);
      worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'B' + row, "", 10, false);
      worksheet.getCell("B" + row).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }
      worksheet.mergeCells("D" + row + ":E" + row);
      worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
      this.setdatogeneral(worksheet, 'D' + row, "", 10, false);
      worksheet.getCell("D" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }
      worksheet.mergeCells("F" + row + ":G" + row);
      worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
      this.setdatogeneral(worksheet, 'F' + row, "", 10, false);
      worksheet.getCell("F" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }
      worksheet.mergeCells("H" + row + ":I" + row);
      worksheet.getCell('H' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
      this.setdatogeneral(worksheet, 'H' + row, "", 10, false);
      worksheet.getCell("H" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }
      worksheet.mergeCells("J" + row + ":K" + row);
      worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'left' };
      this.setdatogeneral(worksheet, 'J' + row, "", 10, false);
      worksheet.getCell("J" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }
    }

    worksheet.getColumn(1).width = 2;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(10).width = 20;
    worksheet.getColumn(11).width = 20;

    worksheet.getRow(2).height = 3;
    worksheet.getRow(5).height = 25;
    worksheet.getRow(21).height = 25;

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Ejecución_Otros.xlsx');
    });
  }

  async generarObra(proyecto, valorizacioncontractual, presupuestoobra, avanceperealeje, valmayoresmetrados,
    valpartidasadicionales, adelantoMateriales, ampliacionPlazo, garantias) {

    proyecto.c_ggutilidades = isNaN(parseFloat(proyecto.c_ggutilidades)) ? 0 : parseFloat(proyecto.c_ggutilidades);
    proyecto.c_valorreferencial = isNaN(parseFloat(proyecto.c_valorreferencial)) ? 0 : parseFloat(proyecto.c_valorreferencial);
    proyecto.c_adelantodirec = isNaN(parseFloat(proyecto.c_adelantodirec)) ? 0 : parseFloat(proyecto.c_adelantodirec);
    proyecto.c_adelantomattotal = isNaN(parseFloat(proyecto.c_adelantomattotal)) ? 0 : parseFloat(proyecto.c_adelantomattotal);

    const title = 'FICHA DE CONTROL DE OBRA';

    const presupuestoObra = presupuestoobra;
    const countPresupuestoObra = presupuestoObra.length;
    const totalAdicional_PreObra = parseFloat(presupuestoObra.reduce((acum, valPreObra) => valPreObra.presu_adicional + acum, 0).toFixed(2));
    const totalDeductivo_PreObra = parseFloat(presupuestoObra.reduce((acum, valPreObra) => valPreObra.presu_deductivo + acum, 0).toFixed(2));

    const adelMateriales = adelantoMateriales;
    const countAdelMateriales = adelMateriales.length;

    const adelPlazo = ampliacionPlazo;
    const countAdelPlazo = adelPlazo.length;
    const totalPlatoEjecucion = adelPlazo.reduce((acum, value) => value.plazo_otorgado + acum, 0);

    const avanceProgramaoVsRealEjecutado = avanceperealeje;
    const countArrAPVRE = avanceProgramaoVsRealEjecutado.length;
    const tatalMensualProg = parseFloat(avanceProgramaoVsRealEjecutado.reduce((acum, val) => val.mensual_prog + acum, 0).toFixed(2));
    const arrAcumContractual = (avanceProgramaoVsRealEjecutado.map(value => value.acum_contractual_eje));
    let maxAcumContractual = Math.max(...arrAcumContractual); // infinity
    maxAcumContractual = isFinite(maxAcumContractual) ? maxAcumContractual : 0;

    const totalAcumuladoPASUM = parseFloat(avanceProgramaoVsRealEjecutado.reduce((acum, val) => val.acumulado_pa_suma_eje + acum, 0).toFixed(2));
    const totalPorcentajeEje = parseFloat(avanceProgramaoVsRealEjecutado.reduce((acum, val) => val.porcentaje_eje + acum, 0).toFixed(2));
    const totalAvance = parseFloat(avanceProgramaoVsRealEjecutado.reduce((acum, val) => val.avance + acum, 0).toFixed(2));

    let programadoAcumYPor: any = [];
    let variable = 0;
    let acum, porcen = 0;
    for (let i = 0; i < countArrAPVRE; i++) {
      let mensual = parseFloat(avanceperealeje[i].mensual_prog);
      acum = (mensual + variable);
      porcen = parseFloat(((acum / tatalMensualProg) * 100).toFixed(2));
      programadoAcumYPor.push({ mensual, acum, porcen })
      variable = acum;
    }
    console.log('Acumulado y Porcentaje');
    console.log(programadoAcumYPor);

    const valContractual = valorizacioncontractual;
    const countContraste = valContractual.length;
    const totalValBruta_valC = parseFloat(valContractual.reduce((acum, valC) => valC.val_bruta + acum, 0).toFixed(2));
    const totalReajuste_valC = parseFloat(valContractual.reduce((acum, valC) => valC.reajuste + acum, 0).toFixed(2));
    const totalDeduccion_valC = parseFloat(valContractual.reduce((acum, valC) => valC.deduccion + acum, 0).toFixed(2));
    const totalAdDirecto_valC = parseFloat(valContractual.reduce((acum, valC) => valC.amor_adel_direc + acum, 0).toFixed(2));
    const totalAddMateriales_valC = parseFloat(valContractual.reduce((acum, valC) => valC.amor_adel_mat + acum, 0).toFixed(2));
    const totalValNeta_valC = parseFloat(valContractual.reduce((acum, valC) => valC.val_neta + acum, 0).toFixed(2));
    const totalIGV_valC = parseFloat(valContractual.reduce((acum, valC) => valC.igv + acum, 0).toFixed(2));
    const tatalTotal_valC = parseFloat(valContractual.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));

    const valoMetrados = valmayoresmetrados;
    const countValMetrados = valoMetrados.length;
    const totalValBruta = parseFloat(valoMetrados.reduce((acum, valC) => valC.valorizaicon_bruta + acum, 0).toFixed(2));
    const totalReajuste = parseFloat(valoMetrados.reduce((acum, valC) => valC.reajuste + acum, 0).toFixed(2));
    const totalDeduccion = parseFloat(valoMetrados.reduce((acum, valC) => valC.deduccion + acum, 0).toFixed(2));
    const totalDirecto = parseFloat(valoMetrados.reduce((acum, valC) => valC.amor_directo + acum, 0).toFixed(2));
    const totalMateriales = parseFloat(valoMetrados.reduce((acum, valC) => valC.amor_materiales + acum, 0).toFixed(2));
    const totalValNeta = parseFloat(valoMetrados.reduce((acum, valC) => valC.valorizacion_neta + acum, 0).toFixed(2));
    const totalIGV = parseFloat(valoMetrados.reduce((acum, valC) => valC.igv + acum, 0).toFixed(2));
    const totalTotal = parseFloat(valoMetrados.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));

    const valoresAdicionales = valpartidasadicionales;
    const countAdicionales = valoresAdicionales.length;
    const totalValBrutaAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.valorizaicon_bruta + acum, 0).toFixed(2));
    const totalReajusteAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.reajuste + acum, 0).toFixed(2));
    const totalDeduccionAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.deduccion + acum, 0).toFixed(2));
    const totalDirectoAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.amor_directo + acum, 0).toFixed(2));
    const totalMaterialesAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.amor_materiales + acum, 0).toFixed(2));
    const totalValNetaAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.valorizacion_neta + acum, 0).toFixed(2));
    const totalIGVAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.igv + acum, 0).toFixed(2));
    const totalTotalAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));

    // GARANTÍAS

    const arrGarantiasFC = garantias.filter(({ fase, tipocarta }) => (fase === 'EJECUCIÓN') && (tipocarta === 'FIEL CUMPLIMIENTO'));
    const countArrFielCum = arrGarantiasFC.length;
    const arrGarantiasAdelantoD = garantias.filter(({ fase, tipocarta }) => (fase === 'EJECUCIÓN') && (tipocarta === 'ADELANTO DIRECTO'));;
    const countAdelantoD = arrGarantiasAdelantoD.length;
    const arrGarantiasAdelantoM = garantias.filter(({ fase, tipocarta }) => (fase === 'EJECUCIÓN') && (tipocarta === 'ADELANTO DE MATERIALES'));;
    const countAdelantoM = arrGarantiasAdelantoM.length;

    // Crear fecha y sacar el valor del año y mes
    const year = new Date().getFullYear();
    // Creamos un arreglo de meses
    const valueMonths = [{ id: 0, name: 'ENERO' }, { id: 1, name: 'FEBRERO' }, { id: 2, name: 'MARZO' }, { id: 3, name: 'ABRIL' }
      , { id: 4, name: 'MAYO' }, { id: 5, name: 'JUNIO' }, { id: 6, name: 'JULIO' }, { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETIEMBRE' },
    { id: 9, name: 'OCTUBRE' }, { id: 10, name: 'NOVIEMBRE' }, { id: 11, name: 'DICIEMBRE' }]
    const numberMoth = new Date().getMonth();
    const nameMonth = valueMonths.find(({ id }) => id === numberMoth).name;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Obra');

    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 17;
    worksheet.getColumn(6).width = 33;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 15;
    worksheet.getColumn(10).width = 17;
    worksheet.getColumn(11).width = 15;
    worksheet.getColumn(12).width = 17;
    worksheet.getColumn(13).width = 30;
    worksheet.getColumn(14).width = 20;

    worksheet.getRow(74).height = 30;

    // 1
    let row = 1;
    worksheet.mergeCells('B1:L1');
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 14, true);
    worksheet.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    // 2
    row += 1;
    worksheet.mergeCells("B" + row + ":L" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, `INFORMACIÓN A: ${nameMonth} ${year}`, 11, false);
    worksheet.getCell("M" + row).border = {
      top: { style: 'thick' },
      left: { style: 'thick' },
      bottom: { style: 'thick' },
      right: { style: 'thick' }
    };
    worksheet.getCell("N" + row).border = {
      top: { style: 'thick' },
      left: { style: 'thick' }, // thin(linea solida), double(doble linea)
      bottom: { style: 'thick' },
      right: { style: 'thick' }
    };
    this.setdatogeneral(worksheet, "M" + row, "CUI/SNIP", 10, true);
    worksheet.getCell('M' + row).font = { color: { argb: 'FF0000' }, bold: true };
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).font = { color: { argb: 'FF0000' }, };
    this.setdatogeneral(worksheet, "N" + row, proyecto.c_codigocui, 10, false, 'ffeb3b');

    // 3
    row += 1;
    this.setdatogeneral(worksheet, "B" + row, "DATOS DEL PROYECTO", 9, true);
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 4
    row += 1;
    worksheet.getRow(row).height = 30;
    worksheet.mergeCells("B" + row + ":E" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, 'NOMBRE', 10, true, 'f7f0b3');
    worksheet.getCell("B" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' }, // thin(linea solida), double(doble linea)
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.mergeCells("F" + row + ":L" + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, "F" + row, proyecto.c_nombreproyecto, 10, true, 'ffeb3b');
    worksheet.getCell("F" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' }, // thin(linea solida), double(doble linea)
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.mergeCells("M" + row + ":N" + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'CONTROL DE PROCESOS - HITOS', 10, true, '8bc34a');
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' }, // thin(linea solida), double(doble linea)
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // 5
    row += 1;
    worksheet.mergeCells("B" + row + ":L" + row);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = { right: { style: 'thin' } };
    worksheet.getCell('N' + row).border = { right: { style: 'thin' } };

    // 6
    row += 1;
    worksheet.mergeCells("B" + row + ":F" + row);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
    }
    worksheet.mergeCells("G" + row + ":L" + row);
    this.setdatogeneral(worksheet, 'G' + row, 'UBICACIÓN', 10, true);
    worksheet.getCell("G" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },

    }
    worksheet.getCell('M' + row).border = { right: { style: 'thin' } };
    worksheet.getCell('N' + row).border = { right: { style: 'thin' } };

    // 7
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   PROCESO DE SELECCIÓN', 10, true);
    worksheet.getCell("B" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_procesoseleccion, 10, false);
    worksheet.mergeCells('G' + row + ':L' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'DISTRITO (S): ' + proyecto.c_distritos, 10, true);
    worksheet.getCell("L" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, 'SUSCRIPCIÓN CONTRATO', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, proyecto.c_subcontrato, 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 8
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ENTIDAD CONTRATANTE', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   MEM/DGER', 10, false);
    worksheet.mergeCells('G' + row + ':L' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'PROVINCIA (S): ' + proyecto.c_provincias, 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, 'ENTREGA DE TERRENO', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, proyecto.c_terreno, 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 9
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   VALOR REFERENCIAL', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   S/. ' + proyecto.c_valorreferencial, 10, false);
    worksheet.mergeCells('G' + row + ':L' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'DEPARTAMENTO DE ' + proyecto.c_departamento, 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, 'ADELANTO DIRECTO', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, proyecto.c_entreadelanto, 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 10
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   VALOR OFERTADO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   S/. ' + proyecto.c_valorofertado, 10, false);
    worksheet.mergeCells('G' + row + ':L' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'META :', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, 'INICIO DE OBRA', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, proyecto.c_inicioobra, 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 11
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   % DEL V.R. OFERTADO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + ((proyecto.c_valorofertado / proyecto.c_valorreferencial) * 100).toFixed(2) + '%', 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   N° LOCALIDADES BENEFICIADAS', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_nrolocalidades, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'L' + row, 'Localidades', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, 'EXPEDIENTE REPLANTEO', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, proyecto.c_expediente, 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 12
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   SISTEMA DE CONTRATACIÓN', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_siscontratacion, 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   N° POBLACIÓN BENEFICIADA', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_nropoblacion, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'L' + row, 'Habitantes', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, 'FIN DE OBRA', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, proyecto.c_finobra, 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 13
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   INGº COORD. DE OBRA DEP/MEM', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   INGº ' + proyecto.c_coordobra, 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   N° DE CONEXIONES', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_conexiones, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'L' + row, 'Conexiones', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 14
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   INGº COORD. DE OBRA DEP/MEM', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   LONGITUD DE LINEA', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_longlinea, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'L' + row, 'km', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('M' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
    worksheet.getCell('N' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // 16
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS DEL CONTRATO DE OBRA", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 17
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   CONTRATISTA', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('F' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'G' + row, proyecto.c_nomcontratista, 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    // 18
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   REPRESENTANTE LEGAL', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_reprelegal, 10, false);
    worksheet.mergeCells('G' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, true);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   ADELANTOS', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 19
    worksheet.getColumn(9).width = 15;
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   INGENIERO RESIDENTE', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   Ing. ' + proyecto.c_residenteobra, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '  ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   Adelanto Directo (Sin IGV)', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'N' + row, 'S/. ' + parseFloat((proyecto.c_adelantodirec / 1.18).toFixed(2)), 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 20
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   N° DE CONTRATO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_nrocontrato, 10, true);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    //
    //
    // ADELANTO DE MATERIALES
    //
    //
    // 21
    let rowVar = row - 1;

    for (let i = 0; i < 5; i++) {
      let Arr = adelMateriales[i];
      rowVar += 1;
      if (i < (countAdelMateriales)) {
        worksheet.mergeCells('L' + rowVar + ':M' + rowVar);
        this.setdatogeneral(worksheet, 'L' + rowVar, '   Adelanto de Materiales Nº 0' + (i + 1) + ' (Sin IGV): ', 10, false);
        worksheet.getCell("L" + rowVar).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("N" + rowVar).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        let montoSinIGV = (parseFloat(Arr.monto) / 1.18);
        this.setdatogeneral(worksheet, 'N' + rowVar, 'S/. ' + montoSinIGV.toFixed(2), 10, false);
        worksheet.getCell('N' + rowVar).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('N' + rowVar).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        };
      } else {
        worksheet.mergeCells('L' + rowVar + ':M' + rowVar);
        this.setdatogeneral(worksheet, 'L' + rowVar, '   Adelanto de Materiales Nº 0' + (i + 1) + ' (Sin IGV): ', 10, false);
        worksheet.getCell("L" + rowVar).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("N" + rowVar).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        this.setdatogeneral(worksheet, 'N' + rowVar, 'S/. ' + '', 10, false);
        worksheet.getCell('N' + rowVar).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('N' + rowVar).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        };
      }
    }

    // 21
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   SUSCRIPCION DEL CONTRATO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_subcontrato, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '  ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 22
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, '', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 23
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ENTREGA DEL EXPEDIENTE TÉCNICO DE OBRA COMPLETO.', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_entregaexpobra, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 24
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   NOTIFICACION AL CONTRATISTA QUIEN ES EL INSPECTOR O SUPERVISOR.', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_notificontratista, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'MONTO DEL CONTRATO: ', 10, true);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // Formularemos el costo directo, ggutilidades, subtotal, igb18% y total
    const valorofertado = parseFloat(proyecto.c_valorofertado);
    const ggutilidades = parseFloat(proyecto.c_ggutilidades);
    const costodirecto = ((valorofertado) / 1.18) - ggutilidades;
    const subtotal = costodirecto + ggutilidades;
    const igv = subtotal * (18 / 100);
    const total = subtotal + igv;

    // 25
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ENTREGA DEL ADELANTO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_entreadelanto, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   COSTO DIRECTO', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, costodirecto.toFixed(2) + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   N° AMPLIACIONES DE PLAZO', 10, true);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'N' + row, '', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 26
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ENTREGA DE TERRENO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_terreno, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   GG Y UTILIDADES', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, proyecto.c_ggutilidades + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    //
    //
    // AMPLIACIÓN PLAZO
    //
    //
    // 
    let rowVar2 = row - 1;

    for (let i = 0; i < 5; i++) {
      let Arr = adelPlazo[i];
      rowVar2 += 1;
      if (i < (countAdelPlazo)) {
        worksheet.mergeCells('L' + rowVar2 + ':M' + rowVar2);
        this.setdatogeneral(worksheet, 'L' + rowVar2, '   ' + 'Ampliación de Plazo N° 0' + (i + 1), 10, false);
        worksheet.getCell("L" + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("N" + rowVar2).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        this.setdatogeneral(worksheet, 'N' + rowVar2, Arr.plazo_otorgado, 10, false);
        worksheet.getCell('N' + rowVar2).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('N' + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        };
      } else {
        worksheet.mergeCells('L' + rowVar2 + ':M' + rowVar2);
        this.setdatogeneral(worksheet, 'L' + rowVar2, '   Ampliación de Plazo N° 0' + (i + 1), 10, false);
        worksheet.getCell("L" + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("N" + rowVar2).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        this.setdatogeneral(worksheet, 'N' + rowVar2, ' ', 10, false);
        worksheet.getCell('N' + rowVar2).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('N' + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        };
      }
    }

    // 27
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   INICIO DE OBRA', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_inicioobratarea, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   SUB TOTAL', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, subtotal.toFixed(2) + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 28
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   PLAZO DE EJECUCION (DIAS)', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_plazoejecdias, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   IGV 18%', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, igv.toFixed(2) + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }


    let arrFecha = proyecto.c_inicioobratarea.split('/');
    let fecha = new Date(arrFecha[1] + '/' + arrFecha[0] + '/' + arrFecha[2]);
    fecha.setDate(fecha.getDate() + parseInt(proyecto.c_plazoejecdias));
    const dateText = fecha.getDate() + '/' +
      (fecha.getMonth() + 1) + '/' + fecha.getFullYear();


    // 29
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   TERMINO DE OBRA', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + dateText, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   TOTAL (S/)', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, total.toFixed(2) + '  ', 10, true);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 30
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, '', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, true);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 31
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, '', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, true);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   PLAZO TOTAL DE EJECUCIÓN', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'N' + row, totalPlatoEjecucion, 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    let fechaNuevoTermino = new Date();
    fechaNuevoTermino = fecha;
    fechaNuevoTermino.setDate(fecha.getDate() + parseInt(totalPlatoEjecucion) - 1);
    const dateTextNuevoTermino = fechaNuevoTermino.getDate() + '/' +
      (fechaNuevoTermino.getMonth() + 1) + '/' + fechaNuevoTermino.getFullYear();

    // 32
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'E' + row, '', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, true);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   NUEVO TERMINO', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'N' + row, dateTextNuevoTermino, 11, true);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // 34
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS DE SUPERVISIÓN DE OBRA", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 35
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   SUPERVISIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_nomempresa, 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('G' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, false, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    // 36
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   REPRESENTANTE LEGAL', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('F' + row + ':H' + row);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_reprelegalsuscontr, 10, false);
    worksheet.mergeCells('I' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'I' + row, '   GERENTE DE SUPERVISIÓN', 10, false);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'L' + row, ':', 10, true);
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    //CAMBIAR NOMBRE
    worksheet.mergeCells('M' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'M' + row, '  ' + proyecto.c_superobra, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 37
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   N° DE CONTRATO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('F' + row + ':H' + row);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_nrocontratoreprelegal, 10, false);
    worksheet.mergeCells('I' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'I' + row, '   SUPERVISIÓN DE OBRA', 10, false);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'L' + row, ':', 10, true);
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'M' + row, '  ' + proyecto.c_gerentesuper, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 38
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   SUSCRIPCION DEL CONTRATO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('F' + row + ':H' + row);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_subcontratosupervision, 10, false);
    worksheet.mergeCells('I' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'I' + row, '   ASISTENTE DE SUPERVISION', 10, false);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'L' + row, ':', 10, true);
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'M' + row, '  ' + '', 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // 40
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "ADELANTO OTORGADO", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 41
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'DESCRIPCIÓN', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    }
    worksheet.mergeCells('F' + row + ':J' + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'ADELANTO DIRECTO', 10, true);
    worksheet.getCell("J" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('K' + row + ':N' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'ADELANTO MATERIALES', 10, true);
    worksheet.getCell("N" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    // 42
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'S/ IGV', 10, true);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'C/ IGV', 10, true);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('I' + row + ':J' + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, '%', 10, true);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('K' + row + ':L' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'S/ IGV', 10, true);
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'C/ IGV', 10, true);
    worksheet.getCell("M" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, '%', 10, true);
    worksheet.getCell("N" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    // 43
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  ADELANTO OTORGADO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    const adeladoDir = parseFloat(proyecto.c_adelantodirec);
    const adelantoDirSinIGV = (adeladoDir) / (1.18);
    const porcentajeSuperObra = Math.round((adeladoDir / total) * 100);

    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, adelantoDirSinIGV, 10, false);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }

    worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, adeladoDir, 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }

    worksheet.mergeCells('I' + row + ':J' + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, porcentajeSuperObra + '%', 10, false);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }

    const adeladoMat = parseFloat(proyecto.c_adelantomattotal);
    const adelantoMatSinIGV = (adeladoMat) / (1.18);
    const porcentajeSuperObraAdelMaterial = Math.round((adeladoMat / total) * 100);

    worksheet.mergeCells('K' + row + ':L' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adelantoMatSinIGV, 10, false);
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }

    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, adeladoMat, 10, false);
    worksheet.getCell("M" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }
    const adelantoMatConIGV = Math.round((adelantoMatSinIGV / total))
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, porcentajeSuperObraAdelMaterial + '%', 10, false);
    worksheet.getCell("N" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }

    // 44
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, false);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('I' + row + ':J' + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' ', 10, false);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('K' + row + ':L' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, false);
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, false);
    worksheet.getCell("M" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
    worksheet.getCell("N" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    }

    // 45
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, false);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('I' + row + ':J' + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' ', 10, false);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('K' + row + ':L' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, false);
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, false);
    worksheet.getCell("M" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
    worksheet.getCell("N" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    // 46
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL APROBADO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, adelantoDirSinIGV, 10, true);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, adeladoDir, 10, true);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('I' + row + ':J' + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, porcentajeSuperObra + '%', 10, true);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('K' + row + ':L' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adelantoMatSinIGV, 10, true);
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, adeladoMat, 10, true);
    worksheet.getCell("M" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, porcentajeSuperObraAdelMaterial + '%', 10, true);
    worksheet.getCell("N" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    // 48
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "PRESUPUESTO DE OBRA APROBADOS", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 49
    row += 1;
    worksheet.mergeCells('B' + row + ':N' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'PRESUPUESTO POR MAYORES METRADOS Y PARTIDAS NUEVAS', 10, true);
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };
    worksheet.getCell("N" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // 50
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'Nº R.M.', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'FECHA', 10, true);
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('F' + row + ':G' + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'ADICIONAL', 10, true);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('H' + row + ':I' + row);
    worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'H' + row, 'DEDUCTIVO', 10, true);
    worksheet.getCell("H" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'MONTO APROBADO', 10, true);
    worksheet.getCell("J" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, '(%) INCIDENCIA', 10, true);
    worksheet.getCell("L" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'TIPO ADICIONAL', 10, true);
    worksheet.getCell("M" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    let totalPorcentajePresupuestoObra = 0;
    let totalMontoAprobado = 0;
    // 51
    for (let i = 0; i < countPresupuestoObra; i++) {
      const adicional = parseFloat(presupuestoObra[i].presu_adicional);
      const deductivo = parseFloat(presupuestoObra[i].presu_deductivo);
      const incidencia = (((adicional - deductivo) / total) * 100).toFixed(2);
      totalPorcentajePresupuestoObra += parseFloat(incidencia);
      row += 1;

      let montoaprobado = presupuestoObra[i].presu_adicional - presupuestoObra[i].presu_deductivo;
      totalMontoAprobado += montoaprobado;

      if (i !== (countPresupuestoObra - 1)) {
        worksheet.mergeCells('B' + row + ':D' + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, presupuestoObra[i].nro_rm, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, presupuestoObra[i].fecha_solicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }
        worksheet.mergeCells('F' + row + ':G' + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, presupuestoObra[i].presu_adicional, 10, false);
        worksheet.getCell("F" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }
        worksheet.mergeCells('H' + row + ':I' + row);
        worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, presupuestoObra[i].presu_deductivo, 10, false);
        worksheet.getCell("H" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }// formula 
        worksheet.mergeCells('J' + row + ':K' + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, montoaprobado, 10, false);
        worksheet.getCell("J" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, incidencia + '%', 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells('M' + row + ':N' + row);
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, presupuestoObra[i].tipo_adicional, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
      } else {
        worksheet.mergeCells('B' + row + ':D' + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, presupuestoObra[i].nro_rm, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, presupuestoObra[i].fecha_solicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.mergeCells('F' + row + ':G' + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, presupuestoObra[i].presu_adicional, 10, false);
        worksheet.getCell("F" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.mergeCells('H' + row + ':I' + row);
        worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, presupuestoObra[i].presu_deductivo, 10, false);
        worksheet.getCell("H" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }// formula
        worksheet.mergeCells('J' + row + ':K' + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, montoaprobado, 10, false);
        worksheet.getCell("J" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, incidencia + '%', 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells('M' + row + ':N' + row);
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, presupuestoObra[i].tipo_adicional, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    }

    //
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, 'Sub total (INC. IGV)', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('F' + row + ':G' + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalAdicional_PreObra, 10, false);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('H' + row + ':I' + row);
    worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'H' + row, totalDeductivo_PreObra, 10, false);
    worksheet.getCell("H" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    } // suma monto aprobado
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, totalMontoAprobado, 10, false);
    worksheet.getCell("J" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, totalPorcentajePresupuestoObra + '%', 10, false);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, '', 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // 55 - 54
    const totalMontoContrato = total + totalAdicional_PreObra - totalDeductivo_PreObra;
    const totalMontoVigente = (totalMontoContrato / 1.18);

    row += 1;
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'MONTO DEL CONTRATO VIGENTE', 10, true);
    worksheet.getCell('G' + row).font = { color: { argb: '0000FF' }, bold: true };
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' },
      left: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'J' + row, totalMontoVigente, 10, true);
    worksheet.getCell('J' + row).font = { color: { argb: '0000FF' }, bold: true };
    worksheet.getCell("J" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'K' + row, totalMontoContrato, 10, true);
    worksheet.getCell('K' + row).font = { color: { argb: '0000FF' }, bold: true };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    row += 1;
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'SIN IGV', 10, true);
    worksheet.getCell("J" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'CON IGV', 10, true);
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }


    // --------------------------------------------------------------
    // DATOS DE AVANCE DE OBRA
    // --------------------------------------------------------------

    // // 57
    // row += 2;
    // this.setdatogeneral(worksheet, "B" + row, "DATOS DE AVANCE DE OBRA", 9, true);
    // worksheet.getCell('B' + row).border = {
    //   top: {style:'thin', color: {argb:'c8d5dc'}},
    // };
    // worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // // 58
    // row += 1;
    // worksheet.mergeCells('B' + row + ':D' + row);
    // worksheet.getCell('B'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'B' + row, 'MES-AÑO', 10, true);
    // worksheet.getCell("B" + row).border = {
    //   left: {style: 'thin'},
    //   right: {style:'thin'},
    //   top: {style:'thin'},
    // }
    // worksheet.mergeCells('E' + row + ':I' + row);
    // worksheet.getCell('E'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'E' + row, 'PROGRAMADO', 10, true);
    // worksheet.getCell("I" + row).border = {
    //   top: {style: 'thin'},
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.mergeCells('J' + row + ':N' + row);
    // worksheet.getCell('J'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'J' + row, 'REAL', 10, true);
    // worksheet.getCell("N" + row).border = {
    //   top: {style: 'thin'},
    //   bottom: {style:'thin'},
    //   right: {style:'thin'},
    // }

    // // 59
    // row += 1;
    // worksheet.mergeCells('B' + row + ':D' + row);
    // worksheet.getCell('B'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true);
    // worksheet.getCell("B" + row).border = {
    //   left: {style: 'thin'},
    //   right: {style:'thin'},
    //   bottom: {style:'thin'},
    // }
    // worksheet.getCell('E'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'E' + row, 'LP', 10, true);
    // worksheet.getCell("E" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.getCell('F'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'F' + row, 'RP', 10, true);
    // worksheet.getCell("F" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.mergeCells('G' + row + ':H' + row);
    // worksheet.getCell('G'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'G' + row, 'RS', 10, true);
    // worksheet.getCell("H" + row).border = {
    //   left: {style: 'thin'},
    //   right: {style:'thin'},
    //   bottom: {style:'thin'},
    // }
    // worksheet.getCell('I'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'I' + row, 'TOTAL', 10, true);
    // worksheet.getCell("I" + row).border = {
    //   left: {style: 'thin'},
    //   right: {style:'thin'},
    //   bottom: {style:'thin'},
    // }
    // worksheet.getCell('J'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'J' + row, 'LP', 10, true);
    // worksheet.getCell("J" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.mergeCells('K' + row + ':L' + row);
    // worksheet.getCell('K'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'K' + row, 'RP', 10, true);
    // worksheet.getCell("L" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.getCell('M'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'M' + row, 'RS', 10, true);
    // worksheet.getCell("M" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.getCell('N'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true);
    // worksheet.getCell("N" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }

    // //
    // for(let i = 0; i < countDatosAvanceObra; i++) {
    //   row += 1;
    //   if (i !== (countDatosAvanceObra - 1)) {
    //     worksheet.mergeCells('B' + row + ':D' + row);
    //     this.setdatogeneral(worksheet, 'B' + row,'  ' + 'JUL 2018', 10, false);
    //     worksheet.getCell("B" + row).border = {
    //       left: {style: 'thin'},
    //       right: {style:'thin'},
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //     }
    //     worksheet.getCell('E'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'E' + row, '6,504,46', 10, false);
    //     worksheet.getCell("E" + row).border = {
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //       right: {style:'thin'}
    //     }
    //     worksheet.getCell('F'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'F' + row, '1,930.45', 10, false);
    //     worksheet.getCell("F" + row).border = {
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //       right: {style:'thin'}
    //     }
    //     worksheet.mergeCells('G' + row + ':H' + row);
    //     worksheet.getCell('G'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'G' + row, '4,290.32', 10, false);
    //     worksheet.getCell("H" + row).border = {
    //       left: {style: 'thin'},
    //       right: {style:'thin'},
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //     }
    //     worksheet.getCell('I'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'I' + row, '12,725.23', 10, false);
    //     worksheet.getCell("I" + row).border = {
    //       left: {style: 'thin'},
    //       right: {style:'thin'},
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //     }
    //     worksheet.getCell('J'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'J' + row, '6,504.46', 10, false);
    //     worksheet.getCell("J" + row).border = {
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //       right: {style:'thin'}
    //     }
    //     worksheet.mergeCells('K' + row + ':L' + row);
    //     worksheet.getCell('K'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'K' + row, '1,930.45', 10, false);
    //     worksheet.getCell("L" + row).border = {
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //       right: {style:'thin'}
    //     }
    //     worksheet.getCell('M'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'M' + row, '4,290.32', 10, false);
    //     worksheet.getCell("M" + row).border = {
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //       right: {style:'thin'}
    //     }
    //     worksheet.getCell('N'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'N' + row, '12,725,23', 10, false);
    //     worksheet.getCell("N" + row).border = {
    //       bottom: {style:'thin', color: {argb:'c8d5dc'}},
    //       right: {style:'thin'}
    //     }
    //   } else {
    //     worksheet.mergeCells('B' + row + ':D' + row);
    //     this.setdatogeneral(worksheet, 'B' + row,'  ' + 'JUL 2018', 10, false);
    //     worksheet.getCell("B" + row).border = {
    //       left: {style: 'thin'},
    //       right: {style:'thin'},
    //       bottom: {style:'thin'},
    //     }
    //     worksheet.getCell('E'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'E' + row, '6,504,46', 10, false);
    //     worksheet.getCell("E" + row).border = {
    //       bottom: {style:'thin'},
    //       right: {style:'thin'}
    //     }
    //     worksheet.getCell('F'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'F' + row, '1,930.45', 10, false);
    //     worksheet.getCell("F" + row).border = {
    //       bottom: {style:'thin'},
    //       right: {style:'thin'}
    //     }
    //     worksheet.mergeCells('G' + row + ':H' + row);
    //     worksheet.getCell('G'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'G' + row, '4,290.32', 10, false);
    //     worksheet.getCell("H" + row).border = {
    //       left: {style: 'thin'},
    //       right: {style:'thin'},
    //       bottom: {style:'thin'},
    //     }
    //     worksheet.getCell('I'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'I' + row, '12,725.23', 10, false);
    //     worksheet.getCell("I" + row).border = {
    //       left: {style: 'thin'},
    //       right: {style:'thin'},
    //       bottom: {style:'thin'},
    //     }
    //     worksheet.getCell('J'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'J' + row, '6,504.46', 10, false);
    //     worksheet.getCell("J" + row).border = {
    //       bottom: {style:'thin'},
    //       right: {style:'thin'}
    //     }
    //     worksheet.mergeCells('K' + row + ':L' + row);
    //     worksheet.getCell('K'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'K' + row, '1,930.45', 10, false);
    //     worksheet.getCell("L" + row).border = {
    //       bottom: {style:'thin'},
    //       right: {style:'thin'}
    //     }
    //     worksheet.getCell('M'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'M' + row, '4,290.32', 10, false);
    //     worksheet.getCell("M" + row).border = {
    //       bottom: {style:'thin'},
    //       right: {style:'thin'}
    //     }
    //     worksheet.getCell('N'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    //     this.setdatogeneral(worksheet, 'N' + row, '12,725,23', 10, false);
    //     worksheet.getCell("N" + row).border = {
    //       bottom: {style:'thin'},
    //       right: {style:'thin'}
    //     }
    //   }
    // }

    // // 
    // row += 1;
    // worksheet.mergeCells('B' + row + ':D' + row);
    // this.setdatogeneral(worksheet, 'B' + row,' TOTAL', 10, false);
    // worksheet.getCell("B" + row).border = {
    //   left: {style: 'thin'},
    //   right: {style:'thin'},
    //   bottom: {style:'thin'},
    // }
    // worksheet.getCell('E'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'E' + row, '590,641.99', 10, false);
    // worksheet.getCell("E" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.getCell('F'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'F' + row, '218,547.62', 10, false);
    // worksheet.getCell("F" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.mergeCells('G' + row + ':H' + row);
    // worksheet.getCell('G'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'G' + row, '879,865.73', 10, false);
    // worksheet.getCell("H" + row).border = {
    //   left: {style: 'thin'},
    //   right: {style:'thin'},
    //   bottom: {style:'thin'},
    // }
    // worksheet.getCell('I'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'I' + row, '1,689,055.34', 10, false);
    // worksheet.getCell("I" + row).border = {
    //   left: {style: 'thin'},
    //   right: {style:'thin'},
    //   bottom: {style:'thin'},
    // }
    // worksheet.getCell('J'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'J' + row, ' ', 10, false);
    // worksheet.getCell("J" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.mergeCells('K' + row + ':L' + row);
    // worksheet.getCell('K'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'K' + row, ' ', 10, false);
    // worksheet.getCell("L" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.getCell('M'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'M' + row, ' ', 10, false);
    // worksheet.getCell("M" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }
    // worksheet.getCell('N'+ row).alignment = { vertical: 'middle', horizontal: 'center' };
    // this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
    // worksheet.getCell("N" + row).border = {
    //   bottom: {style:'thin'},
    //   right: {style:'thin'}
    // }

    // 56
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "AVANCE DE OBRA", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 57
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'PERIODO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    }
    worksheet.mergeCells('C' + row + ':M' + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'AVANCE PROGRAMADO VS. REAL EJECUTADO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'SPI', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      top: { style: 'thin' },
      right: { style: 'thin' },
    }

    // 73
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    }
    worksheet.mergeCells('C' + row + ':E' + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'PROGRAMADO', 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('F' + row + ':L' + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAL EJECUTADO', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'AVANCE', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
    }

    // 74
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'MENSUAL', 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'ACUMULADO', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, '%', 10, true, 'a5b0ec');
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'AVANCE MENSUAL CONTRACTUAL', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'AVANCE MENSUAL MAYOR', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AVANCE MENSUAL PARTIDAS ADICIONALES', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'ACUMULADO PA SUM', 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'TOTAL ACUMULADO', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, '%', 10, true, 'a5b0ec');
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    let sumaAcumPA = 0;
    let sumaAvanceMensualContractual = 0;
    let sumaAvanceMensualMayor = 0;
    let sumaAvanceMensualPA = 0;
    const arrPorcentajesEJES = (avanceProgramaoVsRealEjecutado.map(value => value.porcentaje_eje));
    let maxPorcentajeEJES = Math.max(...arrPorcentajesEJES); // Infinity
    maxPorcentajeEJES = isFinite(maxPorcentajeEJES) ? maxPorcentajeEJES : 0;

    for (let i = 0; i < countArrAPVRE; i++) {
      const Arr2 = programadoAcumYPor[i];
      const Arr = avanceProgramaoVsRealEjecutado[i];
      let auxAcum = (Arr.acum_contractual_eje + Arr.acumulado_mm_eje + Arr.acumulado_pa_eje);
      sumaAcumPA += auxAcum;
      sumaAvanceMensualContractual = sumaAvanceMensualContractual + Arr.acum_contractual_eje;
      sumaAvanceMensualMayor = sumaAvanceMensualMayor + Arr.acumulado_mm_eje;
      sumaAvanceMensualPA = sumaAvanceMensualPA + Arr.acumulado_pa_eje;

      let avance = isNaN(parseFloat(((Arr.total_acumulado_eje / Arr2.acum) * 100).toFixed(2)))
        ? 0
        : parseFloat(((Arr.total_acumulado_eje / Arr2.acum) * 100).toFixed(2));

      let spi = ((Arr.porcentaje_eje).toFixed(2) / (Arr2.porcen).toFixed(2));
      row += 1;
      if (i !== (countArrAPVRE - 1)) {
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, ' ' + Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.mensual_prog, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr2.acum, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr2.porcen * 0.01, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("E" + row).numFmt = '0.00%';

        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.acum_contractual_eje, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.acumulado_mm_eje, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.acumulado_pa_eje, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, auxAcum, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.total_acumulado_eje, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, Arr.porcentaje_eje * 0.01, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("L" + row).numFmt = '0.00%';

        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, avance * 0.01, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("M" + row).numFmt = '0.00%';

        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, spi, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
      }
      else {
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, ' ' + Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.mensual_prog, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr2.acum, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr2.porcen * 0.01, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell("E" + row).numFmt = '0.00%';

        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.acum_contractual_eje, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.acumulado_mm_eje, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.acumulado_pa_eje, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.acumulado_pa_suma_eje, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.total_acumulado_eje, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, Arr.porcentaje_eje * 0.01, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell("L" + row).numFmt = '0.00%';

        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, avance * 0.01, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell("M" + row).numFmt = '0.00%';

        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, spi, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    }

    row += 1;
    worksheet.mergeCells("C" + row + ":D" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, tatalMensualProg, 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    //CRISTHIAN
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, sumaAvanceMensualContractual/*maxAcumContractual*/, 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, sumaAvanceMensualMayor, 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, sumaAvanceMensualPA, 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, sumaAcumPA, 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, maxPorcentajeEJES * 0.01, 10, true, 'a5b0ec');
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell("L" + row).numFmt = '0.00%';

    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ' + ' ', 10, true, 'a5b0ec'); // totalAvance
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // ------------------------------------------------------------------------------
    // CONTRASTE DE  VALORACIZACIÓN - VALORIZACIÓN CONTRACTUAL
    // ------------------------------------------------------------------------------

    // 81
    /*row += 3;
    this.setdatogeneral(worksheet, "B" + row, "CURVA \"S\"", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    for (let i = 1; i <= 30; i++) {
      row += 1;

      if (i == 1) {
        for (let x = 2; x <= 11; x++) {
          if (x == 2) {
            worksheet.getRow(row).getCell(x).border = {
              left: { style: 'thin' },
              //right: { style: 'thin' },
              top: { style: 'thin' },
              //bottom: { style: 'thin' },
            }
          }

          if (x >= 3 && x <= 10) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              //right: { style: 'thin' },
              top: { style: 'thin' },
              //bottom: { style: 'thin' },
            }
          }

          if (x == 11) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              right: { style: 'thin' },
              top: { style: 'thin' },
              //bottom: { style: 'thin' },
            }
          }
        }
      }

      if (i >= 2 && i <= 29) {
        worksheet.getRow(row).getCell(2).border = {
          left: { style: 'thin' },
          //right: { style: 'thin' },
          //top: { style: 'thin' },
          //bottom: { style: 'thin' },
        }

        worksheet.getRow(row).getCell(11).border = {
          //left: { style: 'thin' },
          right: { style: 'thin' },
          //top: { style: 'thin' },
          //bottom: { style: 'thin' },
        }
        //marco
        if (i == 10) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Resumen', 10, true);
        }

        if (i == 12) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado programado', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 13) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado ejecutado', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 14) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado programado (%)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 15) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado ejecutado (%)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 16) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance del proyecto', 10, true, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 17) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'SPI >= 1 (Costo inferior al presupuestado)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 18) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'SPI < 1 (Sobre costo respecto al trabajo completado)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

      }

      if (i == 30) {
        for (let x = 2; x <= 11; x++) {
          if (x == 2) {
            worksheet.getRow(row).getCell(x).border = {
              left: { style: 'thin' },
              //right: { style: 'thin' },
              //top: { style: 'thin' },
              bottom: { style: 'thin' },
            }
          }

          if (x >= 3 && x <= 10) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              //right: { style: 'thin' },
              //top: { style: 'thin' },
              bottom: { style: 'thin' },
            }
          }

          if (x == 11) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              right: { style: 'thin' },
              //top: { style: 'thin' },
              bottom: { style: 'thin' },
            }
          }
        }
      }
    }*/

    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "CONTRASTE DE VALORIZACIÓN", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 82
    row += 1;
    this.setdatogeneral(worksheet, "B" + row, "VALORIZACIÓN CONTRACTUAL", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 83
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'MES-AÑO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 84
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'AD. MATERIALES', 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countContraste; i++) {
      row += 1;
      if (i !== (countContraste - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, valContractual[i].mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, valContractual[i].val_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, valContractual[i].reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, valContractual[i].deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, valContractual[i].amor_adel_direc, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, valContractual[i].amor_adel_mat, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, valContractual[i].val_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, valContractual[i].igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, valContractual[i].total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, valContractual[i].mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, valContractual[i].val_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, valContractual[i].reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, valContractual[i].deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, valContractual[i].amor_adel_direc, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, valContractual[i].amor_adel_mat, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, valContractual[i].val_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, valContractual[i].igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, valContractual[i].total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL PAGADO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, totalValBruta_valC, 10, true);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalReajuste_valC, 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalDeduccion_valC, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalAdDirecto_valC, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, totalAddMateriales_valC, 10, false);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNeta_valC, 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGV_valC, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, tatalTotal_valC, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -----------------------------------------------------------------------------
    // VALORIZACIÓN MAYORES METRADOS
    // ------------------------------------------------------------------------------

    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "VALORIZACIÓN MAYORES METRADOS", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 91
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'MES-AÑO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 92
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'AD. MATERIALES', 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countValMetrados; i++) {
      let Arr = valoMetrados[i];
      row += 1;
      if (i !== (countValMetrados - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.amor_materiales, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.amor_materiales, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL PAGADO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, totalValBruta, 10, true);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalReajuste, 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalDeduccion, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalDirecto, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, totalMateriales, 10, false);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNeta, 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGV, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, totalTotal, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // --------------------------------------------------------------
    // VALORIZACIÓN PARTIDAS ADICIONALES
    // -------------------------------------------------------------
    // 98
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "VALORIZACIÓN PARTIDAS ADICIONALES", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 99
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'MES-AÑO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 100
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'AD. MATERIALES', 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countAdicionales; i++) {
      let Arr = valoresAdicionales[i];
      row += 1;
      if (i !== (countAdicionales - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.amor_materiales, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.amor_materiales, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL PAGADO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, totalValBrutaAD, 10, true);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalReajusteAD, 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalDeduccionAD, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalDirectoAD, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, totalMaterialesAD, 10, false);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNetaAD, 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGVAD, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, totalTotalAD, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -----------------------------------------------------------------------------
    // RESUMEN DE VALORIZACIONES
    // -----------------------------------------------------------------------------

    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "RESUMEN DE VALORIZACIONES", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 107
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'DESCRIPCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 108
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'AD. MATERIALES', 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // 109
    const valBruta_resumen = totalValBruta_valC + totalValBruta + totalValBrutaAD;
    const reajuste_resumen = totalReajuste_valC + totalReajuste + totalReajusteAD;
    const deduccion_resumen = totalDeduccion_valC + totalDeduccion + totalDeduccionAD;
    const totalDirecto_resumen = totalAdDirecto_valC + totalDirecto + totalDirectoAD;
    const totalMateriales_resumen = totalAddMateriales_valC + totalMateriales + totalMaterialesAD;
    const totalValNeta_resumen = totalValNeta_valC + totalValNeta + totalValNetaAD;
    const totalIGV_resumen = totalIGV_valC + totalIGV + totalIGVAD;
    const totaltotal_resumen = tatalTotal_valC + totalTotal + totalTotalAD;

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, valBruta_resumen, 10, false);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, reajuste_resumen, 10, false);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, deduccion_resumen, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalDirecto_resumen, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, totalMateriales_resumen, 10, false);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNeta_resumen, 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGV_resumen, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, totaltotal_resumen, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -----------------------------------------------------------------------------
    // Avance económico
    // -----------------------------------------------------------------------------

    //
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "AVANCE ECONÓMICO", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 112
    row += 1;
    worksheet.mergeCells("B" + row + ":H" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'PAGOS EFECTUADOS', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIONES', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":M" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'SALDO', 10, true, 'a5b0ec');
    worksheet.getCell('K' + row).font = { color: { argb: 'FF0000' }, bold: true };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'SALDO POR PAGAR', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 113
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("C" + row + ":D" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'AD. MATERIALES', 10, true, 'a5b0ec');
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'VALORIZ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'AD. MATERIALES', 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, 'AD. MATERIALES', 10, true, 'a5b0ec');
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'POR VALORIZAR', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // COSTO DIRECTO
    const adDirectoPE = parseFloat((proyecto.c_adelantodirec / 1.18).toFixed(2));
    const adMaterialesPE = parseFloat((proyecto.c_adelantomattotal)) / 1.18;
    const valoriz = totalValNeta_valC + totalValNeta + totalValNetaAD;
    const totalPE = adDirectoPE + adMaterialesPE + valoriz;
    const adDirectoAM = totalAdDirecto_valC + totalDirecto + totalDirectoAD;
    const adMaterialesAM = totalAddMateriales_valC + totalMateriales + totalMaterialesAD;
    const adDirectoSal = adDirectoPE - adDirectoAM;
    const adMaterialesSal = adMaterialesPE - adMaterialesAM;
    const porValorizar = totalMontoVigente - valBruta_resumen;
    const saldoPorPagar = porValorizar - adMaterialesSal - adDirectoSal;

    // CON IGV
    const adDirectoPE_igv = parseFloat((proyecto.c_adelantodirec));
    const adMaterialesPE_igv = adMaterialesPE * 1.18;
    const valoriz_igv = valoriz * 1.18;
    const totalPE_igv = adDirectoPE_igv + adMaterialesPE_igv + valoriz_igv;
    const adDirectoAM_igv = adDirectoAM * 1.18;
    const adMaterilesAM_igv = adMaterialesAM * 1.18;
    const adDirectoSal_igv = adDirectoPE_igv - adDirectoAM_igv;
    const adMaterialesSal_igv = adMaterialesPE_igv - adMaterilesAM_igv;
    const porValorizar_igv = porValorizar * 1.18;
    const saldoPorPagar_igv = porValorizar_igv - adMaterialesSal_igv - adDirectoSal_igv;

    // total
    // k29 = total - // k55 = totalMontoContrato
    const adDirectoPET = ((adDirectoPE_igv / total) * 100).toFixed(2);
    const adMaterialesPET = ((adMaterialesPE_igv / total) * 100).toFixed(2);
    const valorizPET = ((valoriz_igv / totalMontoContrato) * 100).toFixed(2);
    const totalPET = ((totalPE_igv / totalMontoContrato) * 100).toFixed(2);
    let adDirectoAMT = ((adDirectoAM_igv / adDirectoPE_igv) * 100).toFixed(2);
    let adMaterialesAMT = ((adMaterilesAM_igv / adMaterialesPE_igv) * 100).toFixed(2);
    let adDirectoSalT = ((adDirectoSal_igv / adDirectoPE_igv) * 100).toFixed(2);
    let adMaterialesSalT = (Math.abs((adMaterialesSal_igv / adMaterialesPE_igv) * 100)).toFixed(2);
    const porValorizarT = ((porValorizar_igv / totalMontoContrato) * 100).toFixed(2);
    const saldoPorPagarT = ((saldoPorPagar_igv / totalMontoContrato) * 100).toFixed(2);

    adDirectoAMT = isNaN(parseFloat(adDirectoAMT)) ? '0' : adDirectoAMT;
    adMaterialesAMT = isNaN(parseFloat(adMaterialesAMT)) ? '0' : adMaterialesAMT;
    adDirectoSalT = isNaN(parseFloat(adDirectoSalT)) ? '0' : adDirectoSalT;
    adMaterialesSalT = isNaN(parseFloat(adMaterialesSalT)) ? '0' : adMaterialesSalT;
    //
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'Costo Directo', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("C" + row + ":D" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, adDirectoPE, 10, false);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, adMaterialesPE, 10, false);
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, valoriz, 10, false);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalPE, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, adDirectoAM, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, adMaterialesAM, 10, false);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adDirectoSal.toFixed(2), 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, adMaterialesSal.toFixed(2), 10, false);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, porValorizar, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, saldoPorPagar, 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }

    //
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'Con IGV', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("C" + row + ":D" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, adDirectoPE_igv, 10, false);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, adMaterialesPE_igv, 10, false);
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, valoriz_igv, 10, false);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalPE_igv, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, adDirectoAM_igv, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, adMaterilesAM_igv, 10, false);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adDirectoSal_igv.toFixed(2), 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, adMaterialesSal_igv.toFixed(2), 10, false);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, porValorizar_igv, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, saldoPorPagar_igv, 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    //
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("C" + row + ":D" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, adDirectoPET + '%', 10, true);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, adMaterialesPET + '%', 10, true);
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, valorizPET + '%', 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalPET + '%', 10, true);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, adDirectoAMT + '%', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, adMaterialesAMT + '%', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adDirectoSalT + '%', 10, true);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, adMaterialesSalT + '%', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, porValorizarT + '%', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, saldoPorPagarT + '%', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -------------------------------------------------------------------------------------
    // GARANTÍAS 
    // -------------------------------------------------------------------------------------

    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "GARANTÍAS", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 119
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'DESCRIPCIÓN', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('E' + row + ':H' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'ENTIDAD FINANCIERA', 10, true);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'EMISIÓN', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'VENCIMIENTO', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, 'MONTO', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'ESTADO', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'OBSERVACIONES', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // FIEL CUMPLIMIENTO
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  FIEL CUMPLIMIENTO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('E' + row + ':H' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' ', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, ' ', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, ' ', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    for (let i = 0; i < countArrFielCum; i++) {
      let Arr = arrGarantiasFC[i];
      row += 1;
      worksheet.mergeCells('B' + row + ':D' + row);
      this.setdatogeneral(worksheet, 'B' + row, '  ' + 'Carta Fianza N° ' + Arr.nro_carta, 10, false);
      worksheet.getCell("B" + row).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.mergeCells('E' + row + ':H' + row);
      this.setdatogeneral(worksheet, 'E' + row, '          ' + Arr.entidad_financiera, 10, false);
      worksheet.getCell("H" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'I' + row, Arr.fecha_emision, 10, false);
      worksheet.getCell("I" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.mergeCells('J' + row + ':K' + row);
      worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'J' + row, Arr.fecha_vencimiento, 10, false);
      worksheet.getCell("J" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'L' + row, Arr.monto, 10, false);
      worksheet.getCell("L" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'M' + row, Arr.estado, 10, false);
      worksheet.getCell("M" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
      worksheet.getCell("N" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
    }

    // ADELANTO DIRECTO
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  ADELANTO DIRECTO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('E' + row + ':H' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' ', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, ' ', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, ' ', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    for (let i = 0; i < countAdelantoD; i++) {
      let Arr = arrGarantiasAdelantoD[i];
      row += 1;
      worksheet.mergeCells('B' + row + ':D' + row);
      this.setdatogeneral(worksheet, 'B' + row, '  ' + 'Carta Fianza N° ' + Arr.nro_carta, 10, false);
      worksheet.getCell("B" + row).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.mergeCells('E' + row + ':H' + row);
      this.setdatogeneral(worksheet, 'E' + row, '          ' + Arr.entidad_financiera, 10, false);
      worksheet.getCell("H" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'I' + row, Arr.fecha_emision, 10, false);
      worksheet.getCell("I" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.mergeCells('J' + row + ':K' + row);
      worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'J' + row, Arr.fecha_vencimiento, 10, false);
      worksheet.getCell("J" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'L' + row, Arr.monto, 10, false);
      worksheet.getCell("L" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'M' + row, Arr.estado, 10, false);
      worksheet.getCell("M" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
      worksheet.getCell("N" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
    }

    // ADELANTO MATERIALES

    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  ADELANTO DE MATERIALES N° 01', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('E' + row + ':H' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' ', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, ' ', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, ' ', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    for (let i = 0; i < countAdelantoM; i++) {
      let Arr = arrGarantiasAdelantoM[i];
      row += 1;
      if (i !== (countAdelantoM - 1)) {
        worksheet.mergeCells('B' + row + ':D' + row);
        this.setdatogeneral(worksheet, 'B' + row, '  ' + 'Carta Fianza N° ' + Arr.nro_carta, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells('E' + row + ':H' + row);
        this.setdatogeneral(worksheet, 'E' + row, '          ' + Arr.entidad_financiera, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.fecha_emision, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells('J' + row + ':K' + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.fecha_vencimiento, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, Arr.monto, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.estado, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
      } else {
        worksheet.mergeCells('B' + row + ':D' + row);
        this.setdatogeneral(worksheet, 'B' + row, '  ' + 'Carta Fianza N° ' + Arr.nro_carta, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells('E' + row + ':H' + row);
        this.setdatogeneral(worksheet, 'E' + row, '          ' + Arr.entidad_financiera, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.fecha_emision, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells('J' + row + ':K' + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.fecha_vencimiento, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, Arr.monto, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.estado, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    }

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Ficha_Control_Obra.xlsx');
    });
  }

  async generaralldataproyecto2(proyectos, datosadicionales) {

    let title = 'Datos Generales del Proyecto';

    //

    const workbook = new Workbook();
    const wsgeneral = workbook.addWorksheet('General');

    wsgeneral.getColumn(1).width = 5;
    wsgeneral.getColumn(2).width = 50;
    wsgeneral.getColumn(3).width = 15;
    wsgeneral.getColumn(4).width = 15;
    wsgeneral.getColumn(5).width = 15;
    wsgeneral.getColumn(6).width = 15;
    wsgeneral.getColumn(7).width = 50;
    wsgeneral.getColumn(8).width = 30;
    wsgeneral.getColumn(9).width = 30;
    wsgeneral.getColumn(10).width = 15;
    wsgeneral.getColumn(11).width = 15;

    // 1
    let row = 1;
    wsgeneral.mergeCells('B1:L1');
    wsgeneral.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "B" + row, title, 14, true);
    wsgeneral.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.setdatogeneral(wsgeneral, "B" + row, "Nombre de Proyecto", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "C" + row, "Fase Actual", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "D" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "E" + row, "MEM", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "F" + row, "SNIP", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "G" + row, "Objetivo", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "H" + row, "Situación Actual", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "I" + row, "Comentario", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "J" + row, "Latitud", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "K" + row, "Longitud", 10, true, '91cff2');

    for (let i = 2; i <= 11; i++) {
      wsgeneral.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsgeneral.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    proyectos.forEach(proyecto => {
      row++;
      this.dato_tabla(wsgeneral, "B", row, proyecto.c_nombreproyecto);
      this.dato_tabla(wsgeneral, "C", row, proyecto.c_fase);
      this.dato_tabla(wsgeneral, "D", row, proyecto.c_codigocui);
      this.dato_tabla(wsgeneral, "E", row, proyecto.c_codigomem);
      this.dato_tabla(wsgeneral, "F", row, proyecto.c_codigosnip);
      this.dato_tabla(wsgeneral, "G", row, proyecto.c_objetivoproyecto);
      this.dato_tabla(wsgeneral, "H", row, proyecto.c_situacionactual);
      this.dato_tabla(wsgeneral, "I", row, proyecto.c_comentario);
      this.dato_tabla(wsgeneral, "J", row, proyecto.c_latitud);
      this.dato_tabla(wsgeneral, "K", row, proyecto.c_longitud);

      for (let i = 2; i <= 11; i++) {
        wsgeneral.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    title = 'ESTUDIO DE PREINVERSION';
    const wsestudipreinvesion = workbook.addWorksheet('ESTUDIO DE PREINVERSION');
    row = 1;
    wsestudipreinvesion.mergeCells('B1:L1');
    wsestudipreinvesion.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsestudipreinvesion, "B" + row, title, 14, true);
    wsestudipreinvesion.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;
    row++;
    row++;
    row++;

    wsestudipreinvesion.getColumn(1).width = 5;
    wsestudipreinvesion.getColumn(2).width = 15;
    wsestudipreinvesion.getColumn(3).width = 75;

    for (let i = 1; i <= 3; i++) {
      wsestudipreinvesion.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    for (let i = 4; i <= 123; i++) {
      wsestudipreinvesion.getColumn(i).width = 30;
      wsestudipreinvesion.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }

      wsestudipreinvesion.getRow(row).height = 45;
      wsestudipreinvesion.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };
    }

    this.setdatogeneral(wsestudipreinvesion, "A" + row, "N°", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "B" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "C" + row, "NOMBRE DEL PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "D" + row, "Departamento(s)", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "E" + row, "Provincia(s)", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "F" + row, "Distrito(s)", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "G" + row, "N° Localidades Beneficiadas", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "H" + row, "Poblacion Beneficiada", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "I" + row, "Abonados Totales (N° Conexiones)", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "J" + row, "ENTIDAD CONTRATANTE", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "K" + row, "JEFATURA", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "L" + row, "COORDINADOR", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "M" + row, "GESTOR", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "N" + row, "FASE", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "O" + row, "SITUACION ACTUAL", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "P" + row, "GERENTE INGENIERIA", 10, true, '91cff2');
    this.setdatogeneral(wsestudipreinvesion, "Q" + row, "JEFE DE INGENIERIA", 10, true, '91cff2');

    /*
    this.cabecera_tabla(wsestudipreinvesion, "R", row, "Registro de idea");
    this.cabecera_tabla(wsestudipreinvesion, "S", row, "t1_a1");
    this.cabecera_tabla(wsestudipreinvesion, "T", row, "t2");
    this.cabecera_tabla(wsestudipreinvesion, "U", row, "t3");
    this.cabecera_tabla(wsestudipreinvesion, "V", row, "t4");
    this.cabecera_tabla(wsestudipreinvesion, "W", row, "t4_a2");
    this.cabecera_tabla(wsestudipreinvesion, "X", row, "t5");
    this.cabecera_tabla(wsestudipreinvesion, "Y", row, "t6");
    this.cabecera_tabla(wsestudipreinvesion, "Z", row, "t6_a3");
    this.cabecera_tabla(wsestudipreinvesion, "AA", row, "t7");
    this.cabecera_tabla(wsestudipreinvesion, "AB", row, "t7_a4");
    this.cabecera_tabla(wsestudipreinvesion, "AC", row, "t8");
    this.cabecera_tabla(wsestudipreinvesion, "AD", row, "t9");
    this.cabecera_tabla(wsestudipreinvesion, "AE", row, "t10");
    this.cabecera_tabla(wsestudipreinvesion, "AF", row, "t10_a5");
    this.cabecera_tabla(wsestudipreinvesion, "AG", row, "t10_a6");
    this.cabecera_tabla(wsestudipreinvesion, "AH", row, "t10_a7");
    this.cabecera_tabla(wsestudipreinvesion, "AI", row, "t11");
    this.cabecera_tabla(wsestudipreinvesion, "AJ", row, "t12");
    this.cabecera_tabla(wsestudipreinvesion, "AK", row, "t13");
    this.cabecera_tabla(wsestudipreinvesion, "AL", row, "t14");
    this.cabecera_tabla(wsestudipreinvesion, "AM", row, "t15");
    this.cabecera_tabla(wsestudipreinvesion, "AN", row, "t16");
    this.cabecera_tabla(wsestudipreinvesion, "AO", row, "t17");
    this.cabecera_tabla(wsestudipreinvesion, "AP", row, "t18");
    this.cabecera_tabla(wsestudipreinvesion, "AQ", row, "t19");
    this.cabecera_tabla(wsestudipreinvesion, "AR", row, "t19_a8");
    this.cabecera_tabla(wsestudipreinvesion, "AS", row, "t19_a9");
    this.cabecera_tabla(wsestudipreinvesion, "AT", row, "t19_a10");
    this.cabecera_tabla(wsestudipreinvesion, "AU", row, "t19_a11");
    this.cabecera_tabla(wsestudipreinvesion, "AV", row, "t19_a12");
    this.cabecera_tabla(wsestudipreinvesion, "AW", row, "t19_a13");
    this.cabecera_tabla(wsestudipreinvesion, "AX", row, "t19_a14");
    this.cabecera_tabla(wsestudipreinvesion, "AY", row, "t20");
    this.cabecera_tabla(wsestudipreinvesion, "AZ", row, "t20_a15");
    this.cabecera_tabla(wsestudipreinvesion, "BA", row, "t20_a16");
    this.cabecera_tabla(wsestudipreinvesion, "BB", row, "t20_a17");
    this.cabecera_tabla(wsestudipreinvesion, "BC", row, "t20_a18");
    this.cabecera_tabla(wsestudipreinvesion, "BD", row, "t20_a19");
    this.cabecera_tabla(wsestudipreinvesion, "BE", row, "t20_a20");
    this.cabecera_tabla(wsestudipreinvesion, "BF", row, "t20_a21");
    this.cabecera_tabla(wsestudipreinvesion, "BG", row, "t21");
    this.cabecera_tabla(wsestudipreinvesion, "BH", row, "t21_a22");
    this.cabecera_tabla(wsestudipreinvesion, "BI", row, "t21_a23");
    this.cabecera_tabla(wsestudipreinvesion, "BJ", row, "t21_a24");
    this.cabecera_tabla(wsestudipreinvesion, "BK", row, "t21_a25");
    this.cabecera_tabla(wsestudipreinvesion, "BL", row, "t21_a26");
    this.cabecera_tabla(wsestudipreinvesion, "BM", row, "t21_a27");
    this.cabecera_tabla(wsestudipreinvesion, "BN", row, "t21_a28");
    this.cabecera_tabla(wsestudipreinvesion, "BO", row, "t21_a29");
    this.cabecera_tabla(wsestudipreinvesion, "BP", row, "t21_a30");
    this.cabecera_tabla(wsestudipreinvesion, "BQ", row, "t21_a31");
    this.cabecera_tabla(wsestudipreinvesion, "BR", row, "t21_a32");
    this.cabecera_tabla(wsestudipreinvesion, "BS", row, "t21_a33");
    this.cabecera_tabla(wsestudipreinvesion, "BT", row, "t21_a34");
    this.cabecera_tabla(wsestudipreinvesion, "BU", row, "t22");
    this.cabecera_tabla(wsestudipreinvesion, "BV", row, "t22_a35");
    this.cabecera_tabla(wsestudipreinvesion, "BW", row, "t22_a36");
    this.cabecera_tabla(wsestudipreinvesion, "BX", row, "t22_a37");
    this.cabecera_tabla(wsestudipreinvesion, "BY", row, "t22_a38");
    this.cabecera_tabla(wsestudipreinvesion, "BZ", row, "t23");
    this.cabecera_tabla(wsestudipreinvesion, "CA", row, "t23_a39");
    this.cabecera_tabla(wsestudipreinvesion, "CB", row, "t23_a40");
    this.cabecera_tabla(wsestudipreinvesion, "CC", row, "t23_a41");
    this.cabecera_tabla(wsestudipreinvesion, "CD", row, "t23_a42");
    this.cabecera_tabla(wsestudipreinvesion, "CE", row, "t23_a43");
    this.cabecera_tabla(wsestudipreinvesion, "CF", row, "t23_a44");
    this.cabecera_tabla(wsestudipreinvesion, "CG", row, "t24");
    this.cabecera_tabla(wsestudipreinvesion, "CH", row, "t24_a45");
    this.cabecera_tabla(wsestudipreinvesion, "CI", row, "t24_a46");
    this.cabecera_tabla(wsestudipreinvesion, "CJ", row, "t24_a47");
    this.cabecera_tabla(wsestudipreinvesion, "CK", row, "t24_a48");
    this.cabecera_tabla(wsestudipreinvesion, "CL", row, "t24_a49");
    this.cabecera_tabla(wsestudipreinvesion, "CM", row, "t24_a50");
    this.cabecera_tabla(wsestudipreinvesion, "CN", row, "t24_a51");
    this.cabecera_tabla(wsestudipreinvesion, "CO", row, "t24_a52");
    this.cabecera_tabla(wsestudipreinvesion, "CP", row, "t24_a53");
    this.cabecera_tabla(wsestudipreinvesion, "CQ", row, "t24_a54");
    this.cabecera_tabla(wsestudipreinvesion, "CR", row, "t25");
    this.cabecera_tabla(wsestudipreinvesion, "CS", row, "t25_a55");
    this.cabecera_tabla(wsestudipreinvesion, "CT", row, "t25_a56");
    this.cabecera_tabla(wsestudipreinvesion, "CU", row, "t25_a57");
    this.cabecera_tabla(wsestudipreinvesion, "CV", row, "t25_a58");
    this.cabecera_tabla(wsestudipreinvesion, "CW", row, "t25_a59");
    this.cabecera_tabla(wsestudipreinvesion, "CX", row, "t25_a60");
    this.cabecera_tabla(wsestudipreinvesion, "CY", row, "t25_a61");
    this.cabecera_tabla(wsestudipreinvesion, "CZ", row, "t25_a62");
    this.cabecera_tabla(wsestudipreinvesion, "DA", row, "t25_a63");
    this.cabecera_tabla(wsestudipreinvesion, "DB", row, "t25_a64");
    this.cabecera_tabla(wsestudipreinvesion, "DC", row, "t25_a65");
    this.cabecera_tabla(wsestudipreinvesion, "DD", row, "t25_a66");
    this.cabecera_tabla(wsestudipreinvesion, "DE", row, "t26");
    this.cabecera_tabla(wsestudipreinvesion, "DF", row, "t26_a67");
    this.cabecera_tabla(wsestudipreinvesion, "DG", row, "t26_a68");
    this.cabecera_tabla(wsestudipreinvesion, "DH", row, "t26_a69");
    this.cabecera_tabla(wsestudipreinvesion, "DI", row, "t26_a70");
    this.cabecera_tabla(wsestudipreinvesion, "DJ", row, "t26_a71");
    this.cabecera_tabla(wsestudipreinvesion, "DK", row, "t26_a72");
    this.cabecera_tabla(wsestudipreinvesion, "DL", row, "t27");
    this.cabecera_tabla(wsestudipreinvesion, "DM", row, "t27_a73");
    this.cabecera_tabla(wsestudipreinvesion, "DN", row, "t27_a74");
    this.cabecera_tabla(wsestudipreinvesion, "DO", row, "t27_a75");
    this.cabecera_tabla(wsestudipreinvesion, "DP", row, "t27_a76");
    this.cabecera_tabla(wsestudipreinvesion, "DQ", row, "t27_a77");
    this.cabecera_tabla(wsestudipreinvesion, "DR", row, "t27_a78");
    this.cabecera_tabla(wsestudipreinvesion, "DS", row, "t28");
    this.cabecera_tabla(wsestudipreinvesion, "DT", row, "t29");
    this.cabecera_tabla(wsestudipreinvesion, "DU", row, "t29_a79");
    this.cabecera_tabla(wsestudipreinvesion, "DV", row, "t30");
    this.cabecera_tabla(wsestudipreinvesion, "DW", row, "t30_a80");
    this.cabecera_tabla(wsestudipreinvesion, "DX", row, "t30_a81");
    this.cabecera_tabla(wsestudipreinvesion, "DY", row, "t30_a82");
    this.cabecera_tabla(wsestudipreinvesion, "DZ", row, "t30_a83");
    this.cabecera_tabla(wsestudipreinvesion, "EA", row, "t31");
    this.cabecera_tabla(wsestudipreinvesion, "EB", row, "t31_a84");
    this.cabecera_tabla(wsestudipreinvesion, "EC", row, "t31_a85");
    this.cabecera_tabla(wsestudipreinvesion, "ED", row, "t31_a86");
    this.cabecera_tabla(wsestudipreinvesion, "EE", row, "t32");
    this.cabecera_tabla(wsestudipreinvesion, "EF", row, "t32_a87");
    this.cabecera_tabla(wsestudipreinvesion, "EG", row, "t32_a88");*/

    this.setdatogeneral(wsestudipreinvesion, "R" + row, "Registro de idea", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "S" + row, "Anexo 1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "T" + row, "Elaboración de TdR (con Codigo Idea)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "U" + row, "EPOM", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "V" + row, "Inclusión PAC", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "W" + row, "Anexo 2", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "X" + row, "Certificación presupuestal", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "Y" + row, "Aprobación de expediente contratación ", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "Z" + row, "Anexo 3", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AA" + row, "Designación comité selección", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AB" + row, "Anexo 4", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AC" + row, "Elaboracion de Bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AD" + row, "Aprobación de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AE" + row, "Convocatoria", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AF" + row, "N° Concurso Público", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AG" + row, "Valor Referencial incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AH" + row, "Anexo 5", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AI" + row, "Registro de Participantes", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AJ" + row, "Formulación de consultas y observaciones", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AK" + row, "Absolución de consultas y observaciones e integración de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AL" + row, "Presentación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AM" + row, "Calificación y evaluación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AN" + row, "Otorgamiento de Buena pro", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AO" + row, "Consentimiento de la Buena Pro", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AP" + row, "Requisitos para el perfeccionamiento del Contrato", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AQ" + row, "Contrato de Consultoria", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AR" + row, "N° Contrato", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AS" + row, "Contratista", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AT" + row, "Representante Legal", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AU" + row, "Dirección", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AV" + row, "Monto de Contrato, incluye IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AW" + row, "Plazo del servicio de Consultoria", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AX" + row, "Anexo 6", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "AY" + row, "Inicio del plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "AZ" + row, "Otorgamiento del adelanto directo (desembolso)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "BA" + row, "N° Documento que solicita ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BB" + row, "Fecha de solicitud", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BC" + row, "Documento que aprueba ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BD" + row, "Documento desembolso", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BE" + row, "Monto total de Adelanto otorgado Inc. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BF" + row, "Anexo 6A", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BG" + row, "Entrega del Informes", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "BH" + row, "N° de Informe", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BI" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BJ" + row, "Informe de viabilidad", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BK" + row, "Anexo 8.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BL" + row, "Aprobación del informes", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "BM" + row, "Documento que aprueba", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BN" + row, "Informe de viabilidad", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BO" + row, "Anexo 9.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BP" + row, "N° Valorizacion Mensual", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BQ" + row, "Fecha presentación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BR" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BS" + row, "Valorización Mensual Contractual", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "BT" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BU" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BV" + row, "Monto Valorizado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BW" + row, "Amortizacion del AD ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BX" + row, "Deducciones", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BY" + row, "Valorizcion Neta (A-B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "BZ" + row, "IGV (18%)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CA" + row, "Total Facturar", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CB" + row, "Valorizado Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CC" + row, "Anexo 10.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CD" + row, "Valorización Prestacion Adicional", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "CE" + row, "Numero Valorizacion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CF" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CG" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CH" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CI" + row, "Monto Valorizado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CJ" + row, "Amortizacion del AD ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CK" + row, "Deducciones", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CL" + row, "Valorizcion Neta (A-B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CM" + row, "IGV (18%)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CN" + row, "Total Facturar", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CO" + row, "Valorizado Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CP" + row, "Anexo 10B", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CQ" + row, "Aprobación Prestación Adicional", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "CR" + row, "Fecha que solicita", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CS" + row, "Documento que solicta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CT" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CU" + row, "Monto aprobado Incl IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CV" + row, "Nuevo monto de Contrato, Incl IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CW" + row, "Anexo 10A", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CX" + row, "Aprobación Ampliación de Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "CY" + row, "N° Solicitud", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "CZ" + row, "Fecha que solicita", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DA" + row, "Documento que solicta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DB" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DC" + row, "Plazo otorgado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DD" + row, "Anexo 11", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DE" + row, "Fin de plazo Contractual", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "DF" + row, "Nuevo fin, con plazo Ampliado", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "DG" + row, "Retraso o adelanto (días)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DH" + row, "Acta de Conformidad", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "DI" + row, "Documento que aprueba", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DJ" + row, "Anexo 14", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DK" + row, "Fecha de entrega", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DL" + row, "Documento que solicita", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DM" + row, "Aprobación Liquidación al Consultor", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "DN" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DO" + row, "Monto por pagar, incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DP" + row, "Anexo 15", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DQ" + row, "Registro Declaratoria Viabilidad", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudipreinvesion, "DR" + row, "Documentos Banco Proyectos (Formato 7-A, 7-B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudipreinvesion, "DS" + row, "Anexo 16", 10, true, 'f7f0b3');

    const fase1 = datosadicionales.filter(o => o.n_idgen_fase == 1);

    fase1.forEach(da => {
      row++;

      this.dato_tabla(wsestudipreinvesion, "A", row, da.c_codigomem);
      this.dato_tabla(wsestudipreinvesion, "B", row, da.c_codigocui);
      this.dato_tabla(wsestudipreinvesion, "C", row, da.c_nombreproyecto);
      this.dato_tabla(wsestudipreinvesion, "D", row, da.c_departamentos);
      this.dato_tabla(wsestudipreinvesion, "E", row, da.c_provincias);
      this.dato_tabla(wsestudipreinvesion, "F", row, da.c_distritos);
      this.dato_tabla(wsestudipreinvesion, "G", row, da.n_localidadesbeneficiadas);
      this.dato_tabla(wsestudipreinvesion, "H", row, da.n_poblacionbeneficiadas);
      this.dato_tabla(wsestudipreinvesion, "I", row, da.n_abonadostotales);
      this.dato_tabla(wsestudipreinvesion, "J", row, da.c_entidadcontratante);
      this.dato_tabla(wsestudipreinvesion, "K", row, da.c_jefatura);
      this.dato_tabla(wsestudipreinvesion, "L", row, da.c_jefearea);
      this.dato_tabla(wsestudipreinvesion, "M", row, da.c_cordinador);
      this.dato_tabla(wsestudipreinvesion, "N", row, da.c_faseproyecto);
      this.dato_tabla(wsestudipreinvesion, "O", row, da.c_situacionactual);
      this.dato_tabla(wsestudipreinvesion, "P", row, da.c_gerenteingenieria);
      this.dato_tabla(wsestudipreinvesion, "Q", row, da.c_jefeingenieria);

      this.dato_tabla(wsestudipreinvesion, "R", row, da.t1);
      this.dato_tabla(wsestudipreinvesion, "S", row, da.t1_a1);
      this.dato_tabla(wsestudipreinvesion, "T", row, da.t2);
      this.dato_tabla(wsestudipreinvesion, "U", row, da.t3);
      this.dato_tabla(wsestudipreinvesion, "V", row, da.t4);
      this.dato_tabla(wsestudipreinvesion, "W", row, da.t4_a2);
      this.dato_tabla(wsestudipreinvesion, "X", row, da.t5);
      this.dato_tabla(wsestudipreinvesion, "Y", row, da.t6);
      this.dato_tabla(wsestudipreinvesion, "Z", row, da.t6_a3);
      this.dato_tabla(wsestudipreinvesion, "AA", row, da.t7);
      this.dato_tabla(wsestudipreinvesion, "AB", row, da.t7_a4);
      this.dato_tabla(wsestudipreinvesion, "AC", row, da.t8);
      this.dato_tabla(wsestudipreinvesion, "AD", row, da.t9);
      this.dato_tabla(wsestudipreinvesion, "AE", row, da.t10);
      this.dato_tabla(wsestudipreinvesion, "AF", row, da.t10_a5);
      this.dato_tabla(wsestudipreinvesion, "AG", row, da.t10_a6);
      this.dato_tabla(wsestudipreinvesion, "AH", row, da.t10_a7);
      this.dato_tabla(wsestudipreinvesion, "AI", row, da.t11);
      this.dato_tabla(wsestudipreinvesion, "AJ", row, da.t12);
      this.dato_tabla(wsestudipreinvesion, "AK", row, da.t13);
      this.dato_tabla(wsestudipreinvesion, "AL", row, da.t14);
      this.dato_tabla(wsestudipreinvesion, "AM", row, da.t15);
      this.dato_tabla(wsestudipreinvesion, "AN", row, da.t16);
      this.dato_tabla(wsestudipreinvesion, "AO", row, da.t17);
      this.dato_tabla(wsestudipreinvesion, "AP", row, da.t18);
      this.dato_tabla(wsestudipreinvesion, "AQ", row, da.t19);
      this.dato_tabla(wsestudipreinvesion, "AR", row, da.t19_a8);
      this.dato_tabla(wsestudipreinvesion, "AS", row, da.t19_a9);
      this.dato_tabla(wsestudipreinvesion, "AT", row, da.t19_a10);
      this.dato_tabla(wsestudipreinvesion, "AU", row, da.t19_a11);
      this.dato_tabla(wsestudipreinvesion, "AV", row, da.t19_a12);
      this.dato_tabla(wsestudipreinvesion, "AW", row, da.t19_a13);
      this.dato_tabla(wsestudipreinvesion, "AX", row, da.t19_a14);
      this.dato_tabla(wsestudipreinvesion, "AY", row, da.t20);
      this.dato_tabla(wsestudipreinvesion, "AZ", row, da.t21);
      this.dato_tabla(wsestudipreinvesion, "BA", row, da.t21_a22);
      this.dato_tabla(wsestudipreinvesion, "BB", row, da.t21_a23);
      this.dato_tabla(wsestudipreinvesion, "BC", row, da.t21_a24);
      this.dato_tabla(wsestudipreinvesion, "BD", row, da.t21_a25);
      this.dato_tabla(wsestudipreinvesion, "BE", row, da.t21_a26);
      this.dato_tabla(wsestudipreinvesion, "BF", row, da.t21_a27);
      this.dato_tabla(wsestudipreinvesion, "BG", row, da.t22);
      this.dato_tabla(wsestudipreinvesion, "BH", row, da.t22_a35);
      this.dato_tabla(wsestudipreinvesion, "BI", row, da.t22_a36);
      this.dato_tabla(wsestudipreinvesion, "BJ", row, da.t22_a37);
      this.dato_tabla(wsestudipreinvesion, "BK", row, da.t22_a38);
      this.dato_tabla(wsestudipreinvesion, "BL", row, da.t23);
      this.dato_tabla(wsestudipreinvesion, "BM", row, da.t23_a39);
      this.dato_tabla(wsestudipreinvesion, "BN", row, da.t23_a40);
      this.dato_tabla(wsestudipreinvesion, "BO", row, da.t23_a41);
      this.dato_tabla(wsestudipreinvesion, "BP", row, da.t23_a42);
      this.dato_tabla(wsestudipreinvesion, "BQ", row, da.t23_a43);
      this.dato_tabla(wsestudipreinvesion, "BR", row, da.t23_a44);
      this.dato_tabla(wsestudipreinvesion, "BS", row, da.t24);
      this.dato_tabla(wsestudipreinvesion, "BT", row, da.t24_a45);
      this.dato_tabla(wsestudipreinvesion, "BU", row, da.t24_a46);
      this.dato_tabla(wsestudipreinvesion, "BV", row, da.t24_a47);
      this.dato_tabla(wsestudipreinvesion, "BW", row, da.t24_a48);
      this.dato_tabla(wsestudipreinvesion, "BX", row, da.t24_a49);
      this.dato_tabla(wsestudipreinvesion, "BY", row, da.t24_a50);
      this.dato_tabla(wsestudipreinvesion, "BZ", row, da.t24_a51);
      this.dato_tabla(wsestudipreinvesion, "CA", row, da.t24_a52);
      this.dato_tabla(wsestudipreinvesion, "CB", row, da.t24_a53);
      this.dato_tabla(wsestudipreinvesion, "CC", row, da.t24_a54);
      this.dato_tabla(wsestudipreinvesion, "CD", row, da.t25);
      this.dato_tabla(wsestudipreinvesion, "CE", row, da.t25_a55);
      this.dato_tabla(wsestudipreinvesion, "CF", row, da.t25_a56);
      this.dato_tabla(wsestudipreinvesion, "CG", row, da.t25_a57);
      this.dato_tabla(wsestudipreinvesion, "CH", row, da.t25_a58);
      this.dato_tabla(wsestudipreinvesion, "CI", row, da.t25_a59);
      this.dato_tabla(wsestudipreinvesion, "CJ", row, da.t25_a60);
      this.dato_tabla(wsestudipreinvesion, "CK", row, da.t25_a61);
      this.dato_tabla(wsestudipreinvesion, "CL", row, da.t25_a62);
      this.dato_tabla(wsestudipreinvesion, "CM", row, da.t25_a63);
      this.dato_tabla(wsestudipreinvesion, "CN", row, da.t25_a64);
      this.dato_tabla(wsestudipreinvesion, "CO", row, da.t25_a65);
      this.dato_tabla(wsestudipreinvesion, "CP", row, da.t25_a66);
      this.dato_tabla(wsestudipreinvesion, "CQ", row, da.t26);
      this.dato_tabla(wsestudipreinvesion, "CR", row, da.t26_a67);
      this.dato_tabla(wsestudipreinvesion, "CS", row, da.t26_a68);
      this.dato_tabla(wsestudipreinvesion, "CT", row, da.t26_a69);
      this.dato_tabla(wsestudipreinvesion, "CU", row, da.t26_a70);
      this.dato_tabla(wsestudipreinvesion, "CV", row, da.t26_a71);
      this.dato_tabla(wsestudipreinvesion, "CW", row, da.t26_a72);
      this.dato_tabla(wsestudipreinvesion, "CX", row, da.t27);
      this.dato_tabla(wsestudipreinvesion, "CY", row, da.t27_a73);
      this.dato_tabla(wsestudipreinvesion, "CZ", row, da.t27_a74);
      this.dato_tabla(wsestudipreinvesion, "DA", row, da.t27_a75);
      this.dato_tabla(wsestudipreinvesion, "DB", row, da.t27_a76);
      this.dato_tabla(wsestudipreinvesion, "DC", row, da.t27_a77);
      this.dato_tabla(wsestudipreinvesion, "DD", row, da.t27_a78);
      this.dato_tabla(wsestudipreinvesion, "DE", row, da.t28);
      this.dato_tabla(wsestudipreinvesion, "DF", row, da.t29);
      this.dato_tabla(wsestudipreinvesion, "DG", row, da.t29_a79);
      this.dato_tabla(wsestudipreinvesion, "DH", row, da.t30);
      this.dato_tabla(wsestudipreinvesion, "DI", row, da.t30_a80);
      this.dato_tabla(wsestudipreinvesion, "DJ", row, da.t30_a81);
      this.dato_tabla(wsestudipreinvesion, "DK", row, da.t30_a82);
      this.dato_tabla(wsestudipreinvesion, "DL", row, da.t30_a83);
      this.dato_tabla(wsestudipreinvesion, "DM", row, da.t31);
      this.dato_tabla(wsestudipreinvesion, "DN", row, da.t31_a84);
      this.dato_tabla(wsestudipreinvesion, "DO", row, da.t31_a85);
      this.dato_tabla(wsestudipreinvesion, "DP", row, da.t31_a86);
      this.dato_tabla(wsestudipreinvesion, "DQ", row, da.t32);
      this.dato_tabla(wsestudipreinvesion, "DR", row, da.t32_a87);
      this.dato_tabla(wsestudipreinvesion, "DS", row, da.t32_a88);

      for (let i = 1; i <= 123; i++) {
        wsestudipreinvesion.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }

    });

    title = 'ESTUDIO DEFINITIVO';
    const wsestudio = workbook.addWorksheet('ESTUDIO DEFINITIVO');
    row = 1;
    wsestudio.mergeCells('B1:L1');
    wsestudio.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsestudio, "B" + row, title, 14, true);
    wsestudio.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;
    row++;
    row++;
    row++;

    wsestudio.getColumn(1).width = 5;
    wsestudio.getColumn(2).width = 15;
    wsestudio.getColumn(3).width = 75;

    for (let i = 1; i <= 3; i++) {
      wsestudio.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    for (let i = 4; i <= 155; i++) {
      wsestudio.getColumn(i).width = 30;
      wsestudio.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }

      wsestudio.getRow(row).height = 45;
      wsestudio.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };
    }

    this.setdatogeneral(wsestudio, "A" + row, "N°", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "B" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "C" + row, "NOMBRE DEL PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "D" + row, "Departamento(s)", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "E" + row, "Provincia(s)", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "F" + row, "Distrito(s)", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "G" + row, "N° Localidades Beneficiadas", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "H" + row, "Poblacion Beneficiada", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "I" + row, "Abonados Totales (N° Conexiones)", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "J" + row, "ENTIDAD CONTRATANTE", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "K" + row, "JEFATURA", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "L" + row, "COORDINADOR", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "M" + row, "GESTOR", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "N" + row, "FASE", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "O" + row, "SITUACION ACTUAL", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "P" + row, "GERENTE INGENIERIA", 10, true, '91cff2');
    this.setdatogeneral(wsestudio, "Q" + row, "JEFE DE INGENIERIA", 10, true, '91cff2');

    this.setdatogeneral(wsestudio, "R" + row, "INICIO", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "S" + row, "Incorporación de transferencia", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "T" + row, "Arreglos institucionales para la ejecución de la inversión", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "U" + row, "Elaboración de TdR", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "V" + row, "EPOM", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "W" + row, "Incorporación  al PAC", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "X" + row, "Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "Y" + row, "Anexo 17", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "Z" + row, "Certificación presupuestal", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AA" + row, "Aprobación de expediente contratación ", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AB" + row, "Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AC" + row, "Anexo 18", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AD" + row, "Designa comité selección", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AE" + row, "Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AF" + row, "Anexo 19", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AG" + row, "Proyecto de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AH" + row, "Aprobación de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AI" + row, "Convocatoria Concurso", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AJ" + row, "N° Concurso Público", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AK" + row, "Valor Referencial incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AL" + row, "Anexo 20", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AM" + row, "Registro de Participantes", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AN" + row, "Formulación de consultas y observaciones", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AO" + row, "Absolución consultas y observaciones e integración de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AP" + row, "Presentación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AQ" + row, "Calificacion y Evaluación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AR" + row, "Otorgamiento de la Buena pro", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AS" + row, "Consentimiento de la Buena Pro (Publicación de buena pro consentida)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AT" + row, "Requisitos para el perfeccionamiento del Contrato", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AU" + row, "Suscripción del Contrato Consultoría", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "AV" + row, "Nro Contrato", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AW" + row, "Contratista", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AX" + row, "Representante Legal", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AY" + row, "Dirección", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "AZ" + row, "Monto de Contrato, incluye IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BA" + row, "Plazo de prestacion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BB" + row, "Anexo 21", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BC" + row, "Otorgamiento del adelanto directo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "BD" + row, "Nro Documento que solicita", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BE" + row, "Fecha de solicitud", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BF" + row, "Documento que aprueba", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BG" + row, "Documento desembolso", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BH" + row, "Monto total de Adelanto otorgado Inc. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BI" + row, "Anexo 21A", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BJ" + row, "Compromiso de recursos", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "BK" + row, "Inicio Elaboración ET (Inicio de contrato)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "BL" + row, "Fecha Aprobación Prestación Adicional", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "BM" + row, "Solicitud Prestación Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BN" + row, "Documento que solicta P.A.", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BO" + row, "Documento aprueba PA (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BP" + row, "Monto aprobado Incl IGV (S/) PA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BQ" + row, "Nuevo monto de Contrato, Incl IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BR" + row, "Anexo 22A", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BS" + row, "Fecha Aprobación Ampliación Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "BT" + row, "Nro Ampliacion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BU" + row, "Solicitud Ampliación de Plazo", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BV" + row, "Documento que solicta AP", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BW" + row, "Documento que aprueba (DGER) AP", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BX" + row, "Plazo otorgado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BY" + row, "Nueva fecha de termino", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "BZ" + row, "Causal", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CA" + row, "Anexo 26.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CB" + row, "Fecha Entraga Informes", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "CC" + row, "N° de Informe", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CD" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CE" + row, "Anexo 23.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CF" + row, "Aprobación Informes", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "CG" + row, "Documento Aprobación Informe", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CH" + row, "Anexo 24.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CI" + row, "Fecha aprobacion Valorizacion Contractual", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "CJ" + row, "Nro Valorizacion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CK" + row, "Fecha Presentación Valirización Contractual", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CL" + row, "Documento que presenta VC", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CM" + row, "Documento Aprobación VC", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CN" + row, "Mes-Año VC", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CO" + row, "Monto Valorizado (S/) VC", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CP" + row, "Amortizacion del AD (B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CQ" + row, "Valorizcion Neta (A-B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CR" + row, "IGV (18%)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CS" + row, "Total Facturar", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CT" + row, "Monto Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CU" + row, "Anexo 25.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CV" + row, "Fecha aprobacion Valorización Prestación Adicional", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "CW" + row, "Fecha Presentacion VPA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CX" + row, "Documento que presenta VPA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CY" + row, "Documento que aprueba (DGER) VPA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "CZ" + row, "Mes-Año VPA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DA" + row, "Monto Valorizado (S/) VPA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DB" + row, "Amortizacion del AD (B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DC" + row, "Valorizcion Neta (A-B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DD" + row, "IGV (18%)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DE" + row, "Total Facturar VPA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DF" + row, "Monto Acumulado (S/) VPA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DG" + row, "Anexo 26.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DH" + row, "Nuevo fin con plazo ampliado", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "DI" + row, "Fin según Contrato", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DJ" + row, "Adelanto o atraso (Días)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DK" + row, "Otorgamiento CIRA", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "DL" + row, "Vigencia CIRA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DM" + row, "Nro Resolución Directoral CIRA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DN" + row, "Anexo 29", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DO" + row, "Otorgamiento DIA", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "DP" + row, "Vigencia DIA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DQ" + row, "Nro Resolución Directoral DIA", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DR" + row, "Anexo 30", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DS" + row, "Factibilidad de suministro y fijación punto de diseño", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "DT" + row, "Empresa Concesionaria", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DU" + row, "Documento ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DV" + row, "Documento revalidación ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DW" + row, "Fecha de revalidación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DX" + row, "Vigencia", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DY" + row, "Anexo 31", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "DZ" + row, "Otorgamiento Calificación SER", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "EA" + row, "Documento SER", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EB" + row, "Anexo 32", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EC" + row, "Análisis de Riesgo del Proyecto", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "ED" + row, "Anexo 33", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EE" + row, "Disponibilidad Fisica del terreno", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "EF" + row, "Documento Disponibilidad Fisica", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EG" + row, "Anexo 34", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EH" + row, "Saneamiento de Gestion de Servidumbre", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "EI" + row, "Documento de Aprobacion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EJ" + row, "Costo de Servidumbre (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EK" + row, "Anexo 35", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EL" + row, "Acta de Conformidad", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "EM" + row, "Archivo Conformidad", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EN" + row, "Anexo 36", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EO" + row, "Fecha de aprobación Liquidación Consultoría", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "EP" + row, "Fecha Solicitud Liquidación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EQ" + row, "Documento solicitud Liquidación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "ER" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "ES" + row, "Monto por pagar, incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "ET" + row, "Anexo 37", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EU" + row, "Registro en Banco de Inversiones (Formato 8-A, 8-B)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsestudio, "EV" + row, "Estado de Viabilidad", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EW" + row, "Nro Informe Tecnico", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EX" + row, "Fecha de Declaratoria de Viabilidad", 10, true, 'f7f0b3');
    this.setdatogeneral(wsestudio, "EY" + row, "Anexo 38", 10, true, 'f7f0b3');

    const fase2 = datosadicionales.filter(o => o.n_idgen_fase == 2);

    fase2.forEach(da => {

      row++;

      this.dato_tabla(wsestudio, "A", row, da.c_codigomem);
      this.dato_tabla(wsestudio, "B", row, da.c_codigocui);
      this.dato_tabla(wsestudio, "C", row, da.c_nombreproyecto);
      this.dato_tabla(wsestudio, "D", row, da.c_departamentos);
      this.dato_tabla(wsestudio, "E", row, da.c_provincias);
      this.dato_tabla(wsestudio, "F", row, da.c_distritos);
      this.dato_tabla(wsestudio, "G", row, da.n_localidadesbeneficiadas);
      this.dato_tabla(wsestudio, "H", row, da.n_poblacionbeneficiadas);
      this.dato_tabla(wsestudio, "I", row, da.n_abonadostotales);
      this.dato_tabla(wsestudio, "J", row, da.c_entidadcontratante);
      this.dato_tabla(wsestudio, "K", row, da.c_jefatura);
      this.dato_tabla(wsestudio, "L", row, da.c_jefearea);
      this.dato_tabla(wsestudio, "M", row, da.c_cordinador);
      this.dato_tabla(wsestudio, "N", row, da.c_faseproyecto);
      this.dato_tabla(wsestudio, "O", row, da.c_situacionactual);
      this.dato_tabla(wsestudio, "P", row, da.c_gerenteingenieria);
      this.dato_tabla(wsestudio, "Q", row, da.c_jefeingenieria);

      this.dato_tabla(wsestudio, "R", row, da.t33);
      this.dato_tabla(wsestudio, "S", row, da.t34);
      this.dato_tabla(wsestudio, "T", row, da.t35);
      this.dato_tabla(wsestudio, "U", row, da.t36);
      this.dato_tabla(wsestudio, "V", row, da.t37);
      this.dato_tabla(wsestudio, "W", row, da.t38);
      this.dato_tabla(wsestudio, "X", row, da.t38_a89);
      this.dato_tabla(wsestudio, "Y", row, da.t38_a90);
      this.dato_tabla(wsestudio, "Z", row, da.t39);
      this.dato_tabla(wsestudio, "AA", row, da.t40);
      this.dato_tabla(wsestudio, "AB", row, da.t40_a91);
      this.dato_tabla(wsestudio, "AC", row, da.t40_a92);
      this.dato_tabla(wsestudio, "AD", row, da.t41);
      this.dato_tabla(wsestudio, "AE", row, da.t41_a93);
      this.dato_tabla(wsestudio, "AF", row, da.t41_a94);
      this.dato_tabla(wsestudio, "AG", row, da.t42);
      this.dato_tabla(wsestudio, "AH", row, da.t43);
      this.dato_tabla(wsestudio, "AI", row, da.t44);
      this.dato_tabla(wsestudio, "AJ", row, da.t44_a95);
      this.dato_tabla(wsestudio, "AK", row, da.t44_a96);
      this.dato_tabla(wsestudio, "AL", row, da.t44_a97);
      this.dato_tabla(wsestudio, "AM", row, da.t45);
      this.dato_tabla(wsestudio, "AN", row, da.t46);
      this.dato_tabla(wsestudio, "AO", row, da.t47);
      this.dato_tabla(wsestudio, "AP", row, da.t48);
      this.dato_tabla(wsestudio, "AQ", row, da.t49);
      this.dato_tabla(wsestudio, "AR", row, da.t50);
      this.dato_tabla(wsestudio, "AS", row, da.t51);
      this.dato_tabla(wsestudio, "AT", row, da.t52);
      this.dato_tabla(wsestudio, "AU", row, da.t53);
      this.dato_tabla(wsestudio, "AV", row, da.t53_a98);
      this.dato_tabla(wsestudio, "AW", row, da.t53_a99);
      this.dato_tabla(wsestudio, "AX", row, da.t53_a100);
      this.dato_tabla(wsestudio, "AY", row, da.t53_a101);
      this.dato_tabla(wsestudio, "AZ", row, da.t53_a102);
      this.dato_tabla(wsestudio, "BA", row, da.t53_a103);
      this.dato_tabla(wsestudio, "BB", row, da.t53_a104);
      this.dato_tabla(wsestudio, "BC", row, da.t54);
      this.dato_tabla(wsestudio, "BD", row, da.t54_a113);
      this.dato_tabla(wsestudio, "BE", row, da.t54_a114);
      this.dato_tabla(wsestudio, "BF", row, da.t54_a115);
      this.dato_tabla(wsestudio, "BG", row, da.t54_a116);
      this.dato_tabla(wsestudio, "BH", row, da.t54_a117);
      this.dato_tabla(wsestudio, "BI", row, da.t54_a118);
      this.dato_tabla(wsestudio, "BJ", row, da.t55);
      this.dato_tabla(wsestudio, "BK", row, da.t56);
      this.dato_tabla(wsestudio, "BL", row, da.t57);
      this.dato_tabla(wsestudio, "BM", row, da.t57_a127);
      this.dato_tabla(wsestudio, "BN", row, da.t57_a128);
      this.dato_tabla(wsestudio, "BO", row, da.t57_a129);
      this.dato_tabla(wsestudio, "BP", row, da.t57_a130);
      this.dato_tabla(wsestudio, "BQ", row, da.t57_a131);
      this.dato_tabla(wsestudio, "BR", row, da.t57_a132);
      this.dato_tabla(wsestudio, "BS", row, da.t58);
      this.dato_tabla(wsestudio, "BT", row, da.t58_a133);
      this.dato_tabla(wsestudio, "BU", row, da.t58_a134);
      this.dato_tabla(wsestudio, "BV", row, da.t58_a135);
      this.dato_tabla(wsestudio, "BW", row, da.t58_a136);
      this.dato_tabla(wsestudio, "BX", row, da.t58_a137);
      this.dato_tabla(wsestudio, "BY", row, da.t58_a138);
      this.dato_tabla(wsestudio, "BZ", row, da.t58_a139);
      this.dato_tabla(wsestudio, "CA", row, da.t58_a140);
      this.dato_tabla(wsestudio, "CB", row, da.t59);
      this.dato_tabla(wsestudio, "CC", row, da.t59_a141);
      this.dato_tabla(wsestudio, "CD", row, da.t59_a142);
      this.dato_tabla(wsestudio, "CE", row, da.t59_a143);
      this.dato_tabla(wsestudio, "CF", row, da.t60);
      this.dato_tabla(wsestudio, "CG", row, da.t60_a144);
      this.dato_tabla(wsestudio, "CH", row, da.t60_a145);
      this.dato_tabla(wsestudio, "CI", row, da.t61);
      this.dato_tabla(wsestudio, "CJ", row, da.t61_a146);
      this.dato_tabla(wsestudio, "CK", row, da.t61_a147);
      this.dato_tabla(wsestudio, "CL", row, da.t61_a148);
      this.dato_tabla(wsestudio, "CM", row, da.t61_a149);
      this.dato_tabla(wsestudio, "CN", row, da.t61_a150);
      this.dato_tabla(wsestudio, "CO", row, da.t61_a151);
      this.dato_tabla(wsestudio, "CP", row, da.t61_a152);
      this.dato_tabla(wsestudio, "CQ", row, da.t61_a153);
      this.dato_tabla(wsestudio, "CR", row, da.t61_a154);
      this.dato_tabla(wsestudio, "CS", row, da.t61_a155);
      this.dato_tabla(wsestudio, "CT", row, da.t61_a156);
      this.dato_tabla(wsestudio, "CU", row, da.t61_a157);
      this.dato_tabla(wsestudio, "CV", row, da.t62);
      this.dato_tabla(wsestudio, "CW", row, da.t62_a158);
      this.dato_tabla(wsestudio, "CX", row, da.t62_a159);
      this.dato_tabla(wsestudio, "CY", row, da.t62_a160);
      this.dato_tabla(wsestudio, "CZ", row, da.t62_a161);
      this.dato_tabla(wsestudio, "DA", row, da.t62_a162);
      this.dato_tabla(wsestudio, "DB", row, da.t62_a163);
      this.dato_tabla(wsestudio, "DC", row, da.t62_a164);
      this.dato_tabla(wsestudio, "DD", row, da.t62_a165);
      this.dato_tabla(wsestudio, "DE", row, da.t62_a166);
      this.dato_tabla(wsestudio, "DF", row, da.t62_a167);
      this.dato_tabla(wsestudio, "DG", row, da.t62_a168);
      this.dato_tabla(wsestudio, "DH", row, da.t63);
      this.dato_tabla(wsestudio, "DI", row, da.t63_a169);
      this.dato_tabla(wsestudio, "DJ", row, da.t63_a170);
      this.dato_tabla(wsestudio, "DK", row, da.t64);
      this.dato_tabla(wsestudio, "DL", row, da.t64_a171);
      this.dato_tabla(wsestudio, "DM", row, da.t64_a559);
      this.dato_tabla(wsestudio, "DN", row, da.t64_a172);
      this.dato_tabla(wsestudio, "DO", row, da.t65);
      this.dato_tabla(wsestudio, "DP", row, da.t65_a173);
      this.dato_tabla(wsestudio, "DQ", row, da.t65_a560);
      this.dato_tabla(wsestudio, "DR", row, da.t65_a174);
      this.dato_tabla(wsestudio, "DS", row, da.t66);
      this.dato_tabla(wsestudio, "DT", row, da.t66_a175);
      this.dato_tabla(wsestudio, "DU", row, da.t66_a176);
      this.dato_tabla(wsestudio, "DV", row, da.t66_a177);
      this.dato_tabla(wsestudio, "DW", row, da.t66_a178);
      this.dato_tabla(wsestudio, "DX", row, da.t66_a552);
      this.dato_tabla(wsestudio, "DY", row, da.t66_a179);
      this.dato_tabla(wsestudio, "DZ", row, da.t67);
      this.dato_tabla(wsestudio, "EA", row, da.t67_a180);
      this.dato_tabla(wsestudio, "EB", row, da.t67_a181);
      this.dato_tabla(wsestudio, "EC", row, da.t68);
      this.dato_tabla(wsestudio, "ED", row, da.t68_a182);
      this.dato_tabla(wsestudio, "EE", row, da.t69);
      this.dato_tabla(wsestudio, "EF", row, da.t69_a183);
      this.dato_tabla(wsestudio, "EG", row, da.t69_a184);
      this.dato_tabla(wsestudio, "EH", row, da.t70);
      this.dato_tabla(wsestudio, "EI", row, da.t70_a185);
      this.dato_tabla(wsestudio, "EJ", row, da.t70_a186);
      this.dato_tabla(wsestudio, "EK", row, da.t70_a187);
      this.dato_tabla(wsestudio, "EL", row, da.t71);
      this.dato_tabla(wsestudio, "EM", row, da.t71_a188);
      this.dato_tabla(wsestudio, "EN", row, da.t71_a189);
      this.dato_tabla(wsestudio, "EO", row, da.t72);
      this.dato_tabla(wsestudio, "EP", row, da.t72_a190);
      this.dato_tabla(wsestudio, "EQ", row, da.t72_a191);
      this.dato_tabla(wsestudio, "ER", row, da.t72_a192);
      this.dato_tabla(wsestudio, "ES", row, da.t72_a193);
      this.dato_tabla(wsestudio, "ET", row, da.t72_a194);
      this.dato_tabla(wsestudio, "EU", row, da.t73);
      this.dato_tabla(wsestudio, "EV", row, da.t73_a195);
      this.dato_tabla(wsestudio, "EW", row, da.t73_a196);
      this.dato_tabla(wsestudio, "EX", row, da.t73_a197);
      this.dato_tabla(wsestudio, "EY", row, da.t73_a198);

      for (let i = 1; i <= 155; i++) {
        wsestudio.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }

    });

    title = 'EJECUCION';
    const wsejecucion = workbook.addWorksheet('EJECUCION');
    row = 1;
    wsejecucion.mergeCells('B1:L1');
    wsejecucion.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsejecucion, "B" + row, title, 14, true);
    wsejecucion.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;
    row++;
    row++;
    row++;

    wsejecucion.getColumn(1).width = 5;
    wsejecucion.getColumn(2).width = 15;
    wsejecucion.getColumn(3).width = 75;

    for (let i = 1; i <= 3; i++) {
      wsejecucion.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    for (let i = 4; i <= 285; i++) {
      wsejecucion.getColumn(i).width = 30;
      wsejecucion.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }

      wsejecucion.getRow(row).height = 45;
      wsejecucion.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };
    }

    this.setdatogeneral(wsejecucion, "A" + row, "N°", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "B" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "C" + row, "NOMBRE DEL PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "D" + row, "Departamento(s)", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "E" + row, "Provincia(s)", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "F" + row, "Distrito(s)", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "G" + row, "N° Localidades Beneficiadas", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "H" + row, "Poblacion Beneficiada", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "I" + row, "Abonados Totales (N° Conexiones)", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "J" + row, "ENTIDAD CONTRATANTE", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "K" + row, "JEFATURA", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "L" + row, "COORDINADOR", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "M" + row, "GESTOR", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "N" + row, "FASE", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "O" + row, "SITUACION ACTUAL", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "P" + row, "GERENTE INGENIERIA", 10, true, '91cff2');
    this.setdatogeneral(wsejecucion, "Q" + row, "JEFE DE INGENIERIA", 10, true, '91cff2');

    this.setdatogeneral(wsejecucion, "R" + row, "INICIO", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "S" + row, "Incorporación de transferencia (de corresponder)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "T" + row, "Requerimiento de contratación", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "U" + row, "Inclusión PAC", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "V" + row, "Anexo 39", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "W" + row, "Certificación presupuestal", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "X" + row, "Aprobación Expediente de Contratación", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "Y" + row, "Anexo 40", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "Z" + row, "Designación Comité de Selección", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AA" + row, "Anexo 41", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AB" + row, "Elaboración de bases (Proyecto de bases)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AC" + row, "Aprobación de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AD" + row, "Convocatoria Conscurso", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AE" + row, "N° Licitacion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AF" + row, "Valor Referencial incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AG" + row, "Anexo 42", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AH" + row, "Registro de Participantes", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AI" + row, "Formulación de consultas y observaciones", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AJ" + row, "Absolución de consultas y obsevaciones e integración de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AK" + row, "Presentación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AL" + row, "Evaluación y calificación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AM" + row, "Otorgamiento de la Buena pro", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AN" + row, "Consentimiento de la Buena Pro", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AO" + row, "Requisitos para el perfeccionamiento del Contrato", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AP" + row, "Requisitos adicionales", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AQ" + row, "Suscripción Contrato Ejecución", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "AR" + row, "Nro Contrato", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AS" + row, "Sistema de Contratación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AT" + row, "Contratista", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AU" + row, "Representante Legal", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AV" + row, "Direccion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AW" + row, "Monto de Contrato, incluye IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AX" + row, "GASTOS GENERALES Y UTILIDADES", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AY" + row, "Plazo de Ejecucion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "AZ" + row, "Tipo de ejecucion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BA" + row, "Anexo 43", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BB" + row, "Transferecia Proyecto - Compromiso de recursos", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BC" + row, "Modo de Financiamiento", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BD" + row, "N° documento que aprueba la transferencia", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BE" + row, "Tipo de Moneda", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BF" + row, "Monto de Transferencia, inc. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BG" + row, "Anexo 45", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BH" + row, "Entrega del Expediente Técnico de Obra completo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BI" + row, "Entrega total o parcial del terreno", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BJ" + row, "Notificacion al Contratista quien es el Inspector o Supervisor", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BK" + row, "Calendario de entrega de los materiales e insumos", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BL" + row, "Anexo 48", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BM" + row, "Otorgamiento del adelanto directo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BN" + row, "Nro Documento Solicitud Adelanto Directo ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BO" + row, "Fecha de solicitud AD", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BP" + row, "Documento que aprueba  AD", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BQ" + row, "Documento desembolso AD", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BR" + row, "Monto total de Adelanto otorgado Inc. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BS" + row, "Amortizacion Acumul. (Inc. IGV)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BT" + row, "Saldo x amortizar", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BU" + row, "Porcentaje (%)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BV" + row, "Anexo 49", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "BW" + row, "Inicio del plazo de ejecución diferida", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BX" + row, "Inicio de Obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BY" + row, "Revisión del expediente técnico de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "BZ" + row, "Proceso de Ejecución Física", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "CA" + row, "Otorgamiento de Adelanto para materiales", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "CB" + row, "Nro Adelanto para Materiles", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CC" + row, "Fecha que solicita AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CD" + row, "Nro Documento que solicita AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CE" + row, "Fecha que aprueba AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CF" + row, "Nro Documento que aprueba  AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CG" + row, "Documento desembolso AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CH" + row, "Monto de Adelanto Solicitado incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CI" + row, "Monto Acumulado incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CJ" + row, "Porcentaje (%) AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CK" + row, "Amortizacion mensual (Inc. IGV) AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CL" + row, "Amortizacion Acumul. (Inc. IGV) AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CM" + row, "Saldo x amortizar AM", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CN" + row, "Anexo 50.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CO" + row, "Suministro de materiales", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "CP" + row, "Expediente de Replanteo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "CQ" + row, "Nro Documento que Presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CR" + row, "Nro Documento que aprueba", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CS" + row, "Presupuesto de Replanteo de Obra", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CT" + row, "Anexo 51", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CU" + row, "Saneamiento de Gestion de Servidumbre", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "CV" + row, "Documento de Aprobacion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CW" + row, "Costo de Servidumbre (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CX" + row, "Anexo 52", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "CY" + row, "Aprobación de prestación Adicional ", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "CZ" + row, "Nro de Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DA" + row, "Tipo de Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DB" + row, "Documento que solicita el Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DC" + row, "Fecha de solicitud", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DD" + row, "Documento que aprueba el Adicional (emision Resolucion-DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DE" + row, "Monto del presupuesto Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DF" + row, "Monto del presupuesto Deductivo", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DG" + row, "Monto del presupuesto Adicional Neto", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DH" + row, "Monto presupuesto Deductivo Neto", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DI" + row, "Porcentaje de Adicional/Deductivo (%)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DJ" + row, "Monto de Aprobación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DK" + row, "Causal", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DL" + row, "Anexo 55", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DM" + row, "Aprobación Informe Consistencia (Formato 8-C)", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "DN" + row, "Monto de aprobación, inc. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DO" + row, "Anexo 56", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DP" + row, "Solicitud de Ampliacion de plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "DQ" + row, "Nro Ampliación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DR" + row, "N° Documento que solicita", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DS" + row, "Aprobación Ampliación de plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "DT" + row, "N° documento que aprueba (Resolución)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DU" + row, "Plazo otorgado (Dias)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DV" + row, "Nueva fecha de termino de obra", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DW" + row, "Causal", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DX" + row, "Anexo 57.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "DY" + row, "Solicitud Suspension de Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "DZ" + row, "Nro Suspensión", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EA" + row, "Nro Documento solicitud", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EB" + row, "Aprobación Suspensión de Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "EC" + row, "Nro documento que aprueba Suspensión", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "ED" + row, "Plazo otorgado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EE" + row, "Nueva fecha de fin de obra", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EF" + row, "Causal", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EG" + row, "Anexo 58", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EH" + row, "Aprobacion Valorización Contractual", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "EI" + row, "Nro Valorizacion Contractual", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EJ" + row, "Fecha Presentación Valorización Contractual", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EK" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EL" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EM" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EN" + row, "Valorización Bruta (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EO" + row, "Reajuste", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EP" + row, "Deducccion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EQ" + row, "Amortizacion Adelanto Directo", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "ER" + row, "Amortizacion Adelanto Materiales", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "ES" + row, "Valorizacion Neta (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "ET" + row, "IGV", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EU" + row, "Total", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EV" + row, "Monto Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EW" + row, "Anexo 59.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EX" + row, "Aprobacion Valorización Mayor Metrado", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "EY" + row, "Nro Valorización Mayor Metrado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "EZ" + row, "Fecha Presentación Valorización Mayor Metrado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FA" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FB" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FC" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FD" + row, "Valorización Bruta (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FE" + row, "Reajuste", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FF" + row, "Deducccion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FG" + row, "Amortizacion Adelanto Directo", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FH" + row, "Amortizacion Adelanto Materiales", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FI" + row, "Valorizacion Neta (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FJ" + row, "IGV", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FK" + row, "Total", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FL" + row, "Monto Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FM" + row, "Anexo 60.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FN" + row, "Aprobacion Valorizacion Presupuesto Adicional", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "FO" + row, "Nro Valorización Presupuesto Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FP" + row, "Fecha Presentación Valorización Presupuesto Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FQ" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FR" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FS" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FT" + row, "Valorización Bruta (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FU" + row, "Reajuste", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FV" + row, "Deducccion", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FW" + row, "Amortizacion Adelanto Directo", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FX" + row, "Amortizacion Adelanto Materiales", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FY" + row, "Valorizacion Neta (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "FZ" + row, "IGV", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GA" + row, "Total", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GB" + row, "Total Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GC" + row, "Anexo 61.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GD" + row, "Fecha Avance de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "GE" + row, "Nro Reporte Avance", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GF" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GG" + row, "Contractual Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GH" + row, "Mayor Metrado Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GI" + row, "Prest. Adicional Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GJ" + row, "Mensual (S/) Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GK" + row, "Acumulado (S/) Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GL" + row, "Mensual (%) Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GM" + row, "Acumulado (%) Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GN" + row, "Avance (%) Ejecutado", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GO" + row, "Retraso mensual", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GP" + row, "Anexo 63.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GQ" + row, "Trabajo Directo (Nro Trabajadores)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GR" + row, "Nro Trabajadores Indirecto", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GS" + row, "Trabajadores Oficina Central", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GT" + row, "Trabajadores Oficina campo (Hoteles, restaurante) ", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GU" + row, "Trabajadores Subcontrato", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GV" + row, "Trabajadores Total", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GW" + row, "Anexo 62.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GX" + row, "Aprobación Reprogramación de Obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "GY" + row, "Documento que presenta Reprogramación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "GZ" + row, "Fecha de presentación reprogramación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HA" + row, "Documento que aprueba reprogramación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HB" + row, "Anexo 64.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HC" + row, "Fin de Plazo Ampliado", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HD" + row, "Fin Plazo Obra", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HE" + row, "Fin de plazo por Suspension", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HF" + row, "Solicitud de Recepción de Obra (Documento Anotacion en cuaderno de Obra) ", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HG" + row, "Designación de Comité Recepción de Obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HH" + row, "Anexo 64A", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HI" + row, "Inicio del Proceso de Recepcion", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HJ" + row, "Informe de Comité", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HK" + row, "Acta Situacional-Observaciones-Recepcion de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HL" + row, "Nueva Solicitud de recepcion de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HM" + row, "Proceso de verificacion de levantamiento Observaciones", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HN" + row, "Informe de Comité 2da Visita", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HO" + row, "Acta de Recepcion de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HP" + row, "Anexo 65", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HQ" + row, "Tipo de empresa", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HR" + row, "Empresa", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HS" + row, "Inicio de Operación Experimental", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HT" + row, "Entrega de Expediente conforme a obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "HU" + row, "Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HV" + row, "LP (km)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HW" + row, "LP Reforzamiento (km)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HX" + row, "RP (Localid.)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HY" + row, "RP (Km)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "HZ" + row, "RP (Cant. Transformador)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IA" + row, "RS ( Nro Usuarios)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IB" + row, "RS (Km)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IC" + row, "Nro Luminarias", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "ID" + row, "Costo de Obra, según Conforme a Obra, incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IE" + row, "Anexo 66", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IF" + row, "Nro Localidades", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IG" + row, "Anexo 66A", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IH" + row, "Acta de Conformidad de Operación Experimental", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "II" + row, "Anexo 67", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IJ" + row, "Inicio del Periodo de Garantía ", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IK" + row, "Inspeccion del Comité de Recepcion", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IL" + row, "Suscripcion del Acta de Conformidad", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IM" + row, "Anexo 68", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IN" + row, "Requisitos para el perfeccionamiento Contrato", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IO" + row, "Suscripción Contrato BIENES/SERVICIOS", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IP" + row, "Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IQ" + row, "Monto de contrato, incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IR" + row, "Plazo (Dias)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IS" + row, "Anexo 69", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IT" + row, "Compromiso de recursos", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IU" + row, "Inicio de plazo para la entrega de bienes y servicios", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IV" + row, "Presentación  Entregables", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "IW" + row, "Nro de Informe", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IX" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IY" + row, "Anexo 70.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "IZ" + row, "Informe Conformidad entregables", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "JA" + row, "Nro de Informe", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JB" + row, "Documento que aprueba", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JC" + row, "Anexo 71.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JD" + row, "Aprobacion Valorización Bienes Servicios", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "JE" + row, "Nro Valorizacion Bienes/Servicios", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JF" + row, "Fecha presentación", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JG" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JH" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JI" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JJ" + row, "Monto Valorizado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JK" + row, "Amortizacion del AD (B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JL" + row, "Valorizcion Neta (A-B)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JM" + row, "IGV (18%)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JN" + row, "Total Facturar", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JO" + row, "Valorizado Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JP" + row, "Anexo 72.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JQ" + row, "Liquidación del Contrato de Servicio", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "JR" + row, "Nro Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JS" + row, "Nro Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JT" + row, "Monto pagado incl IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JU" + row, "Monto por pagar incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JV" + row, "Anexo 73", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JW" + row, "Registro en  Banco de Inv. Formato 09", 10, true, 'a5b0ec');
    this.setdatogeneral(wsejecucion, "JX" + row, "Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wsejecucion, "JY" + row, "Anexo 74", 10, true, 'f7f0b3');

    const fase3 = datosadicionales.filter(o => o.n_idgen_fase == 3);

    fase3.forEach(da => {

      row++;

      this.dato_tabla(wsejecucion, "A", row, da.c_codigomem);
      this.dato_tabla(wsejecucion, "B", row, da.c_codigocui);
      this.dato_tabla(wsejecucion, "C", row, da.c_nombreproyecto);
      this.dato_tabla(wsejecucion, "D", row, da.c_departamentos);
      this.dato_tabla(wsejecucion, "E", row, da.c_provincias);
      this.dato_tabla(wsejecucion, "F", row, da.c_distritos);
      this.dato_tabla(wsejecucion, "G", row, da.n_localidadesbeneficiadas);
      this.dato_tabla(wsejecucion, "H", row, da.n_poblacionbeneficiadas);
      this.dato_tabla(wsejecucion, "I", row, da.n_abonadostotales);
      this.dato_tabla(wsejecucion, "J", row, da.c_entidadcontratante);
      this.dato_tabla(wsejecucion, "K", row, da.c_jefatura);
      this.dato_tabla(wsejecucion, "L", row, da.c_jefearea);
      this.dato_tabla(wsejecucion, "M", row, da.c_cordinador);
      this.dato_tabla(wsejecucion, "N", row, da.c_faseproyecto);
      this.dato_tabla(wsejecucion, "O", row, da.c_situacionactual);
      this.dato_tabla(wsejecucion, "P", row, da.c_gerenteingenieria);
      this.dato_tabla(wsejecucion, "Q", row, da.c_jefeingenieria);

      this.dato_tabla(wsejecucion, "R", row, da.t74);
      this.dato_tabla(wsejecucion, "S", row, da.t75);
      this.dato_tabla(wsejecucion, "T", row, da.t76);
      this.dato_tabla(wsejecucion, "U", row, da.t77);
      this.dato_tabla(wsejecucion, "V", row, da.t77_a199);
      this.dato_tabla(wsejecucion, "W", row, da.t78);
      this.dato_tabla(wsejecucion, "X", row, da.t79);
      this.dato_tabla(wsejecucion, "Y", row, da.t79_a200);
      this.dato_tabla(wsejecucion, "Z", row, da.t80);
      this.dato_tabla(wsejecucion, "AA", row, da.t80_a201);
      this.dato_tabla(wsejecucion, "AB", row, da.t81);
      this.dato_tabla(wsejecucion, "AC", row, da.t82);
      this.dato_tabla(wsejecucion, "AD", row, da.t83);
      this.dato_tabla(wsejecucion, "AE", row, da.t83_a202);
      this.dato_tabla(wsejecucion, "AF", row, da.t83_a203);
      this.dato_tabla(wsejecucion, "AG", row, da.t83_a204);
      this.dato_tabla(wsejecucion, "AH", row, da.t84);
      this.dato_tabla(wsejecucion, "AI", row, da.t85);
      this.dato_tabla(wsejecucion, "AJ", row, da.t86);
      this.dato_tabla(wsejecucion, "AK", row, da.t87);
      this.dato_tabla(wsejecucion, "AL", row, da.t88);
      this.dato_tabla(wsejecucion, "AM", row, da.t89);
      this.dato_tabla(wsejecucion, "AN", row, da.t90);
      this.dato_tabla(wsejecucion, "AO", row, da.t91);
      this.dato_tabla(wsejecucion, "AP", row, da.t92);
      this.dato_tabla(wsejecucion, "AQ", row, da.t93);
      this.dato_tabla(wsejecucion, "AR", row, da.t93_205);
      this.dato_tabla(wsejecucion, "AS", row, da.t93_206);
      this.dato_tabla(wsejecucion, "AT", row, da.t93_207);
      this.dato_tabla(wsejecucion, "AU", row, da.t93_208);
      this.dato_tabla(wsejecucion, "AV", row, da.t93_209);
      this.dato_tabla(wsejecucion, "AW", row, da.t93_210);
      this.dato_tabla(wsejecucion, "AX", row, da.t93_553);
      this.dato_tabla(wsejecucion, "AY", row, da.t93_211);
      this.dato_tabla(wsejecucion, "AZ", row, da.t93_212);
      this.dato_tabla(wsejecucion, "BA", row, da.t93_213);
      this.dato_tabla(wsejecucion, "BB", row, da.t94);
      this.dato_tabla(wsejecucion, "BC", row, da.t94_a221);
      this.dato_tabla(wsejecucion, "BD", row, da.t94_a222);
      this.dato_tabla(wsejecucion, "BE", row, da.t94_a223);
      this.dato_tabla(wsejecucion, "BF", row, da.t94_a224);
      this.dato_tabla(wsejecucion, "BG", row, da.t94_a225);
      this.dato_tabla(wsejecucion, "BH", row, da.t95);
      this.dato_tabla(wsejecucion, "BI", row, da.t96);
      this.dato_tabla(wsejecucion, "BJ", row, da.t97);
      this.dato_tabla(wsejecucion, "BK", row, da.t98);
      this.dato_tabla(wsejecucion, "BL", row, da.t98_a226);
      this.dato_tabla(wsejecucion, "BM", row, da.t99);
      this.dato_tabla(wsejecucion, "BN", row, da.t99_a227);
      this.dato_tabla(wsejecucion, "BO", row, da.t99_a228);
      this.dato_tabla(wsejecucion, "BP", row, da.t99_a229);
      this.dato_tabla(wsejecucion, "BQ", row, da.t99_a230);
      this.dato_tabla(wsejecucion, "BR", row, da.t99_a231);
      this.dato_tabla(wsejecucion, "BS", row, da.t99_a232);
      this.dato_tabla(wsejecucion, "BT", row, da.t99_a233);
      this.dato_tabla(wsejecucion, "BU", row, da.t99_a234);
      this.dato_tabla(wsejecucion, "BV", row, da.t99_a235);
      this.dato_tabla(wsejecucion, "BW", row, da.t100);
      this.dato_tabla(wsejecucion, "BX", row, da.t101);
      this.dato_tabla(wsejecucion, "BY", row, da.t102);
      this.dato_tabla(wsejecucion, "BZ", row, da.t103);
      this.dato_tabla(wsejecucion, "CA", row, da.t104);
      this.dato_tabla(wsejecucion, "CB", row, da.t104_a243);
      this.dato_tabla(wsejecucion, "CC", row, da.t104_a244);
      this.dato_tabla(wsejecucion, "CD", row, da.t104_a245);
      this.dato_tabla(wsejecucion, "CE", row, da.t104_a246);
      this.dato_tabla(wsejecucion, "CF", row, da.t104_a247);
      this.dato_tabla(wsejecucion, "CG", row, da.t104_a248);
      this.dato_tabla(wsejecucion, "CH", row, da.t104_a249);
      this.dato_tabla(wsejecucion, "CI", row, da.t104_a250);
      this.dato_tabla(wsejecucion, "CJ", row, da.t104_a251);
      this.dato_tabla(wsejecucion, "CK", row, da.t104_a252);
      this.dato_tabla(wsejecucion, "CL", row, da.t104_a253);
      this.dato_tabla(wsejecucion, "CM", row, da.t104_a254);
      this.dato_tabla(wsejecucion, "CN", row, da.t104_a255);
      this.dato_tabla(wsejecucion, "CO", row, da.t105);
      this.dato_tabla(wsejecucion, "CP", row, da.t106);
      this.dato_tabla(wsejecucion, "CQ", row, da.t106_a263);
      this.dato_tabla(wsejecucion, "CR", row, da.t106_a264);
      this.dato_tabla(wsejecucion, "CS", row, da.t106_a554);
      this.dato_tabla(wsejecucion, "CT", row, da.t106_a265);
      this.dato_tabla(wsejecucion, "CU", row, da.t108);
      this.dato_tabla(wsejecucion, "CV", row, da.t108_a266);
      this.dato_tabla(wsejecucion, "CW", row, da.t108_a267);
      this.dato_tabla(wsejecucion, "CX", row, da.t108_a268);
      this.dato_tabla(wsejecucion, "CY", row, da.t109);
      this.dato_tabla(wsejecucion, "CZ", row, da.t109_a269);
      this.dato_tabla(wsejecucion, "DA", row, da.t109_a270);
      this.dato_tabla(wsejecucion, "DB", row, da.t109_a271);
      this.dato_tabla(wsejecucion, "DC", row, da.t109_a272);
      this.dato_tabla(wsejecucion, "DD", row, da.t109_a273);
      this.dato_tabla(wsejecucion, "DE", row, da.t109_a274);
      this.dato_tabla(wsejecucion, "DF", row, da.t109_a275);
      this.dato_tabla(wsejecucion, "DG", row, da.t109_a276);
      this.dato_tabla(wsejecucion, "DH", row, da.t109_a277);
      this.dato_tabla(wsejecucion, "DI", row, da.t109_a278);
      this.dato_tabla(wsejecucion, "DJ", row, da.t109_a279);
      this.dato_tabla(wsejecucion, "DK", row, da.t109_a280);
      this.dato_tabla(wsejecucion, "DL", row, da.t109_a281);
      this.dato_tabla(wsejecucion, "DM", row, da.t110);
      this.dato_tabla(wsejecucion, "DN", row, da.t110_a282);
      this.dato_tabla(wsejecucion, "DO", row, da.t110_a283);
      this.dato_tabla(wsejecucion, "DP", row, da.t111);
      this.dato_tabla(wsejecucion, "DQ", row, da.t111_a284);
      this.dato_tabla(wsejecucion, "DR", row, da.t111_a285);
      this.dato_tabla(wsejecucion, "DS", row, da.t112);
      this.dato_tabla(wsejecucion, "DT", row, da.t112_a286);
      this.dato_tabla(wsejecucion, "DU", row, da.t112_a287);
      this.dato_tabla(wsejecucion, "DV", row, da.t112_a288);
      this.dato_tabla(wsejecucion, "DW", row, da.t112_a289);
      this.dato_tabla(wsejecucion, "DX", row, da.t112_a290);
      this.dato_tabla(wsejecucion, "DY", row, da.t113);
      this.dato_tabla(wsejecucion, "DZ", row, da.t113_a291);
      this.dato_tabla(wsejecucion, "EA", row, da.t113_a292);
      this.dato_tabla(wsejecucion, "EB", row, da.t114);
      this.dato_tabla(wsejecucion, "EC", row, da.t114_a293);
      this.dato_tabla(wsejecucion, "ED", row, da.t114_a294);
      this.dato_tabla(wsejecucion, "EE", row, da.t114_a295);
      this.dato_tabla(wsejecucion, "EF", row, da.t114_a296);
      this.dato_tabla(wsejecucion, "EG", row, da.t114_a297);
      this.dato_tabla(wsejecucion, "EH", row, da.t115);
      this.dato_tabla(wsejecucion, "EI", row, da.t115_a298);
      this.dato_tabla(wsejecucion, "EJ", row, da.t115_a299);
      this.dato_tabla(wsejecucion, "EK", row, da.t115_a300);
      this.dato_tabla(wsejecucion, "EL", row, da.t115_a301);
      this.dato_tabla(wsejecucion, "EM", row, da.t115_a302);
      this.dato_tabla(wsejecucion, "EN", row, da.t115_a303);
      this.dato_tabla(wsejecucion, "EO", row, da.t115_a304);
      this.dato_tabla(wsejecucion, "EP", row, da.t115_a305);
      this.dato_tabla(wsejecucion, "EQ", row, da.t115_a306);
      this.dato_tabla(wsejecucion, "ER", row, da.t115_a307);
      this.dato_tabla(wsejecucion, "ES", row, da.t115_a308);
      this.dato_tabla(wsejecucion, "ET", row, da.t115_a309);
      this.dato_tabla(wsejecucion, "EU", row, da.t115_a310);
      this.dato_tabla(wsejecucion, "EV", row, da.t115_a311);
      this.dato_tabla(wsejecucion, "EW", row, da.t115_a312);
      this.dato_tabla(wsejecucion, "EX", row, da.t116);
      this.dato_tabla(wsejecucion, "EY", row, da.t116_a313);
      this.dato_tabla(wsejecucion, "EZ", row, da.t116_a314);
      this.dato_tabla(wsejecucion, "FA", row, da.t116_a315);
      this.dato_tabla(wsejecucion, "FB", row, da.t116_a316);
      this.dato_tabla(wsejecucion, "FC", row, da.t116_a317);
      this.dato_tabla(wsejecucion, "FD", row, da.t116_a318);
      this.dato_tabla(wsejecucion, "FE", row, da.t116_a319);
      this.dato_tabla(wsejecucion, "FF", row, da.t116_a320);
      this.dato_tabla(wsejecucion, "FG", row, da.t116_a321);
      this.dato_tabla(wsejecucion, "FH", row, da.t116_a322);
      this.dato_tabla(wsejecucion, "FI", row, da.t116_a323);
      this.dato_tabla(wsejecucion, "FJ", row, da.t116_a324);
      this.dato_tabla(wsejecucion, "FK", row, da.t116_a325);
      this.dato_tabla(wsejecucion, "FL", row, da.t116_a326);
      this.dato_tabla(wsejecucion, "FM", row, da.t116_a327);
      this.dato_tabla(wsejecucion, "FN", row, da.t117);
      this.dato_tabla(wsejecucion, "FO", row, da.t117_a328);
      this.dato_tabla(wsejecucion, "FP", row, da.t117_a329);
      this.dato_tabla(wsejecucion, "FQ", row, da.t117_a330);
      this.dato_tabla(wsejecucion, "FR", row, da.t117_a331);
      this.dato_tabla(wsejecucion, "FS", row, da.t117_a332);
      this.dato_tabla(wsejecucion, "FT", row, da.t117_a333);
      this.dato_tabla(wsejecucion, "FU", row, da.t117_a334);
      this.dato_tabla(wsejecucion, "FV", row, da.t117_a335);
      this.dato_tabla(wsejecucion, "FW", row, da.t117_a336);
      this.dato_tabla(wsejecucion, "FX", row, da.t117_a337);
      this.dato_tabla(wsejecucion, "FY", row, da.t117_a338);
      this.dato_tabla(wsejecucion, "FZ", row, da.t117_a339);
      this.dato_tabla(wsejecucion, "GA", row, da.t117_a340);
      this.dato_tabla(wsejecucion, "GB", row, da.t117_a341);
      this.dato_tabla(wsejecucion, "GC", row, da.t117_a342);
      this.dato_tabla(wsejecucion, "GD", row, da.t118);
      this.dato_tabla(wsejecucion, "GE", row, da.t118_a350);
      this.dato_tabla(wsejecucion, "GF", row, da.t118_a351);
      this.dato_tabla(wsejecucion, "GG", row, da.t118_a356);
      this.dato_tabla(wsejecucion, "GH", row, da.t118_a357);
      this.dato_tabla(wsejecucion, "GI", row, da.t118_a358);
      this.dato_tabla(wsejecucion, "GJ", row, da.t118_a359);
      this.dato_tabla(wsejecucion, "GK", row, da.t118_a360);
      this.dato_tabla(wsejecucion, "GL", row, da.t118_a361);
      this.dato_tabla(wsejecucion, "GM", row, da.t118_a362);
      this.dato_tabla(wsejecucion, "GN", row, da.t118_a363);
      this.dato_tabla(wsejecucion, "GO", row, da.t118_a364);
      this.dato_tabla(wsejecucion, "GP", row, da.t118_a365);
      this.dato_tabla(wsejecucion, "GQ", row, da.t118_a343);
      this.dato_tabla(wsejecucion, "GR", row, da.t118_a344);
      this.dato_tabla(wsejecucion, "GS", row, da.t118_a345);
      this.dato_tabla(wsejecucion, "GT", row, da.t118_a346);
      this.dato_tabla(wsejecucion, "GU", row, da.t118_a347);
      this.dato_tabla(wsejecucion, "GV", row, da.t118_a348);
      this.dato_tabla(wsejecucion, "GW", row, da.t118_a349);
      this.dato_tabla(wsejecucion, "GX", row, da.t119);
      this.dato_tabla(wsejecucion, "GY", row, da.t119_a366);
      this.dato_tabla(wsejecucion, "GZ", row, da.t119_a367);
      this.dato_tabla(wsejecucion, "HA", row, da.t119_a368);
      this.dato_tabla(wsejecucion, "HB", row, da.t119_a369);
      this.dato_tabla(wsejecucion, "HC", row, da.t120);
      this.dato_tabla(wsejecucion, "HD", row, da.t120_a370);
      this.dato_tabla(wsejecucion, "HE", row, da.t120_a371);
      this.dato_tabla(wsejecucion, "HF", row, da.t121);
      this.dato_tabla(wsejecucion, "HG", row, da.t122);
      this.dato_tabla(wsejecucion, "HH", row, da.t122_a372);
      this.dato_tabla(wsejecucion, "HI", row, da.t123);
      this.dato_tabla(wsejecucion, "HJ", row, da.t124);
      this.dato_tabla(wsejecucion, "HK", row, da.t125);
      this.dato_tabla(wsejecucion, "HL", row, da.t126);
      this.dato_tabla(wsejecucion, "HM", row, da.t127);
      this.dato_tabla(wsejecucion, "HN", row, da.t128);
      this.dato_tabla(wsejecucion, "HO", row, da.t129);
      this.dato_tabla(wsejecucion, "HP", row, da.t129_a373);
      this.dato_tabla(wsejecucion, "HQ", row, da.t129_a374);
      this.dato_tabla(wsejecucion, "HR", row, da.t129_a375);
      this.dato_tabla(wsejecucion, "HS", row, da.t130);
      this.dato_tabla(wsejecucion, "HT", row, da.t131);
      this.dato_tabla(wsejecucion, "HU", row, da.t131_a376);
      this.dato_tabla(wsejecucion, "HV", row, da.t131_a377);
      this.dato_tabla(wsejecucion, "HW", row, da.t131_a378);
      this.dato_tabla(wsejecucion, "HX", row, da.t131_a379);
      this.dato_tabla(wsejecucion, "HY", row, da.t131_a380);
      this.dato_tabla(wsejecucion, "HZ", row, da.t131_a381);
      this.dato_tabla(wsejecucion, "IA", row, da.t131_a382);
      this.dato_tabla(wsejecucion, "IB", row, da.t131_a383);
      this.dato_tabla(wsejecucion, "IC", row, da.t131_a384);
      this.dato_tabla(wsejecucion, "ID", row, da.t131_a385);
      this.dato_tabla(wsejecucion, "IE", row, da.t131_a386);
      this.dato_tabla(wsejecucion, "IF", row, da.t131_a387);
      this.dato_tabla(wsejecucion, "IG", row, da.t131_a388);
      this.dato_tabla(wsejecucion, "IH", row, da.t132);
      this.dato_tabla(wsejecucion, "II", row, da.t132_a389);
      this.dato_tabla(wsejecucion, "IJ", row, da.t133);
      this.dato_tabla(wsejecucion, "IK", row, da.t134);
      this.dato_tabla(wsejecucion, "IL", row, da.t135);
      this.dato_tabla(wsejecucion, "IM", row, da.t135_a390);
      this.dato_tabla(wsejecucion, "IN", row, da.t136);
      this.dato_tabla(wsejecucion, "IO", row, da.t137);
      this.dato_tabla(wsejecucion, "IP", row, da.t137_a391);
      this.dato_tabla(wsejecucion, "IQ", row, da.t137_a392);
      this.dato_tabla(wsejecucion, "IR", row, da.t137_a393);
      this.dato_tabla(wsejecucion, "IS", row, da.t137_a394);
      this.dato_tabla(wsejecucion, "IT", row, da.t138);
      this.dato_tabla(wsejecucion, "IU", row, da.t139);
      this.dato_tabla(wsejecucion, "IV", row, da.t140);
      this.dato_tabla(wsejecucion, "IW", row, da.t140_a395);
      this.dato_tabla(wsejecucion, "IX", row, da.t140_a396);
      this.dato_tabla(wsejecucion, "IY", row, da.t140_a397);
      this.dato_tabla(wsejecucion, "IZ", row, da.t141);
      this.dato_tabla(wsejecucion, "JA", row, da.t141_a398);
      this.dato_tabla(wsejecucion, "JB", row, da.t141_a399);
      this.dato_tabla(wsejecucion, "JC", row, da.t141_a400);
      this.dato_tabla(wsejecucion, "JD", row, da.t142);
      this.dato_tabla(wsejecucion, "JE", row, da.t142_a401);
      this.dato_tabla(wsejecucion, "JF", row, da.t142_a402);
      this.dato_tabla(wsejecucion, "JG", row, da.t142_a403);
      this.dato_tabla(wsejecucion, "JH", row, da.t142_a404);
      this.dato_tabla(wsejecucion, "JI", row, da.t142_a405);
      this.dato_tabla(wsejecucion, "JJ", row, da.t142_a406);
      this.dato_tabla(wsejecucion, "JK", row, da.t142_a407);
      this.dato_tabla(wsejecucion, "JL", row, da.t142_a408);
      this.dato_tabla(wsejecucion, "JM", row, da.t142_a409);
      this.dato_tabla(wsejecucion, "JN", row, da.t142_a410);
      this.dato_tabla(wsejecucion, "JO", row, da.t142_a411);
      this.dato_tabla(wsejecucion, "JP", row, da.t142_a412);
      this.dato_tabla(wsejecucion, "JQ", row, da.t143);
      this.dato_tabla(wsejecucion, "JR", row, da.t143_a413);
      this.dato_tabla(wsejecucion, "JS", row, da.t143_a414);
      this.dato_tabla(wsejecucion, "JT", row, da.t143_a415);
      this.dato_tabla(wsejecucion, "JU", row, da.t143_a416);
      this.dato_tabla(wsejecucion, "JV", row, da.t143_a417);
      this.dato_tabla(wsejecucion, "JW", row, da.t144);
      this.dato_tabla(wsejecucion, "JX", row, da.t144_a418);
      this.dato_tabla(wsejecucion, "JY", row, da.t144_a419);

      for (let i = 1; i <= 285; i++) {
        wsejecucion.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    title = 'SUPERVISION';
    const wssupervision = workbook.addWorksheet('SUPERVISION');
    row = 1;
    wssupervision.mergeCells('B1:L1');
    wssupervision.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wssupervision, "B" + row, title, 14, true);
    wssupervision.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;
    row++;
    row++;
    row++;

    wssupervision.getColumn(1).width = 5;
    wssupervision.getColumn(2).width = 15;
    wssupervision.getColumn(3).width = 75;

    for (let i = 1; i <= 3; i++) {
      wssupervision.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    for (let i = 4; i <= 173; i++) {
      wssupervision.getColumn(i).width = 30;
      wssupervision.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }

      wssupervision.getRow(row).height = 45;
      wssupervision.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };
    }

    this.setdatogeneral(wssupervision, "A" + row, "N°", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "B" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "C" + row, "NOMBRE DEL PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "D" + row, "Departamento(s)", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "E" + row, "Provincia(s)", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "F" + row, "Distrito(s)", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "G" + row, "N° Localidades Beneficiadas", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "H" + row, "Poblacion Beneficiada", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "I" + row, "Abonados Totales (N° Conexiones)", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "J" + row, "ENTIDAD CONTRATANTE", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "K" + row, "JEFATURA", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "L" + row, "COORDINADOR", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "M" + row, "GESTOR", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "N" + row, "FASE", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "O" + row, "SITUACION ACTUAL", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "P" + row, "GERENTE INGENIERIA", 10, true, '91cff2');
    this.setdatogeneral(wssupervision, "Q" + row, "JEFE DE INGENIERIA", 10, true, '91cff2');

    this.setdatogeneral(wssupervision, "R" + row, "INICIO", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "S" + row, "Requerimiento y TdR aprobados (Elaboración de TdR)", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "T" + row, "EPOM", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "U" + row, "Certificación  presupuestal", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "V" + row, "Incorporación  al PAC", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "W" + row, "N° Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "X" + row, "Anexo 75", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "Y" + row, "Aprobación del Expediente de Contratación", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "Z" + row, "N° Documento", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AA" + row, "Anexo 76", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AB" + row, "Designación del Comité de Selección", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AC" + row, "Anexo 76A", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AD" + row, "Elaboración de (Proyecto) bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AE" + row, "Aprobación de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AF" + row, "Convocatoria Concurso", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AG" + row, "N° Concurso Publico", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AH" + row, "Valor Referencial incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AI" + row, "Anexo 77", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AJ" + row, "Registro de Participantes", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AK" + row, "Formulación de consultas y observaciones", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AL" + row, "Absolución de consultas y obsevaciones e integración de bases", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AM" + row, "Presentación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AN" + row, "Evaluación y calificación de ofertas", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AO" + row, "Otorgamiento de la Buena Pro", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AP" + row, "Buena Pro consentida", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AQ" + row, "Requisitos para el perfeccionamiento del Contrato", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AR" + row, "Suscripción Contrato de Consultoría", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "AS" + row, "Nro Contrato", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AT" + row, "Sistema de Contratación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AU" + row, "Empresa", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AV" + row, "Representante legal", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AW" + row, "Dirección", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AX" + row, "Monto Contrato, incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AY" + row, "GASTOS GENERALES Y UTILIDADES", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "AZ" + row, "Plazo (dias calendario)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BA" + row, "Anexo 78", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BB" + row, "Otorgamiento del adelanto directo", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BC" + row, "Nro Documento solicitudd Adelanto Directo ", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BD" + row, "Fecha de solicitud AD", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BE" + row, "Documento aprobación AD ", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BF" + row, "Documento desembolso", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BG" + row, "Monto total de Adelanto otorgado Inc. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BH" + row, "Anexo 78A", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BI" + row, "Compromiso de recursos", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BJ" + row, "Notificación al Supervisor o Inspector sobre inicio de Servicio", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BK" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BL" + row, "Anexo 80", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BM" + row, "Inicio de Supervisión de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BN" + row, "Revisión al expediente técnico de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BO" + row, "Documento que aprueba (Superv.)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BP" + row, "Anexo 81", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BQ" + row, "Informe Mensual", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BR" + row, "Nro de Informe", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BS" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BT" + row, "Anexo 82.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BU" + row, "Fecha aprobación", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BV" + row, "Nro Informe Aprobación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BW" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BX" + row, "Anexo 83.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "BY" + row, "Supervisión de Ejecución Física", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "BZ" + row, "Solicitud Ampliación Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "CA" + row, "Nro Ampliación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CB" + row, "N° Documento que solicita", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CC" + row, "Aprobación Ampliación Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "CD" + row, "Nro documento aprueba ampliación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CE" + row, "Plazo otorgado (Dias)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CF" + row, "Nueva fecha de termino de Supervisión", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CG" + row, "Causal", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CH" + row, "Anexo 84", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CI" + row, "Solicitud Suspensión de Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "CJ" + row, "Nro Suspensión", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CK" + row, "Nro Documento que solicita", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CL" + row, "Aprobación Suspesión Plazo", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "CM" + row, "Nro documento que aprueba", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CN" + row, "Plazo otorgado (dc)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CO" + row, "Nueva fecha de fin de obra", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CP" + row, "Causal", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CQ" + row, "Anexo 85", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CR" + row, "Aprobación Reprogramación de Consultoria", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "CS" + row, "Documento que presenta Reprogramación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CT" + row, "Fecha de presentación reprogramación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CU" + row, "Documento que aprueba reprogramación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CV" + row, "Fecha Aprobación Prestación Adicional Supervisión", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "CW" + row, "Fecha solicitud Prestación Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CX" + row, "Tipo ode Prestación Adicional", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CY" + row, "Documento que solicta", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "CZ" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DA" + row, "Monto aprobado Incl IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DB" + row, "Nuevo monto de Contrato, Incl IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DC" + row, "Anexo 86A", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DD" + row, "Informe sobre adelanto de materiales solicitado por Contratista", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "DE" + row, "Informe conformidad (Sup.)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DF" + row, "Informe conformidad al Expediente de Replanteo", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "DG" + row, "Informe de conformidad (Sup.)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DH" + row, "Informe conformidad, sobre Ampliación de plazo solicitado por el Contratista", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "DI" + row, "Informe conformidad (Sup.)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DJ" + row, "Informe conformidad sobre Suspensión del plazo de ejecución", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "DK" + row, "Informe conformidad (Sup.)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DL" + row, "Valorización Contractual", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "DM" + row, "Nro Valorizacion Contractual", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DN" + row, "Fecha Presentación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DO" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DP" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DQ" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DR" + row, "Monto Bruto Valorizado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DS" + row, "Reajuste", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DT" + row, "Deducciones y/o Otros", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DU" + row, "Amortización del AD", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DV" + row, "Valorización Neta (VN) ", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DW" + row, "IGV", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DX" + row, "Total", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DY" + row, "Monto Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "DZ" + row, "Anexo 84.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EA" + row, "Aprobacion Valorización Mayor Metrado", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "EB" + row, "Nro Valorizacion Mayor Metrado", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EC" + row, "Fecha Presentación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "ED" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EE" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EF" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EG" + row, "Monto Bruto Valorizado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EH" + row, "Reajuste", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EI" + row, "Deducciones y/o Otros", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EJ" + row, "Amortización", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EK" + row, "Valorización Neta (VN) ", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EL" + row, "IGV", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EM" + row, "Total", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EN" + row, "Monto Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EO" + row, "Anexo 85.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EP" + row, "Aprobacion Valorización Partidas Adicionales", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "EQ" + row, "Nro Valorizacion Partidas Adicionales", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "ER" + row, "Fecha Presentación", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "ES" + row, "Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "ET" + row, "Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EU" + row, "Mes-Año", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EV" + row, "Monto Bruto Valorizado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EW" + row, "Reajuste", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EX" + row, "Deducciones y/o Otros", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EY" + row, "Amortización", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "EZ" + row, "Valorización Neta (VN) ", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "FA" + row, "IGV", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "FB" + row, "Total", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "FC" + row, "Monto Acumulado (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "FD" + row, "Anexo 86.1", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "FE" + row, "Informe conformidad de Reprogramación de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FF" + row, "Fin del Contrato de Consultoria", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FG" + row, "Informe de Culminación (Fin de Obra)", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FH" + row, "Informe sobre levantamiento de observaciones", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FI" + row, "Informe de Comité (1ra. Visita)", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FJ" + row, "Acta de Recepcion de obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FK" + row, "Anexo 88", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "FL" + row, "Inicio de Operación Experimental", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FM" + row, "Aprobación del Expediente conforme a obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FN" + row, "Anexo 89", 10, true, 'f7f0b3');
    this.setdatogeneral(wssupervision, "FO" + row, "Comunicación Termino de Operación Experimental", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FP" + row, "Acta de Conformidad de Operación Experimental", 10, true, 'a5b0ec');
    this.setdatogeneral(wssupervision, "FQ" + row, "Anexo 90", 10, true, 'f7f0b3');

    const fase4 = datosadicionales.filter(o => o.n_idgen_fase == 4);

    fase4.forEach(da => {

      row++;

      this.dato_tabla(wssupervision, "A", row, da.c_codigomem);
      this.dato_tabla(wssupervision, "B", row, da.c_codigocui);
      this.dato_tabla(wssupervision, "C", row, da.c_nombreproyecto);
      this.dato_tabla(wssupervision, "D", row, da.c_departamentos);
      this.dato_tabla(wssupervision, "E", row, da.c_provincias);
      this.dato_tabla(wssupervision, "F", row, da.c_distritos);
      this.dato_tabla(wssupervision, "G", row, da.n_localidadesbeneficiadas);
      this.dato_tabla(wssupervision, "H", row, da.n_poblacionbeneficiadas);
      this.dato_tabla(wssupervision, "I", row, da.n_abonadostotales);
      this.dato_tabla(wssupervision, "J", row, da.c_entidadcontratante);
      this.dato_tabla(wssupervision, "K", row, da.c_jefatura);
      this.dato_tabla(wssupervision, "L", row, da.c_jefearea);
      this.dato_tabla(wssupervision, "M", row, da.c_cordinador);
      this.dato_tabla(wssupervision, "N", row, da.c_faseproyecto);
      this.dato_tabla(wssupervision, "O", row, da.c_situacionactual);
      this.dato_tabla(wssupervision, "P", row, da.c_gerenteingenieria);
      this.dato_tabla(wssupervision, "Q", row, da.c_jefeingenieria);

      this.dato_tabla(wssupervision, "R", row, da.t145);
      this.dato_tabla(wssupervision, "S", row, da.t146);
      this.dato_tabla(wssupervision, "T", row, da.t147);
      this.dato_tabla(wssupervision, "U", row, da.t148);
      this.dato_tabla(wssupervision, "V", row, da.t149);
      this.dato_tabla(wssupervision, "W", row, da.t149_a420);
      this.dato_tabla(wssupervision, "X", row, da.t149_a421);
      this.dato_tabla(wssupervision, "Y", row, da.t150);
      this.dato_tabla(wssupervision, "Z", row, da.t150_a422);
      this.dato_tabla(wssupervision, "AA", row, da.t150_a423);
      this.dato_tabla(wssupervision, "AB", row, da.t151);
      this.dato_tabla(wssupervision, "AC", row, da.t151_a424);
      this.dato_tabla(wssupervision, "AD", row, da.t152);
      this.dato_tabla(wssupervision, "AE", row, da.t153);
      this.dato_tabla(wssupervision, "AF", row, da.t154);
      this.dato_tabla(wssupervision, "AG", row, da.t154_a425);
      this.dato_tabla(wssupervision, "AH", row, da.t154_a426);
      this.dato_tabla(wssupervision, "AI", row, da.t154_a427);
      this.dato_tabla(wssupervision, "AJ", row, da.t155);
      this.dato_tabla(wssupervision, "AK", row, da.t156);
      this.dato_tabla(wssupervision, "AL", row, da.t157);
      this.dato_tabla(wssupervision, "AM", row, da.t158);
      this.dato_tabla(wssupervision, "AN", row, da.t159);
      this.dato_tabla(wssupervision, "AO", row, da.t160);
      this.dato_tabla(wssupervision, "AP", row, da.t161);
      this.dato_tabla(wssupervision, "AQ", row, da.t162);
      this.dato_tabla(wssupervision, "AR", row, da.t163);
      this.dato_tabla(wssupervision, "AS", row, da.t163_a428);
      this.dato_tabla(wssupervision, "AT", row, da.t163_a429);
      this.dato_tabla(wssupervision, "AU", row, da.t163_a430);
      this.dato_tabla(wssupervision, "AV", row, da.t163_a431);
      this.dato_tabla(wssupervision, "AW", row, da.t163_a432);
      this.dato_tabla(wssupervision, "AX", row, da.t163_a433);
      this.dato_tabla(wssupervision, "AY", row, da.t163_a555);
      this.dato_tabla(wssupervision, "AZ", row, da.t163_a434);
      this.dato_tabla(wssupervision, "BA", row, da.t163_a435);
      this.dato_tabla(wssupervision, "BB", row, da.t164);
      this.dato_tabla(wssupervision, "BC", row, da.t164_a443);
      this.dato_tabla(wssupervision, "BD", row, da.t164_a444);
      this.dato_tabla(wssupervision, "BE", row, da.t164_a445);
      this.dato_tabla(wssupervision, "BF", row, da.t164_a443_2);
      this.dato_tabla(wssupervision, "BG", row, da.t164_a444_2);
      this.dato_tabla(wssupervision, "BH", row, da.t164_a445_2);
      this.dato_tabla(wssupervision, "BI", row, da.t165);
      this.dato_tabla(wssupervision, "BJ", row, da.t166);
      this.dato_tabla(wssupervision, "BK", row, da.t1166_a456);
      this.dato_tabla(wssupervision, "BL", row, da.t1166_a457);
      this.dato_tabla(wssupervision, "BM", row, da.t167);
      this.dato_tabla(wssupervision, "BN", row, da.t168);
      this.dato_tabla(wssupervision, "BO", row, da.t168_a458);
      this.dato_tabla(wssupervision, "BP", row, da.t168_a459);
      this.dato_tabla(wssupervision, "BQ", row, da.t169);
      this.dato_tabla(wssupervision, "BR", row, da.t169_a460);
      this.dato_tabla(wssupervision, "BS", row, da.t169_a461);
      this.dato_tabla(wssupervision, "BT", row, da.t169_a462);
      this.dato_tabla(wssupervision, "BU", row, da.t170);
      this.dato_tabla(wssupervision, "BV", row, da.t170_a463);
      this.dato_tabla(wssupervision, "BW", row, da.t170_a464);
      this.dato_tabla(wssupervision, "BX", row, da.t170_a465);
      this.dato_tabla(wssupervision, "BY", row, da.t171);
      this.dato_tabla(wssupervision, "BZ", row, da.t172);
      this.dato_tabla(wssupervision, "CA", row, da.t172_a466);
      this.dato_tabla(wssupervision, "CB", row, da.t172_a467);
      this.dato_tabla(wssupervision, "CC", row, da.t173);
      this.dato_tabla(wssupervision, "CD", row, da.t173_a468);
      this.dato_tabla(wssupervision, "CE", row, da.t173_a469);
      this.dato_tabla(wssupervision, "CF", row, da.t173_a470);
      this.dato_tabla(wssupervision, "CG", row, da.t173_a471);
      this.dato_tabla(wssupervision, "CH", row, da.t173_a472);
      this.dato_tabla(wssupervision, "CI", row, da.t174);
      this.dato_tabla(wssupervision, "CJ", row, da.t174_a473);
      this.dato_tabla(wssupervision, "CK", row, da.t174_a474);
      this.dato_tabla(wssupervision, "CL", row, da.t175);
      this.dato_tabla(wssupervision, "CM", row, da.t175_a475);
      this.dato_tabla(wssupervision, "CN", row, da.t175_a476);
      this.dato_tabla(wssupervision, "CO", row, da.t175_a477);
      this.dato_tabla(wssupervision, "CP", row, da.t175_a478);
      this.dato_tabla(wssupervision, "CQ", row, da.t175_a479);
      this.dato_tabla(wssupervision, "CR", row, da.t210);
      this.dato_tabla(wssupervision, "CS", row, da.t210_a556);
      this.dato_tabla(wssupervision, "CT", row, da.t210_a557);
      this.dato_tabla(wssupervision, "CU", row, da.t210_a558);
      this.dato_tabla(wssupervision, "CV", row, da.t176);
      this.dato_tabla(wssupervision, "CW", row, da.t176_a480);
      this.dato_tabla(wssupervision, "CX", row, da.t176_a561);
      this.dato_tabla(wssupervision, "CY", row, da.t176_a481);
      this.dato_tabla(wssupervision, "CZ", row, da.t176_a482);
      this.dato_tabla(wssupervision, "DA", row, da.t176_a483);
      this.dato_tabla(wssupervision, "DB", row, da.t176_a484);
      this.dato_tabla(wssupervision, "DC", row, da.t176_a485);
      this.dato_tabla(wssupervision, "DD", row, da.t177);
      this.dato_tabla(wssupervision, "DE", row, da.t177_a486);
      this.dato_tabla(wssupervision, "DF", row, da.t178);
      this.dato_tabla(wssupervision, "DG", row, da.t178_a487);
      this.dato_tabla(wssupervision, "DH", row, da.t179);
      this.dato_tabla(wssupervision, "DI", row, da.t179_a488);
      this.dato_tabla(wssupervision, "DJ", row, da.t180);
      this.dato_tabla(wssupervision, "DK", row, da.t180_a489);
      this.dato_tabla(wssupervision, "DL", row, da.t181);
      this.dato_tabla(wssupervision, "DM", row, da.t181_a490);
      this.dato_tabla(wssupervision, "DN", row, da.t181_a491);
      this.dato_tabla(wssupervision, "DO", row, da.t181_a492);
      this.dato_tabla(wssupervision, "DP", row, da.t181_a493);
      this.dato_tabla(wssupervision, "DQ", row, da.t181_a494);
      this.dato_tabla(wssupervision, "DR", row, da.t181_a495);
      this.dato_tabla(wssupervision, "DS", row, da.t181_a496);
      this.dato_tabla(wssupervision, "DT", row, da.t181_a497);
      this.dato_tabla(wssupervision, "DU", row, da.t181_a498);
      this.dato_tabla(wssupervision, "DV", row, da.t181_a499);
      this.dato_tabla(wssupervision, "DW", row, da.t181_a500);
      this.dato_tabla(wssupervision, "DX", row, da.t181_a501);
      this.dato_tabla(wssupervision, "DY", row, da.t181_a502);
      this.dato_tabla(wssupervision, "DZ", row, da.t181_a503);
      this.dato_tabla(wssupervision, "EA", row, da.t182);
      this.dato_tabla(wssupervision, "EB", row, da.t182_a504);
      this.dato_tabla(wssupervision, "EC", row, da.t182_a505);
      this.dato_tabla(wssupervision, "ED", row, da.t182_a506);
      this.dato_tabla(wssupervision, "EE", row, da.t182_a507);
      this.dato_tabla(wssupervision, "EF", row, da.t182_a508);
      this.dato_tabla(wssupervision, "EG", row, da.t182_a509);
      this.dato_tabla(wssupervision, "EH", row, da.t182_a510);
      this.dato_tabla(wssupervision, "EI", row, da.t182_a511);
      this.dato_tabla(wssupervision, "EJ", row, da.t182_a512);
      this.dato_tabla(wssupervision, "EK", row, da.t182_a513);
      this.dato_tabla(wssupervision, "EL", row, da.t182_a514);
      this.dato_tabla(wssupervision, "EM", row, da.t182_a515);
      this.dato_tabla(wssupervision, "EN", row, da.t182_a516);
      this.dato_tabla(wssupervision, "EO", row, da.t182_a517);
      this.dato_tabla(wssupervision, "EP", row, da.t183);
      this.dato_tabla(wssupervision, "EQ", row, da.t183_a518);
      this.dato_tabla(wssupervision, "ER", row, da.t183_a519);
      this.dato_tabla(wssupervision, "ES", row, da.t183_a520);
      this.dato_tabla(wssupervision, "ET", row, da.t183_a521);
      this.dato_tabla(wssupervision, "EU", row, da.t183_a522);
      this.dato_tabla(wssupervision, "EV", row, da.t183_a523);
      this.dato_tabla(wssupervision, "EW", row, da.t183_a524);
      this.dato_tabla(wssupervision, "EX", row, da.t183_a525);
      this.dato_tabla(wssupervision, "EY", row, da.t183_a526);
      this.dato_tabla(wssupervision, "EZ", row, da.t183_a527);
      this.dato_tabla(wssupervision, "FA", row, da.t183_a528);
      this.dato_tabla(wssupervision, "FB", row, da.t183_a529);
      this.dato_tabla(wssupervision, "FC", row, da.t183_a530);
      this.dato_tabla(wssupervision, "FD", row, da.t183_a531);
      this.dato_tabla(wssupervision, "FE", row, da.t184);
      this.dato_tabla(wssupervision, "FF", row, da.t185);
      this.dato_tabla(wssupervision, "FG", row, da.t186);
      this.dato_tabla(wssupervision, "FH", row, da.t187);
      this.dato_tabla(wssupervision, "FI", row, da.t188);
      this.dato_tabla(wssupervision, "FJ", row, da.t189);
      this.dato_tabla(wssupervision, "FK", row, da.t189_a532);
      this.dato_tabla(wssupervision, "FL", row, da.t190);
      this.dato_tabla(wssupervision, "FM", row, da.t191);
      this.dato_tabla(wssupervision, "FN", row, da.t191_a533);
      this.dato_tabla(wssupervision, "FO", row, da.t192);
      this.dato_tabla(wssupervision, "FP", row, da.t193);
      this.dato_tabla(wssupervision, "FQ", row, da.t193_a534);

      for (let i = 1; i <= 173; i++) {
        wssupervision.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });


    title = 'CIERRE';
    const wscierre = workbook.addWorksheet('CIERRE');
    row = 1;
    wscierre.mergeCells('B1:L1');
    wscierre.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wscierre, "B" + row, title, 14, true);
    wscierre.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;
    row++;
    row++;
    row++;

    wscierre.getColumn(1).width = 5;
    wscierre.getColumn(2).width = 15;
    wscierre.getColumn(3).width = 75;

    for (let i = 1; i <= 3; i++) {
      wscierre.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    for (let i = 4; i <= 50; i++) {
      wscierre.getColumn(i).width = 30;
      wscierre.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }

      wscierre.getRow(row).height = 45;
      wscierre.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };
    }

    this.setdatogeneral(wscierre, "A" + row, "N°", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "B" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "C" + row, "NOMBRE DEL PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "D" + row, "Departamento(s)", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "E" + row, "Provincia(s)", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "F" + row, "Distrito(s)", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "G" + row, "N° Localidades Beneficiadas", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "H" + row, "Poblacion Beneficiada", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "I" + row, "Abonados Totales (N° Conexiones)", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "J" + row, "ENTIDAD CONTRATANTE", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "K" + row, "JEFATURA", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "L" + row, "COORDINADOR", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "M" + row, "GESTOR", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "N" + row, "FASE", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "O" + row, "SITUACION ACTUAL", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "P" + row, "GERENTE INGENIERIA", 10, true, '91cff2');
    this.setdatogeneral(wscierre, "Q" + row, "JEFE DE INGENIERIA", 10, true, '91cff2');

    this.setdatogeneral(wscierre, "R" + row, "Liquidacion del Contratista", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "S" + row, "N° Documento que aprueba (DGER)", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "T" + row, "Costo de la Obra (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "U" + row, "Monto Pagado, incl. (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "V" + row, "Monto por pagar incl IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "W" + row, "Anexo 91", 10, true, 'f7f0b3');

    this.setdatogeneral(wscierre, "X" + row, "Certificado de Conformidad (DGER)", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "Y" + row, "Anexo 92", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "Z" + row, "N° Documento que aprueba (DGER)", 10, true, 'f7f0b3');

    this.setdatogeneral(wscierre, "AA" + row, "Liquidación de Supervisión", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AB" + row, "Monto contrato Supervisor, incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AC" + row, "Monto pagado,  incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AD" + row, "Monto por pagar,  incl. IGV (S/)", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AE" + row, "Anexo 93", 10, true, 'f7f0b3');

    this.setdatogeneral(wscierre, "AF" + row, "Certificación de Conformidad", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AG" + row, "Anexo 94", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AH" + row, "Registro en  Banco de Inv. Formato 09", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AI" + row, "Anexo 95", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AJ" + row, "Cierre de Contrato (Recepción Definitiva)", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AK" + row, "Declaratoria de fábrica o Memoria Desccriptiva valorizada", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AL" + row, "N° Documento que presenta", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AM" + row, "Anexo 96", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AN" + row, "Inventario Fisico", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AO" + row, "Aprobar la liquidación de Obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AP" + row, "Designación de la Comisión de Transferencia de Obras", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AQ" + row, "Elaborar el expediente de Transferencia", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AR" + row, "Elaborar el informe de transferencia de la obra", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AS" + row, "Acto de Transferencia", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AT" + row, "Emisión de Resolución que aprueba Transferencia", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AU" + row, "Saneamiento Contable", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AV" + row, "Anexo 97", 10, true, 'f7f0b3');
    this.setdatogeneral(wscierre, "AW" + row, "Documentos Evaluación Ex Post de inversiones al proyecto de inversión", 10, true, 'a5b0ec');
    this.setdatogeneral(wscierre, "AX" + row, "Anexo 98", 10, true, 'f7f0b3');

    const fase5 = datosadicionales.filter(o => o.n_idgen_fase == 5);

    fase5.forEach(da => {

      row++;

      this.dato_tabla(wscierre, "A", row, da.c_codigomem);
      this.dato_tabla(wscierre, "B", row, da.c_codigocui);
      this.dato_tabla(wscierre, "C", row, da.c_nombreproyecto);
      this.dato_tabla(wscierre, "D", row, da.c_departamentos);
      this.dato_tabla(wscierre, "E", row, da.c_provincias);
      this.dato_tabla(wscierre, "F", row, da.c_distritos);
      this.dato_tabla(wscierre, "G", row, da.n_localidadesbeneficiadas);
      this.dato_tabla(wscierre, "H", row, da.n_poblacionbeneficiadas);
      this.dato_tabla(wscierre, "I", row, da.n_abonadostotales);
      this.dato_tabla(wscierre, "J", row, da.c_entidadcontratante);
      this.dato_tabla(wscierre, "K", row, da.c_jefatura);
      this.dato_tabla(wscierre, "L", row, da.c_jefearea);
      this.dato_tabla(wscierre, "M", row, da.c_cordinador);
      this.dato_tabla(wscierre, "N", row, da.c_faseproyecto);
      this.dato_tabla(wscierre, "O", row, da.c_situacionactual);
      this.dato_tabla(wscierre, "P", row, da.c_gerenteingenieria);
      this.dato_tabla(wscierre, "Q", row, da.c_jefeingenieria);

      this.dato_tabla(wscierre, "R", row, da.t194);
      this.dato_tabla(wscierre, "S", row, da.t194_a535);
      this.dato_tabla(wscierre, "T", row, da.t194_a536);
      this.dato_tabla(wscierre, "U", row, da.t194_a537);
      this.dato_tabla(wscierre, "V", row, da.t194_a538);
      this.dato_tabla(wscierre, "W", row, da.t194_a539);

      this.dato_tabla(wscierre, "X", row, da.t196);
      this.dato_tabla(wscierre, "Y", row, da.t196_a540);
      this.dato_tabla(wscierre, "Z", row, da.t196_a541);
      this.dato_tabla(wscierre, "AA", row, da.t195);
      this.dato_tabla(wscierre, "AB", row, da.t195_a542);
      this.dato_tabla(wscierre, "AC", row, da.t195_a543);
      this.dato_tabla(wscierre, "AD", row, da.t195_a544);
      this.dato_tabla(wscierre, "AE", row, da.t195_a545);

      this.dato_tabla(wscierre, "AF", row, da.t197);
      this.dato_tabla(wscierre, "AG", row, da.t197_a546);
      this.dato_tabla(wscierre, "AH", row, da.t198);
      this.dato_tabla(wscierre, "AI", row, da.t198_a547);
      this.dato_tabla(wscierre, "AJ", row, da.t199);
      this.dato_tabla(wscierre, "AK", row, da.t200);
      this.dato_tabla(wscierre, "AL", row, da.t200_a548);
      this.dato_tabla(wscierre, "AM", row, da.t200_a549);
      this.dato_tabla(wscierre, "AN", row, da.t201);
      this.dato_tabla(wscierre, "AO", row, da.t202);
      this.dato_tabla(wscierre, "AP", row, da.t203);
      this.dato_tabla(wscierre, "AQ", row, da.t204);
      this.dato_tabla(wscierre, "AR", row, da.t205);
      this.dato_tabla(wscierre, "AS", row, da.t206);
      this.dato_tabla(wscierre, "AT", row, da.t207);
      this.dato_tabla(wscierre, "AU", row, da.t208);
      this.dato_tabla(wscierre, "AV", row, da.t208_a550);
      this.dato_tabla(wscierre, "AW", row, da.t209);
      this.dato_tabla(wscierre, "AX", row, da.t209_a55);

      for (let i = 1; i <= 50; i++) {
        wscierre.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }

    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Proyectos.xlsx');
    });
  }

  async generaralldataproyecto(proyectos, datosadicionales) {

    let title = 'Datos Generales del Proyecto';

    //

    const workbook = new Workbook();
    const wsgeneral = workbook.addWorksheet('General');

    wsgeneral.getColumn(1).width = 5;
    wsgeneral.getColumn(2).width = 50;
    wsgeneral.getColumn(3).width = 15;
    wsgeneral.getColumn(4).width = 15;
    wsgeneral.getColumn(5).width = 15;
    wsgeneral.getColumn(6).width = 15;
    wsgeneral.getColumn(7).width = 50;
    wsgeneral.getColumn(8).width = 30;
    wsgeneral.getColumn(9).width = 30;
    wsgeneral.getColumn(10).width = 15;
    wsgeneral.getColumn(11).width = 15;

    // 1
    let row = 1;
    wsgeneral.mergeCells('B1:L1');
    wsgeneral.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "B" + row, title, 14, true);
    wsgeneral.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.cabecera_tabla(wsgeneral, "B", row, "Nombre de Proyecto");
    this.cabecera_tabla(wsgeneral, "C", row, "Fase Actual");
    this.cabecera_tabla(wsgeneral, "D", row, "CUI");
    this.cabecera_tabla(wsgeneral, "E", row, "MEM");
    this.cabecera_tabla(wsgeneral, "F", row, "SNIP");
    this.cabecera_tabla(wsgeneral, "G", row, "Objetivo");
    this.cabecera_tabla(wsgeneral, "H", row, "Situación Actual");
    this.cabecera_tabla(wsgeneral, "I", row, "Comentario");
    this.cabecera_tabla(wsgeneral, "J", row, "Latitud");
    this.cabecera_tabla(wsgeneral, "K", row, "Longitud");

    proyectos.forEach(proyecto => {
      row++;
      this.dato_tabla(wsgeneral, "B", row, proyecto.c_nombreproyecto);
      this.dato_tabla(wsgeneral, "C", row, proyecto.c_fase);
      this.dato_tabla(wsgeneral, "D", row, proyecto.c_codigocui);
      this.dato_tabla(wsgeneral, "E", row, proyecto.c_codigomem);
      this.dato_tabla(wsgeneral, "F", row, proyecto.c_codigosnip);
      this.dato_tabla(wsgeneral, "G", row, proyecto.c_objetivoproyecto);
      this.dato_tabla(wsgeneral, "H", row, proyecto.c_situacionactual);
      this.dato_tabla(wsgeneral, "I", row, proyecto.c_comentario);
      this.dato_tabla(wsgeneral, "J", row, proyecto.c_latitud);
      this.dato_tabla(wsgeneral, "K", row, proyecto.c_longitud);
    });

    title = 'ESTUDIO DE PREINVERSION';
    const wsestudipreinvesion = workbook.addWorksheet('ESTUDIO DE PREINVERSION');
    row = 1;
    wsestudipreinvesion.mergeCells('B1:L1');
    wsestudipreinvesion.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsestudipreinvesion, "B" + row, title, 14, true);
    wsestudipreinvesion.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    wsestudipreinvesion.getColumn(1).width = 5;
    wsestudipreinvesion.getColumn(2).width = 15;
    wsestudipreinvesion.getColumn(3).width = 50;
    wsestudipreinvesion.getColumn(4).width = 50;
    wsestudipreinvesion.getColumn(5).width = 50;
    wsestudipreinvesion.getColumn(6).width = 50;

    this.cabecera_tabla(wsestudipreinvesion, "B", row, "MEM");
    this.cabecera_tabla(wsestudipreinvesion, "C", row, "Actividad");
    this.cabecera_tabla(wsestudipreinvesion, "D", row, "Tarea");
    this.cabecera_tabla(wsestudipreinvesion, "E", row, "Datos");
    this.cabecera_tabla(wsestudipreinvesion, "F", row, "Valor");

    const fase1 = datosadicionales.filter(o => o.n_idgen_fase == 1);

    fase1.forEach(da => {

      row++;
      this.dato_tabla(wsestudipreinvesion, "B", row, da.c_codigomem);
      this.dato_tabla(wsestudipreinvesion, "C", row, da.c_actividad);
      this.dato_tabla(wsestudipreinvesion, "D", row, da.c_tarea);
      this.dato_tabla(wsestudipreinvesion, "E", row, da.c_datoadicional);
      this.dato_tabla(wsestudipreinvesion, "F", row, da.c_valordatoadicional);

    });

    title = 'ESTUDIO DEFINITIVO';
    const wsestudio = workbook.addWorksheet('ESTUDIO DEFINITIVO');
    row = 1;
    wsestudio.mergeCells('B1:L1');
    wsestudio.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsestudio, "B" + row, title, 14, true);
    wsestudio.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    wsestudio.getColumn(1).width = 5;
    wsestudio.getColumn(2).width = 15;
    wsestudio.getColumn(3).width = 50;
    wsestudio.getColumn(4).width = 50;
    wsestudio.getColumn(5).width = 50;
    wsestudio.getColumn(6).width = 50;

    this.cabecera_tabla(wsestudio, "B", row, "MEM");
    this.cabecera_tabla(wsestudio, "C", row, "Actividad");
    this.cabecera_tabla(wsestudio, "D", row, "Tarea");
    this.cabecera_tabla(wsestudio, "E", row, "Datos");
    this.cabecera_tabla(wsestudio, "F", row, "Valor");

    const fase2 = datosadicionales.filter(o => o.n_idgen_fase == 2);

    fase2.forEach(da => {

      row++;
      this.dato_tabla(wsestudio, "B", row, da.c_codigomem);
      this.dato_tabla(wsestudio, "C", row, da.c_actividad);
      this.dato_tabla(wsestudio, "D", row, da.c_tarea);
      this.dato_tabla(wsestudio, "E", row, da.c_datoadicional);
      this.dato_tabla(wsestudio, "F", row, da.c_valordatoadicional);

    });

    title = 'EJECUCION';
    const wsejecucion = workbook.addWorksheet('EJECUCION');
    row = 1;
    wsejecucion.mergeCells('B1:L1');
    wsejecucion.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsejecucion, "B" + row, title, 14, true);
    wsejecucion.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    wsejecucion.getColumn(1).width = 5;
    wsejecucion.getColumn(2).width = 15;
    wsejecucion.getColumn(3).width = 50;
    wsejecucion.getColumn(4).width = 50;
    wsejecucion.getColumn(5).width = 50;
    wsejecucion.getColumn(6).width = 50;

    this.cabecera_tabla(wsejecucion, "B", row, "MEM");
    this.cabecera_tabla(wsejecucion, "C", row, "Actividad");
    this.cabecera_tabla(wsejecucion, "D", row, "Tarea");
    this.cabecera_tabla(wsejecucion, "E", row, "Datos");
    this.cabecera_tabla(wsejecucion, "F", row, "Valor");

    const fase3 = datosadicionales.filter(o => o.n_idgen_fase == 3);

    fase3.forEach(da => {

      row++;
      this.dato_tabla(wsejecucion, "B", row, da.c_codigomem);
      this.dato_tabla(wsejecucion, "C", row, da.c_actividad);
      this.dato_tabla(wsejecucion, "D", row, da.c_tarea);
      this.dato_tabla(wsejecucion, "E", row, da.c_datoadicional);
      this.dato_tabla(wsejecucion, "F", row, da.c_valordatoadicional);

    });

    title = 'SUPERVISION';
    const wssupervision = workbook.addWorksheet('SUPERVISION');
    row = 1;
    wssupervision.mergeCells('B1:L1');
    wssupervision.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wssupervision, "B" + row, title, 14, true);
    wssupervision.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    wssupervision.getColumn(1).width = 5;
    wssupervision.getColumn(2).width = 15;
    wssupervision.getColumn(3).width = 50;
    wssupervision.getColumn(4).width = 50;
    wssupervision.getColumn(5).width = 50;
    wssupervision.getColumn(6).width = 50;

    this.cabecera_tabla(wssupervision, "B", row, "MEM");
    this.cabecera_tabla(wssupervision, "C", row, "Actividad");
    this.cabecera_tabla(wssupervision, "D", row, "Tarea");
    this.cabecera_tabla(wssupervision, "E", row, "Datos");
    this.cabecera_tabla(wssupervision, "F", row, "Valor");

    const fase4 = datosadicionales.filter(o => o.n_idgen_fase == 4);

    fase4.forEach(da => {

      row++;
      this.dato_tabla(wssupervision, "B", row, da.c_codigomem);
      this.dato_tabla(wssupervision, "C", row, da.c_actividad);
      this.dato_tabla(wssupervision, "D", row, da.c_tarea);
      this.dato_tabla(wssupervision, "E", row, da.c_datoadicional);
      this.dato_tabla(wssupervision, "F", row, da.c_valordatoadicional);

    });


    title = 'CIERRE';
    const wscierre = workbook.addWorksheet('CIERRE');
    row = 1;
    wscierre.mergeCells('B1:L1');
    wscierre.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wscierre, "B" + row, title, 14, true);
    wscierre.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    wscierre.getColumn(1).width = 5;
    wscierre.getColumn(2).width = 15;
    wscierre.getColumn(3).width = 50;
    wscierre.getColumn(4).width = 50;
    wscierre.getColumn(5).width = 50;
    wscierre.getColumn(6).width = 50;

    this.cabecera_tabla(wscierre, "B", row, "MEM");
    this.cabecera_tabla(wscierre, "C", row, "Actividad");
    this.cabecera_tabla(wscierre, "D", row, "Tarea");
    this.cabecera_tabla(wscierre, "E", row, "Datos");
    this.cabecera_tabla(wscierre, "F", row, "Valor");

    const fase5 = datosadicionales.filter(o => o.n_idgen_fase == 5);

    fase5.forEach(da => {

      row++;
      this.dato_tabla(wscierre, "B", row, da.c_codigomem);
      this.dato_tabla(wscierre, "C", row, da.c_actividad);
      this.dato_tabla(wscierre, "D", row, da.c_tarea);
      this.dato_tabla(wscierre, "E", row, da.c_datoadicional);
      this.dato_tabla(wscierre, "F", row, da.c_valordatoadicional);

    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Proyectos.xlsx');
    });
  }
  async generargrilla(proyectos) {

    let title = 'Datos de la grilla';

    //

    const workbook = new Workbook();
    const wsgeneral = workbook.addWorksheet('General');

    wsgeneral.getColumn(1).width = 5;
    wsgeneral.getColumn(2).width = 75;
    wsgeneral.getColumn(3).width = 15;
    wsgeneral.getColumn(4).width = 15;
    wsgeneral.getColumn(5).width = 25;
    wsgeneral.getColumn(6).width = 25;
    wsgeneral.getColumn(7).width = 25;
    wsgeneral.getColumn(8).width = 10;


    // 1
    let row = 1;
    wsgeneral.mergeCells('B1:L1');
    wsgeneral.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "B" + row, title, 14, true);
    wsgeneral.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.cabecera_tabla(wsgeneral, "B", row, "Nombre de Proyecto");
    this.cabecera_tabla(wsgeneral, "C", row, "CUI");
    this.cabecera_tabla(wsgeneral, "D", row, "MEM");
    this.cabecera_tabla(wsgeneral, "E", row, "Población Beneficiaria");
    this.cabecera_tabla(wsgeneral, "F", row, "Total de Abonados");
    this.cabecera_tabla(wsgeneral, "G", row, "Fase Actual");
    this.cabecera_tabla(wsgeneral, "H", row, "Orden");

    proyectos.forEach(proyecto => {
      row++;
      this.dato_tabla(wsgeneral, "B", row, proyecto.c_nombreproyecto);
      this.dato_tabla(wsgeneral, "C", row, proyecto.c_codigocui);
      this.dato_tabla(wsgeneral, "D", row, proyecto.c_codigomem);
      this.dato_tabla(wsgeneral, "E", row, proyecto.nro_beneficiarios);
      this.dato_tabla(wsgeneral, "F", row, proyecto.nro_usuarios);
      this.dato_tabla(wsgeneral, "G", row, proyecto.c_fase);
      this.dato_tabla(wsgeneral, "H", row, proyecto.n_orden);
    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Grilla.xlsx');
    });
  }

  cabecera_tabla = (worksheet, letra, row, valor) => {
    this.setdatogeneral(worksheet, letra + row, valor, 14, true);
    worksheet.getCell(letra + row).font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: false,
      bold: true
    };
  }

  dato_tabla = (worksheet, letra, row, valor) => {
    this.setdatogeneral(worksheet, letra + row, valor, 14, true);
    worksheet.getCell(letra + row).font = {
      name: 'ARIAL',
      family: 4,
      size: 9,
      underline: false,
      bold: false
    };
  }


  async generarSupervision(proyecto, valorizacioncontractual, presupuestoobra, avanceperealeje, valmayoresmetrados,
    valpartidasadicionales, ampliacionPlazo, garantias) {

    const title = 'FICHA DE CONTROL DE SERVICIO DE SUPERVISIÓN';

    // Arreglo para Presupuesto de Supervisión Aprovados
    const presupuestoObra = presupuestoobra;
    const countPresupuestoObra = presupuestoObra.length;
    const totalAdicional_PreObra = parseFloat(presupuestoObra.reduce((acum, valPreObra) => valPreObra.presu_adicional + acum, 0).toFixed(2));
    const totalDeductivo_PreObra = 0;

    // Arreglo de Adelanto de Plazo
    const adelPlazo = ampliacionPlazo;
    const countAdelPlazo = adelPlazo.length;
    const totalPlatoEjecucion = adelPlazo.reduce((acum, value) => value.plazo_otorgado + acum, 0);

    // DATOS AVANCE
    // AVANCE PROGRAMADO VS REAL EJECUTADO
    const avanceProgramaoVsRealEjecutado = avanceperealeje;
    const countArrAPVRE = avanceProgramaoVsRealEjecutado.length;
    const tatalMensualProg = parseFloat(avanceProgramaoVsRealEjecutado.reduce((acum, val) => val.mensual_prog + acum, 0).toFixed(2));
    const arrAcumContractual = (avanceProgramaoVsRealEjecutado.map(value => value.n_acumuladocontractual));
    const maxAcumContractual = Math.max(...arrAcumContractual);

    let programadoAcumYPor: any = [];
    let variable = 0;
    let acum, porcen = 0;
    for (let i = 0; i < countArrAPVRE; i++) {
      let mensual = parseFloat(avanceperealeje[i].mensual_prog);
      acum = (mensual + variable);
      porcen = parseFloat(((acum / tatalMensualProg) * 100).toFixed(2));
      programadoAcumYPor.push({ mensual, acum, porcen })
      variable = acum;
    }

    // ARREGLO VALORIZACIÓN CONTRACTUAL
    const valContractual = valorizacioncontractual;
    const countContraste = valContractual.length;
    const totalValBruta_valC = parseFloat(valContractual.reduce((acum, valC) => valC.val_bruta + acum, 0).toFixed(2));
    const totalReajuste_valC = parseFloat(valContractual.reduce((acum, valC) => valC.reajuste + acum, 0).toFixed(2));
    const totalDeduccion_valC = parseFloat(valContractual.reduce((acum, valC) => valC.deduccion + acum, 0).toFixed(2));
    const totalAdDirecto_valC = parseFloat(valContractual.reduce((acum, valC) => valC.amor_adel_direc + acum, 0).toFixed(2));
    const totalValNeta_valC = parseFloat(valContractual.reduce((acum, valC) => valC.val_neta + acum, 0).toFixed(2));
    const totalIGV_valC = parseFloat(valContractual.reduce((acum, valC) => valC.igv + acum, 0).toFixed(2));
    const tatalTotal_valC = parseFloat(valContractual.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));

    // ARREGLO VALORIZACIÓN POR MAYOR PRESTACIÓN
    const valoMetrados = valmayoresmetrados;
    const countValMetrados = valoMetrados.length;
    const totalValBruta = parseFloat(valoMetrados.reduce((acum, valC) => valC.valorizaicon_bruta + acum, 0).toFixed(2));
    const totalReajuste = parseFloat(valoMetrados.reduce((acum, valC) => valC.reajuste + acum, 0).toFixed(2));
    const totalDeduccion = parseFloat(valoMetrados.reduce((acum, valC) => valC.deduccion + acum, 0).toFixed(2));
    const totalDirecto = parseFloat(valoMetrados.reduce((acum, valC) => valC.amor_directo + acum, 0).toFixed(2));
    const totalValNeta = parseFloat(valoMetrados.reduce((acum, valC) => valC.valorizacion_neta + acum, 0).toFixed(2));
    const totalIGV = parseFloat(valoMetrados.reduce((acum, valC) => valC.igv + acum, 0).toFixed(2));
    const totalTotal = parseFloat(valoMetrados.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));

    // ARREGLO VALORIZACIÓN POR PRESTACIÓN ADICIONAL
    const valoresAdicionales = valpartidasadicionales;
    const countAdicionales = valoresAdicionales.length;
    const totalValBrutaAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.valorizaicon_bruta + acum, 0).toFixed(2));
    const totalReajusteAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.reajuste + acum, 0).toFixed(2));
    const totalDeduccionAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.deduccion + acum, 0).toFixed(2));
    const totalDirectoAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.amor_directo + acum, 0).toFixed(2));
    const totalValNetaAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.valorizacion_neta + acum, 0).toFixed(2));
    const totalIGVAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.igv + acum, 0).toFixed(2));
    const totalTotalAD = parseFloat(valoresAdicionales.reduce((acum, valC) => valC.total + acum, 0).toFixed(2));

    // GARANTÍAS

    const arrGarantiasFC = garantias.filter(({ fase, tipocarta }) => (fase === 'SUPERVISION') && (tipocarta === 'FIEL CUMPLIMIENTO'));
    const countArrFielCum = arrGarantiasFC.length;
    const arrGarantiasAdelantoD = garantias.filter(({ fase, tipocarta }) => (fase === 'SUPERVISION') && (tipocarta === 'ADELANTO DIRECTO'));;
    const countAdelantoD = arrGarantiasAdelantoD.length;

    // Crear fecha y sacar el valor del año y mes
    const year = new Date().getFullYear();
    // Creamos un arreglo de meses
    const valueMonths = [{ id: 0, name: 'ENERO' }, { id: 1, name: 'FEBRERO' }, { id: 2, name: 'MARZO' }, { id: 3, name: 'ABRIL' }
      , { id: 4, name: 'MAYO' }, { id: 5, name: 'JUNIO' }, { id: 6, name: 'JULIO' }, { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETIEMBRE' },
    { id: 9, name: 'OCTUBRE' }, { id: 10, name: 'NOVIEMBRE' }, { id: 11, name: 'DICIEMBRE' }]
    const numberMoth = new Date().getMonth();
    const nameMonth = valueMonths.find(({ id }) => id === numberMoth).name;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Supervision');

    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 17;
    worksheet.getColumn(6).width = 43;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 15;
    worksheet.getColumn(10).width = 17;
    worksheet.getColumn(11).width = 15;
    worksheet.getColumn(12).width = 17;
    worksheet.getColumn(13).width = 30;
    worksheet.getColumn(14).width = 20;

    worksheet.getRow(74).height = 30;

    // 1
    let row = 1;
    worksheet.mergeCells('B1:L1');
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, title, 14, true);
    worksheet.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    // 2
    row += 1;
    worksheet.mergeCells("B" + row + ":L" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, `INFORMACIÓN A: ${nameMonth} ${year}`, 11, false);

    // 3
    row += 1;
    this.setdatogeneral(worksheet, "B" + row, "DATOS DEL PROYECTO", 9, true);
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 4
    row += 1;
    worksheet.getRow(row).height = 30;
    worksheet.mergeCells("B" + row + ":E" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, "B" + row, 'NOMBRE', 10, true, 'f7f0b3');
    worksheet.getCell("B" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' }, // thin(linea solida), double(doble linea)
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.mergeCells("F" + row + ":N" + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, "F" + row, proyecto.c_nombreproyecto, 10, true, 'ffeb3b');
    worksheet.getCell("F" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' }, // thin(linea solida), double(doble linea)
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // 5
    row += 1;
    worksheet.mergeCells("B" + row + ":N" + row);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    }

    // 6
    row += 1;
    worksheet.mergeCells("B" + row + ":F" + row);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    }
    worksheet.mergeCells("G" + row + ":N" + row);
    this.setdatogeneral(worksheet, 'G' + row, 'UBICACIÓN', 10, true);
    worksheet.getCell("G" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' },
    }

    // 7
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   PROCESO DE SELECCIÓN', 10, true);
    worksheet.getCell("B" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_procesoseleccion, 10, false);
    worksheet.mergeCells('G' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'DISTRITO (S): ' + proyecto.c_distritos, 10, true);
    worksheet.getCell("N" + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 8
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ENTIDAD CONTRATANTE', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   MEM/DGER', 10, false);
    worksheet.mergeCells('G' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'PROVINCIA (S): ' + proyecto.c_provincias, 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 9
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   VALOR REFERENCIAL', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   S/. ' + proyecto.c_valorreferencial, 10, false);
    worksheet.mergeCells('G' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'DEPARTAMENTO DE ' + proyecto.c_departamento, 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 10
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   VALOR OFERTADO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   S/. ' + proyecto.c_valorofertado, 10, false);
    worksheet.mergeCells('G' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'G' + row, 'META :', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 11
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   % DEL V.R. OFERTADO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + ((proyecto.c_valorofertado / proyecto.c_valorreferencial) * 100).toFixed(2) + '%', 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   N° LOCALIDADES BENEFICIADAS', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_nrolocalidades, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'L' + row, 'Localidades', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 12
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   SISTEMA DE CONTRATACIÓN', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_siscontratacion, 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   N° POBLACIÓN BENEFICIADA', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_nropoblacion, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'L' + row, 'Habitantes', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 13
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   INGº COORD. DE OBRA DEP/MEM', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   INGº ' + proyecto.c_coordobra, 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   N° DE CONEXCIONES', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_conexiones, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'L' + row, 'Conexiones', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 14
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   INGº COORD. DE OBRA DEP/MEM', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':J' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   LONGITUD DE LINEA', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'K' + row, proyecto.c_longlinea, 10, false);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("K" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('L' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'L' + row, 'km', 9, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // 16
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "DATOS DEL CONTRATO DE CONSULTORÍA", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 17
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   CONTRATISTA', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('F' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'G' + row, proyecto.c_suscripcontratoes, 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    // 18
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   REPRESENTANTE LEGAL', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_relegales, 10, false);
    worksheet.mergeCells('G' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   CONTRATO DETALLADO', 10, true);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   ADELANTOS', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // Formularemos el costo directo, ggutilidades, subtotal, igb18% y total
    const total = parseFloat(proyecto.c_valorofertado);
    const ggutilidades = parseFloat(proyecto.c_ggutilidades);
    const subtotal = total / 1.18;
    const costodirecto = subtotal - ggutilidades;
    const igv = subtotal * 0.18;

    // 19
    worksheet.getColumn(9).width = 15;
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   JEFE SUPERVISIÓN', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   Ing. ' + proyecto.c_gerentesuperes, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   COSTO DIRECTO', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, costodirecto.toFixed(2) + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   Adelanto Directo S/ (Costo Directo)', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'N' + row, parseFloat((proyecto.c_montoadelantodirecto / 1.18).toFixed(2)), 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 20
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   N° DE CONTRATO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_nrocontratoes, 10, true);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   GG Y UTILIDADES', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, proyecto.c_ggutilidades + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, ' ', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 21
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   SUSCRIPCION DEL CONTRATO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_fechsubcontrato, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   SUB TOTAL', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, subtotal.toFixed(2) + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':N' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   N° AMPLIACIONES DE PLAZO', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    //
    //
    // AMPLIACIÓN PLAZO
    //
    //
    //
    let rowVar2 = row;

    for (let i = 0; i < 5; i++) {
      let Arr = adelPlazo[i];
      rowVar2 += 1;
      if (i < (countAdelPlazo)) {
        worksheet.mergeCells('L' + rowVar2 + ':M' + rowVar2);
        this.setdatogeneral(worksheet, 'L' + rowVar2, '   ' + 'Ampliación de Plazo N° 0' + (i + 1), 10, false);
        worksheet.getCell("L" + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("N" + rowVar2).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        this.setdatogeneral(worksheet, 'N' + rowVar2, Arr.plazo_otorgado, 10, false);
        worksheet.getCell('N' + rowVar2).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('N' + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        };
      } else {
        worksheet.mergeCells('L' + rowVar2 + ':M' + rowVar2);
        this.setdatogeneral(worksheet, 'L' + rowVar2, '   Ampliación de Plazo N° 0' + (i + 1), 10, false);
        worksheet.getCell("L" + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("N" + rowVar2).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        this.setdatogeneral(worksheet, 'N' + rowVar2, 0, 10, false);
        worksheet.getCell('N' + rowVar2).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('N' + rowVar2).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        };
      }
    }

    // 22
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, '', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   IGV 18%', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, igv.toFixed(2) + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 23
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, false);
    worksheet.getCell('B' + row).alignment = { horizontal: 'justify' };
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + ' ', 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   TOTAL', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, total.toFixed(2) + '  ', 10, true);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 24
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ENTREGA DEL ADELANTO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_entreadelanto, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   ', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, '' + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 25
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ENTREGA DE TERRENO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_terreno, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   MAYOR PRESTACIÓN - ADICIONAL (INCL. IGV)', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    const mayorAdic1 = countPresupuestoObra > 0 ? presupuestoObra[0].presu_adicional : 0;
    // 
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, mayorAdic1 + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 26
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   INICIO DE PRESTACIÓN DE SERVICIO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_inicioobratarea, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   MAYOR PRESTACIÓN - ADICIONAL (INCL. IGV)', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    const mayorAdic2 = countPresupuestoObra > 1 ? presupuestoObra[1].presu_adicional : 0;
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, mayorAdic2 + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    // 27
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   PLAZO DE SERVICIO (DÍAS)', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + proyecto.c_plazoejecdias, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '  MAYOR PRESTACIÓN - ADICIONAL (INCL. IGV)', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    const mayorAdic3 = countPresupuestoObra > 2 ? presupuestoObra[2].presu_adicional : 0;
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, mayorAdic3 + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   PLAZO TOTAL DE EJECUCIÓN', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'N' + row, totalPlatoEjecucion, 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    let arrFecha = proyecto.c_inicioobratarea.split('/');
    let fecha = new Date(arrFecha[1] + '/' + arrFecha[0] + '/' + arrFecha[2]);
    console.log('Fecha Convertida');
    console.log(fecha);
    fecha.setDate(fecha.getDate() + parseInt(proyecto.c_plazoejecdias));
    const dateText = fecha.getDate() + '/' +
      (fecha.getMonth() + 1) + '/' + fecha.getFullYear();

    let fechaNuevoTermino = new Date();
    fechaNuevoTermino = fecha; //--important
    fechaNuevoTermino.setDate(fecha.getDate() + parseInt(totalPlatoEjecucion) - 1);
    const dateTextNuevoTermino = fechaNuevoTermino.getDate() + '/' +
      (fechaNuevoTermino.getMonth() + 1) + '/' + fechaNuevoTermino.getFullYear();

    // 28
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   TÉRMINO DE OBRA', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'E' + row, ':', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + dateText, 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   MAYOR PRESTACIÓN - ADICIONAL (INCL. IGV)', 10, false);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    const mayorAdic4 = countPresupuestoObra > 3 ? presupuestoObra[3].presu_adicional : 0;
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, mayorAdic4 + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   NUEVO TÉRMINO', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    this.setdatogeneral(worksheet, 'N' + row, '' + dateTextNuevoTermino, 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      right: { style: 'thin' }
    };

    // 29
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '   ', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'E' + row, '', 10, true);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'F' + row, '   ' + '', 10, false);
    worksheet.mergeCells('G' + row + ':I' + row);
    this.setdatogeneral(worksheet, 'G' + row, '   PRESUPUESTO VIGENTE INCL. IGV', 10, true);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    this.setdatogeneral(worksheet, 'J' + row, (total + totalAdicional_PreObra).toFixed(2) + '  ', 10, false);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('L' + row + ':M' + row);
    this.setdatogeneral(worksheet, 'L' + row, '   ', 10, false);
    worksheet.getCell("L" + row).border = {
      bottom: { style: 'thin' },
    }
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    this.setdatogeneral(worksheet, 'N' + row, '', 10, false);
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N' + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // ----------------------------------------------------------- 
    // PRESUPUESTO DE OBRA APROVADOS
    // -----------------------------------------------------------

    // 31
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "PRESUPUESTO DE SUPERVISIÓN APROBADOS", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 49
    row += 1;
    worksheet.mergeCells('B' + row + ':N' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'PRESUPUESTO POR MAYORES METRADOS Y PARTIDAS NUEVAS', 10, true);
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };
    worksheet.getCell("N" + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // 50
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'Nº R.M.', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    //worksheet.mergeCells('E' + row + ':F' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'FECHA', 10, true);
    worksheet.getCell("E" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    //worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'ADICIONAL', 10, true);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCTIVO', 10, true);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    worksheet.mergeCells('I' + row + ':J' + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'MONTO APROBADO', 10, true);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('K' + row + ':L' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, '(%) INCIDENCIA', 10, true);
    worksheet.getCell("K" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'TIPO ADICIONAL', 10, true);
    worksheet.getCell("M" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    let totalPorcentajePresupuestoObra = 0;
    // 51
    for (let i = 0; i < countPresupuestoObra; i++) {
      const adicional = parseFloat(presupuestoObra[i].presu_adicional);
      const deductivo = 0;
      const incidencia = (((adicional - deductivo) / total) * 100).toFixed(2);
      totalPorcentajePresupuestoObra += parseFloat(incidencia);
      row += 1;
      if (i !== (countPresupuestoObra - 1)) {
        worksheet.mergeCells('B' + row + ':D' + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, presupuestoObra[i].nro_rm, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        //worksheet.mergeCells('E' + row + ':F' + row);
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, presupuestoObra[i].fecha_solicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }
        //worksheet.mergeCells('G' + row + ':H' + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, presupuestoObra[i].presu_adicional, 10, false);
        worksheet.getCell("F" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }

        worksheet.mergeCells('G' + row + ':H' + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, 0, 10, false);
        worksheet.getCell("G" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }

        worksheet.mergeCells('I' + row + ':J' + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, presupuestoObra[i].presu_adicional, 10, false);
        worksheet.getCell("I" + row).border = {
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
          right: { style: 'thin' }
        }
        worksheet.mergeCells('K' + row + ':L' + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, incidencia + '%', 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells('M' + row + ':N' + row);
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, presupuestoObra[i].tipo_adicional, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
      } else {
        worksheet.mergeCells('B' + row + ':D' + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, presupuestoObra[i].nro_rm, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        //worksheet.mergeCells('E' + row + ':F' + row);
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, presupuestoObra[i].fecha_solicitud, 10, false);
        worksheet.getCell("E" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }

        //worksheet.mergeCells('E' + row + ':F' + row);
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, presupuestoObra[i].presu_adicional, 10, false);
        worksheet.getCell("F" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.mergeCells('G' + row + ':H' + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, 0, 10, false);
        worksheet.getCell("G" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.mergeCells('I' + row + ':J' + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, presupuestoObra[i].presu_adicional, 10, false);
        worksheet.getCell("I" + row).border = {
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.mergeCells('K' + row + ':L' + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, incidencia + '%', 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells('M' + row + ':N' + row);
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, presupuestoObra[i].tipo_adicional, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    }

    //
    row += 1;
    worksheet.mergeCells('B' + row + ':E' + row);
    this.setdatogeneral(worksheet, 'B' + row, 'Sub total', 10, true);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    //worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalAdicional_PreObra, 10, true);
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    worksheet.mergeCells('G' + row + ':H' + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalDeductivo_PreObra, 10, true);
    worksheet.getCell("G" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('I' + row + ':J' + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalAdicional_PreObra, 10, true);
    worksheet.getCell("I" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('K' + row + ':L' + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalPorcentajePresupuestoObra + '%', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, '', 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // 55 - 54
    const totalMontoContrato = total + totalAdicional_PreObra - totalDeductivo_PreObra;
    const totalMontoVigente = (totalMontoContrato / 1.18);

    row += 1;
    worksheet.mergeCells('F' + row + ':H' + row);
    this.setdatogeneral(worksheet, 'F' + row, 'MONTO DEL CONTRATO VIGENTE', 10, true);
    worksheet.getCell('F' + row).font = { color: { argb: '0000FF' }, bold: true };
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' },
      left: { style: 'thin' },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'I' + row, totalMontoVigente.toFixed(2), 10, true);
    worksheet.getCell('I' + row).font = { color: { argb: '0000FF' }, bold: true };
    worksheet.getCell("I" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'right' };
    this.setdatogeneral(worksheet, 'J' + row, totalMontoContrato, 10, true);
    worksheet.getCell('J' + row).font = { color: { argb: '0000FF' }, bold: true };
    worksheet.getCell("J" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    row += 1;
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'SIN IGV', 10, true);
    worksheet.getCell("I" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'CON IGV', 10, true);
    worksheet.getCell("J" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // 
    //  DATOS DE AVANCE
    // 
    // 
    // 
    row += 1;
    this.setdatogeneral(worksheet, "B" + row, "DATOS DE AVANCE", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 72
    row += 2;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'PERIODO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    }
    worksheet.mergeCells('C' + row + ':N' + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'AVANCE PROGRAMADO VS. REAL EJECUTADO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    // 73
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    }
    worksheet.mergeCells('C' + row + ':E' + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'PROGRAMADO', 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('F' + row + ':L' + row);
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAL EJECUTADO', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'AVANCE', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
    }

    // 74
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('C' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'MENSUAL', 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('D' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'ACUMULADO', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, '%', 10, true, 'a5b0ec');
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'EJECUTADO CONTRACTUAL', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'EJECUTADO MAYOR PRESTACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'EJECUTADO PRESTACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'EJECUTADO TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'MONTO ACUMULADO', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, '%', 10, true, 'a5b0ec');
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'distributed', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, '%', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    let sumaAcumPA = 0;
    let ejecutadoMayorPrestacion = 0;
    let ejecutadoPrestacion = 0;
    let totalEjecutadoTotal = 0;
    let montoAcumuladoRealEje = 0;

    let totalAcumuladoContractual = 0;

    for (let i = 0; i < countArrAPVRE; i++) {
      const Arr = avanceProgramaoVsRealEjecutado[i];

      totalAcumuladoContractual += Arr.n_acumuladocontractual;

      let auxAcum = (Arr.n_acumuladocontractual + Arr.n_acumuladomayormetrado + Arr.n_acumuladopartidaacional);
      sumaAcumPA += auxAcum;
      let avance = isNaN(parseFloat(((auxAcum / parseFloat(Arr.mensual_prog)) * 100).toFixed(2))) ? 0 : parseFloat(((auxAcum / parseFloat(Arr.mensual_prog)) * 100).toFixed(2));
      const Arr2 = programadoAcumYPor[i];
      let porcentaje = ((auxAcum / tatalMensualProg) * 100).toFixed(2);

      ejecutadoMayorPrestacion += Arr.n_acumuladomayormetrado;
      ejecutadoPrestacion += Arr.n_acumuladopartidaacional;
      totalEjecutadoTotal += auxAcum;
      if (auxAcum === 0) {
        sumaAcumPA = 0;
      }
      row += 1;
      if (i !== (countArrAPVRE - 1)) {
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, ' ' + Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.mensual_prog, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr2.acum, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr2.porcen * 0.01, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("E" + row).numFmt = '0.00%';

        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.n_acumuladocontractual, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.n_acumuladomayormetrado, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.n_acumuladopartidaacional, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, auxAcum, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, sumaAcumPA, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, parseFloat(porcentaje) * 0.01, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("L" + row).numFmt = '0.00%';

        worksheet.mergeCells('M' + row + ':N' + row);
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, avance * 0.01, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell("M" + row).numFmt = '0.00%';
      }
      else {
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, ' ' + Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'C' + row, Arr.mensual_prog, 10, false);
        worksheet.getCell("C" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr2.acum, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, Arr2.porcen * 0.01, 10, false);
        worksheet.getCell("E" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell("E" + row).numFmt = '0.00%';

        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.n_acumuladocontractual, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.n_acumuladomayormetrado, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.n_acumuladopartidaacional, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, auxAcum, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, sumaAcumPA, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, parseFloat(porcentaje) * 0.01, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell("L" + row).numFmt = '0.00%';

        worksheet.mergeCells('M' + row + ':N' + row);
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, avance * 0.01, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell("M" + row).numFmt = '0.00%';
      }
    }

    row += 1;
    worksheet.mergeCells("C" + row + ":D" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, tatalMensualProg, 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("E" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalAcumuladoContractual, 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ejecutadoMayorPrestacion, 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ejecutadoPrestacion, 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, totalEjecutadoTotal, 10, true, 'a5b0ec');
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('M' + row + ':N' + row);
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ' + ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    //FILA ADICIONAL

    /*row += 2;
    this.setdatogeneral(worksheet, "B" + row, "CURVA \"S\"", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    for (let i = 1; i <= 30; i++) {
      row += 1;

      if (i == 1) {
        for (let x = 2; x <= 11; x++) {
          if (x == 2) {
            worksheet.getRow(row).getCell(x).border = {
              left: { style: 'thin' },
              //right: { style: 'thin' },
              top: { style: 'thin' },
              //bottom: { style: 'thin' },
            }
          }

          if (x >= 3 && x <= 10) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              //right: { style: 'thin' },
              top: { style: 'thin' },
              //bottom: { style: 'thin' },
            }
          }

          if (x == 11) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              right: { style: 'thin' },
              top: { style: 'thin' },
              //bottom: { style: 'thin' },
            }
          }
        }
      }

      if (i >= 2 && i <= 29) {
        worksheet.getRow(row).getCell(2).border = {
          left: { style: 'thin' },
          //right: { style: 'thin' },
          //top: { style: 'thin' },
          //bottom: { style: 'thin' },
        }

        worksheet.getRow(row).getCell(11).border = {
          //left: { style: 'thin' },
          right: { style: 'thin' },
          //top: { style: 'thin' },
          //bottom: { style: 'thin' },
        }

        if (i == 10) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Resumen', 10, true);
        }

        if (i == 12) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado programado', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 13) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado ejecutado', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 14) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado programado (%)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 15) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance acumulado ejecutado (%)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 16) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'Avance del proyecto', 10, true, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 17) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'SPI >= 1 (Costo inferior al presupuestado)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

        if (i == 18) {
          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'M' + row, 'SPI < 1 (Sobre costo respecto al trabajo completado)', 10, false, 'f7f0b3');
          worksheet.getCell("M" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'left' };
          this.setdatogeneral(worksheet, 'N' + row, '', 10, false, 'f7f0b3');
          worksheet.getCell("N" + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' }
          }
        }

      }

      if (i == 30) {
        for (let x = 2; x <= 11; x++) {
          if (x == 2) {
            worksheet.getRow(row).getCell(x).border = {
              left: { style: 'thin' },
              //right: { style: 'thin' },
              //top: { style: 'thin' },
              bottom: { style: 'thin' },
            }
          }

          if (x >= 3 && x <= 10) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              //right: { style: 'thin' },
              //top: { style: 'thin' },
              bottom: { style: 'thin' },
            }
          }

          if (x == 11) {
            worksheet.getRow(row).getCell(x).border = {
              //left: { style: 'thin' },
              right: { style: 'thin' },
              //top: { style: 'thin' },
              bottom: { style: 'thin' },
            }
          }
        }
      }
    }*/

    // ------------------------------------------------------------------------------
    // CONTRASTE DE  VALORACIZACIÓN - VALORIZACIÓN CONTRACTUAL
    // ------------------------------------------------------------------------------


    // 82
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "VALORIZACIÓN CONTRACTUAL", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 83
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'MES-AÑO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 84
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countContraste; i++) {
      row += 1;
      if (i !== (countContraste - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, valContractual[i].mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, valContractual[i].val_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, valContractual[i].reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, valContractual[i].deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, valContractual[i].amor_adel_direc, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, valContractual[i].val_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, valContractual[i].igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, valContractual[i].total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, valContractual[i].mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, valContractual[i].val_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, valContractual[i].reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, valContractual[i].deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, valContractual[i].amor_adel_direc, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, valContractual[i].val_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, valContractual[i].igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, valContractual[i].total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL PAGADO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, totalValBruta_valC, 10, true);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalReajuste_valC, 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalDeduccion_valC, 10, true);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalAdDirecto_valC, 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNeta_valC, 10, true);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGV_valC, 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, tatalTotal_valC, 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -----------------------------------------------------------------------------
    // VALORIZACIÓN POR MAYOR PRESTACIÓN
    // ------------------------------------------------------------------------------

    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "VALORIZACIÓN MAYORES METRADOS", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 91
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'MES-AÑO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 92
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countValMetrados; i++) {
      let Arr = valoMetrados[i];
      row += 1;
      if (i !== (countValMetrados - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL PAGADO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, totalValBruta, 10, true);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalReajuste, 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalDeduccion, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalDirecto, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNeta, 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGV, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, totalTotal, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // --------------------------------------------------------------
    // VALORIZACIÓN POR PRESTACIÓN ADICIONAL
    // -------------------------------------------------------------
    // 98
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "VALORIZACIÓN PARTIDAS ADICIONALES", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 99
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'MES-AÑO', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 100
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    for (let i = 0; i < countAdicionales; i++) {
      let Arr = valoresAdicionales[i];
      row += 1;
      if (i !== (countAdicionales - 1)) {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
        }
      } else {
        worksheet.mergeCells("B" + row + ":C" + row);
        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, Arr.mes_anio, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("D" + row + ":E" + row);
        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, Arr.valorizaicon_bruta, 10, false);
        worksheet.getCell("D" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, Arr.reajuste, 10, false);
        worksheet.getCell("F" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("G" + row + ":H" + row);
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, Arr.deduccion, 10, false);
        worksheet.getCell("G" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.mergeCells("I" + row + ":J" + row);
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.amor_directo, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells("K" + row + ":L" + row);
        worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'K' + row, Arr.valorizacion_neta, 10, false);
        worksheet.getCell("K" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.igv, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, Arr.total, 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' }
        }
      }
    }

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL PAGADO', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, totalValBrutaAD, 10, true);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, totalReajusteAD, 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalDeduccionAD, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalDirectoAD, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNetaAD, 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGVAD, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, totalTotalAD, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -----------------------------------------------------------------------------
    // RESUMEN DE VALORIZACIONES
    // -----------------------------------------------------------------------------

    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "RESUMEN DE VALORIZACIONES", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 107
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'DESCRIPCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'VALORIZACIÓN BRUTA', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'REAJUSTE', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'DEDUCCIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIÓN', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'VALORIZACIÓN NETA', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'IGV', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 108
    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // 109
    const valBruta_resumen = totalValBruta_valC + totalValBruta + totalValBrutaAD;
    const reajuste_resumen = totalReajuste_valC + totalReajuste + totalReajusteAD;
    const deduccion_resumen = totalDeduccion_valC + totalDeduccion + totalDeduccionAD;
    const totalDirecto_resumen = totalAdDirecto_valC + totalDirecto + totalDirectoAD;
    const totalValNeta_resumen = totalValNeta_valC + totalValNeta + totalValNetaAD;
    const totalIGV_resumen = totalIGV_valC + totalIGV + totalIGVAD;
    const totaltotal_resumen = tatalTotal_valC + totalTotal + totalTotalAD;

    row += 1;
    worksheet.mergeCells("B" + row + ":C" + row);
    this.setdatogeneral(worksheet, 'B' + row, '  TOTAL', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("D" + row + ":E" + row);
    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, valBruta_resumen, 10, false);
    worksheet.getCell("D" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, reajuste_resumen, 10, false);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, deduccion_resumen, 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, totalDirecto_resumen, 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, totalValNeta_resumen, 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, totalIGV_resumen, 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, totaltotal_resumen, 10, false);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -----------------------------------------------------------------------------
    // Avance económico
    // -----------------------------------------------------------------------------

    //
    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "AVANCE ECONÓMICO", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 112
    row += 1;
    worksheet.mergeCells("B" + row + ":H" + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'PAGOS EFECTUADOS', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AMORTIZACIONES', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":M" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'SALDO', 10, true, 'a5b0ec');
    worksheet.getCell('K' + row).font = { color: { argb: 'FF0000' }, bold: true };
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'SALDO POR PAGAR', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' }
    }

    // 113
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("C" + row + ":E" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'VALORIZ', 10, true, 'a5b0ec');
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, 'TOTAL', 10, true, 'a5b0ec');
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, 'AD. DIRECTO', 10, true, 'a5b0ec');
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'POR VALORIZAR', 10, true, 'a5b0ec');
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true, 'a5b0ec');
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // COSTO DIRECTO
    const adDirectoPE = parseFloat((proyecto.c_montoadelantodirecto / 1.18).toFixed(2));
    const valoriz = totalValNeta_valC + totalValNeta + totalValNetaAD;
    const totalPE = adDirectoPE + valoriz;
    const adDirectoAM = totalAdDirecto_valC + totalDirecto + totalDirectoAD;
    const adDirectoSal = adDirectoPE - adDirectoAM;
    const porValorizar = totalMontoVigente - valBruta_resumen;
    const saldoPorPagar = porValorizar - adDirectoSal;

    // CON IGV
    const adDirectoPE_igv = parseFloat((proyecto.c_montoadelantodirecto));
    const valoriz_igv = valoriz * 1.18;
    const totalPE_igv = adDirectoPE_igv + valoriz_igv;
    const adDirectoAM_igv = adDirectoAM * 1.18;
    const adDirectoSal_igv = (adDirectoPE_igv - adDirectoAM_igv);
    const porValorizar_igv = porValorizar * 1.18;
    const saldoPorPagar_igv = porValorizar_igv - adDirectoSal_igv;

    // total
    // k29 = total - // k55 = totalMontoContrato
    // N20 = parseFloat((proyecto.c_montoadelantodirecto / 1.18).toFixed(2))
    // j29 = (total + totalAdicional_PreObra).toFixed(2)
    const adDirectoPET = ((adDirectoPE_igv / proyecto.c_montoadelantodirecto) * 100).toFixed(2);
    const valorizPET = ((valoriz_igv / totalMontoContrato) * 100).toFixed(2);
    const totalPET = ((totalPE_igv / (total + totalAdicional_PreObra)) * 100).toFixed(2);
    const adDirectoAMT = ((adDirectoAM_igv / adDirectoPE_igv) * 100).toFixed(2);
    const adDirectoSalT = ((adDirectoSal_igv / adDirectoPE_igv) * 100).toFixed(2);
    const porValorizarT = ((porValorizar_igv / totalMontoContrato) * 100).toFixed(2);
    const saldoPorPagarT = ((saldoPorPagar_igv / (total + totalAdicional_PreObra)) * 100).toFixed(2);

    //
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'Costo Directo', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("C" + row + ":E" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, adDirectoPE.toFixed(2), 10, false);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, valoriz.toFixed(2), 10, false);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalPE.toFixed(2), 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, adDirectoAM.toFixed(2), 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adDirectoSal.toFixed(2), 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, porValorizar.toFixed(2), 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, saldoPorPagar.toFixed(2), 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } }
    }

    //
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'Con IGV', 10, false);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("C" + row + ":E" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, adDirectoPE_igv.toFixed(2), 10, false);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, valoriz_igv.toFixed(2), 10, false);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalPE_igv.toFixed(2), 10, false);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, adDirectoAM_igv.toFixed(2), 10, false);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adDirectoSal_igv.toFixed(2), 10, false);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, porValorizar_igv.toFixed(2), 10, false);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, saldoPorPagar_igv.toFixed(2), 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    //
    row += 1;
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' ', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("C" + row + ":E" + row);
    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, adDirectoPET + '%', 10, true);
    worksheet.getCell("C" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, valorizPET + '%', 10, true);
    worksheet.getCell("F" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("G" + row + ":H" + row);
    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, totalPET + '%', 10, true);
    worksheet.getCell("G" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.mergeCells("I" + row + ":J" + row);
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, adDirectoAMT + '%', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells("K" + row + ":L" + row);
    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'K' + row, adDirectoSalT + '%', 10, true);
    worksheet.getCell("K" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, porValorizarT + '%', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, saldoPorPagarT + '%', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' }
    }

    // -------------------------------------------------------------------------------------
    // GARANTÍAS 
    // -------------------------------------------------------------------------------------

    row += 2;
    this.setdatogeneral(worksheet, "B" + row, "GARANTÍAS", 9, true);
    worksheet.getCell('B' + row).border = {
      top: { style: 'thin', color: { argb: 'c8d5dc' } },
    };
    worksheet.getCell('B' + row).font = { color: { argb: 'FF0000' }, bold: true };

    // 119
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'DESCRIPCIÓN', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('E' + row + ':H' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'ENTIDAD FINANCIERA', 10, true);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, 'EMISIÓN', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, 'VENCIMIENTO', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, 'MONTO', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, 'ESTADO', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, 'OBSERVACIONES', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    }

    // FIEL CUMPLIMIENTO
    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  FIEL CUMPLIMIENTO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('E' + row + ':H' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' ', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, ' ', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, ' ', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    for (let i = 0; i < countArrFielCum; i++) {
      let Arr = arrGarantiasFC[i];
      row += 1;
      worksheet.mergeCells('B' + row + ':D' + row);
      this.setdatogeneral(worksheet, 'B' + row, '  ' + 'Carta Fianza N° ' + Arr.nro_carta, 10, false);
      worksheet.getCell("B" + row).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.mergeCells('E' + row + ':H' + row);
      this.setdatogeneral(worksheet, 'E' + row, '          ' + Arr.entidad_financiera, 10, false);
      worksheet.getCell("H" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'I' + row, Arr.fecha_emision, 10, false);
      worksheet.getCell("I" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.mergeCells('J' + row + ':K' + row);
      worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'J' + row, Arr.fecha_vencimiento, 10, false);
      worksheet.getCell("J" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'L' + row, Arr.monto, 10, false);
      worksheet.getCell("L" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'M' + row, Arr.estado, 10, false);
      worksheet.getCell("M" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
      worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
      worksheet.getCell("N" + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
      }
    }

    // ADELANTO DIRECTO

    row += 1;
    worksheet.mergeCells('B' + row + ':D' + row);
    this.setdatogeneral(worksheet, 'B' + row, '  ADELANTO DE DIRECTO', 10, true);
    worksheet.getCell("B" + row).border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('E' + row + ':H' + row);
    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' ', 10, true);
    worksheet.getCell("H" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' ', 10, true);
    worksheet.getCell("I" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.mergeCells('J' + row + ':K' + row);
    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, ' ', 10, true);
    worksheet.getCell("J" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'L' + row, ' ', 10, true);
    worksheet.getCell("L" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'M' + row, ' ', 10, true);
    worksheet.getCell("M" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }
    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'N' + row, ' ', 10, true);
    worksheet.getCell("N" + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
    }

    for (let i = 0; i < countAdelantoD; i++) {
      let Arr = arrGarantiasAdelantoD[i];
      row += 1;
      if (i !== (countAdelantoD - 1)) {
        worksheet.mergeCells('B' + row + ':D' + row);
        this.setdatogeneral(worksheet, 'B' + row, '  ' + 'Carta Fianza N° ' + Arr.nro_carta, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells('E' + row + ':H' + row);
        this.setdatogeneral(worksheet, 'E' + row, '          ' + Arr.entidad_financiera, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.fecha_emision, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.mergeCells('J' + row + ':K' + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.fecha_vencimiento, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, Arr.monto, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.estado, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin', color: { argb: 'c8d5dc' } },
        }
      } else {
        worksheet.mergeCells('B' + row + ':D' + row);
        this.setdatogeneral(worksheet, 'B' + row, '  ' + 'Carta Fianza N° ' + Arr.nro_carta, 10, false);
        worksheet.getCell("B" + row).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells('E' + row + ':H' + row);
        this.setdatogeneral(worksheet, 'E' + row, '          ' + Arr.entidad_financiera, 10, false);
        worksheet.getCell("H" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, Arr.fecha_emision, 10, false);
        worksheet.getCell("I" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.mergeCells('J' + row + ':K' + row);
        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, Arr.fecha_vencimiento, 10, false);
        worksheet.getCell("J" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'L' + row, Arr.monto, 10, false);
        worksheet.getCell("L" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'M' + row, Arr.estado, 10, false);
        worksheet.getCell("M" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'N' + row, ' ', 10, false);
        worksheet.getCell("N" + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    }

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Ficha_Supervision.xlsx');
    });
  }
  setdatogeneral(worksheet, cell, value, fontsize, bolt, fg_color = 'FFFFFF', bg_color = '000000') {
    const titleRow = worksheet.getCell(cell)
    titleRow.value = value;
    titleRow.font = { name: 'ARIAL', family: 4, size: fontsize, bold: bolt };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: fg_color },
      color: { argb: bg_color }
    };
  }

  async generarallbolsadetalle(detalles) {

    let title = 'PROGRAMACION DE PROYECTOS DE LA DGER';

    let annio = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;
    let periodo = (annio * 100) + mes;

    console.log(periodo);

    //

    const workbook = new Workbook();
    const wsgeneral = workbook.addWorksheet('Bolsa_Proyecto');

    wsgeneral.getColumn(1).width = 5;
    wsgeneral.getColumn(2).width = 20;
    wsgeneral.getColumn(3).width = 20;
    wsgeneral.getColumn(4).width = 20;
    wsgeneral.getColumn(5).width = 100;
    wsgeneral.getColumn(6).width = 30;
    wsgeneral.getColumn(7).width = 30;
    wsgeneral.getColumn(8).width = 50;
    wsgeneral.getColumn(9).width = 30;
    wsgeneral.getColumn(10).width = 30;
    wsgeneral.getColumn(11).width = 30;
    wsgeneral.getColumn(12).width = 30;
    wsgeneral.getColumn(13).width = 30;
    wsgeneral.getColumn(14).width = 30;
    wsgeneral.getColumn(15).width = 50;
    wsgeneral.getColumn(16).width = 30;
    wsgeneral.getColumn(17).width = 30;
    wsgeneral.getColumn(18).width = 30;
    wsgeneral.getColumn(19).width = 50;

    wsgeneral.getColumn(20).width = 30;
    wsgeneral.getColumn(21).width = 30;
    wsgeneral.getColumn(22).width = 30;

    wsgeneral.getColumn(23).width = 30;
    wsgeneral.getColumn(24).width = 30;
    wsgeneral.getColumn(25).width = 30;

    wsgeneral.getColumn(26).width = 30;
    wsgeneral.getColumn(27).width = 30;
    wsgeneral.getColumn(28).width = 30;

    wsgeneral.getColumn(29).width = 30;
    wsgeneral.getColumn(30).width = 30;
    wsgeneral.getColumn(31).width = 30;

    wsgeneral.getColumn(32).width = 30;
    wsgeneral.getColumn(33).width = 30;
    wsgeneral.getColumn(34).width = 30;

    wsgeneral.getColumn(35).width = 30;
    wsgeneral.getColumn(36).width = 30;
    wsgeneral.getColumn(37).width = 30;

    wsgeneral.getColumn(38).width = 30;
    wsgeneral.getColumn(39).width = 30;
    wsgeneral.getColumn(40).width = 30;

    wsgeneral.getColumn(41).width = 30;
    wsgeneral.getColumn(42).width = 30;
    wsgeneral.getColumn(43).width = 30;

    wsgeneral.getColumn(44).width = 30;
    wsgeneral.getColumn(45).width = 30;
    wsgeneral.getColumn(46).width = 30;

    wsgeneral.getColumn(47).width = 30;
    wsgeneral.getColumn(48).width = 30;
    wsgeneral.getColumn(49).width = 30;

    wsgeneral.getColumn(50).width = 30;
    wsgeneral.getColumn(51).width = 30;
    wsgeneral.getColumn(52).width = 30;

    wsgeneral.getColumn(53).width = 30;
    wsgeneral.getColumn(54).width = 30;
    wsgeneral.getColumn(55).width = 30;

    wsgeneral.getColumn(56).width = 30;
    wsgeneral.getColumn(57).width = 30;
    wsgeneral.getColumn(58).width = 30;
    wsgeneral.getColumn(59).width = 30;

    wsgeneral.getColumn(60).width = 100;
    wsgeneral.getColumn(61).width = 30;
    wsgeneral.getColumn(62).width = 30;

    // 1
    let row = 1;
    wsgeneral.mergeCells('B1:J1');
    wsgeneral.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "B" + row, title, 14, true);
    wsgeneral.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    wsgeneral.mergeCells('T3:V3');
    wsgeneral.getCell('T' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "T" + row, title, 14, true);
    wsgeneral.getCell('T3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "T" + row, "ENERO", 10, true, '91cff2');

    wsgeneral.mergeCells('W3:Y3');
    wsgeneral.getCell('W' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "W" + row, title, 14, true);
    wsgeneral.getCell('W3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "W" + row, "FEBRERO", 10, true, '91cff2');

    wsgeneral.mergeCells('Z3:AB3');
    wsgeneral.getCell('Z' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "Z" + row, title, 14, true);
    wsgeneral.getCell('Z3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "Z" + row, "MARZO", 10, true, '91cff2');

    wsgeneral.mergeCells('AC3:AE3');
    wsgeneral.getCell('AC' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AC" + row, title, 14, true);
    wsgeneral.getCell('AC3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AC" + row, "ABRIL", 10, true, '91cff2');

    wsgeneral.mergeCells('AF3:AH3');
    wsgeneral.getCell('AF' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AF" + row, title, 14, true);
    wsgeneral.getCell('AF3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AF" + row, "MAYO", 10, true, '91cff2');

    wsgeneral.mergeCells('AI3:AK3');
    wsgeneral.getCell('AI' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AI" + row, title, 14, true);
    wsgeneral.getCell('AI3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AI" + row, "JUNIO", 10, true, '91cff2');

    wsgeneral.mergeCells('AL3:AN3');
    wsgeneral.getCell('AL' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AL" + row, title, 14, true);
    wsgeneral.getCell('AL3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AL" + row, "JULIO", 10, true, '91cff2');

    wsgeneral.mergeCells('AO3:AQ3');
    wsgeneral.getCell('AO' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AO" + row, title, 14, true);
    wsgeneral.getCell('AO3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AO" + row, "AGOSTO", 10, true, '91cff2');

    wsgeneral.mergeCells('AR3:AT3');
    wsgeneral.getCell('AR' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AR" + row, title, 14, true);
    wsgeneral.getCell('AR3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AR" + row, "SETIEMBRE", 10, true, '91cff2');

    wsgeneral.mergeCells('AU3:AW3');
    wsgeneral.getCell('AU' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AU" + row, title, 14, true);
    wsgeneral.getCell('AU3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AU" + row, "OCTUBRE", 10, true, '91cff2');

    wsgeneral.mergeCells('AX3:AZ3');
    wsgeneral.getCell('AX' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "AX" + row, title, 14, true);
    wsgeneral.getCell('AX3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "AX" + row, "NOVIEMBRE", 10, true, '91cff2');

    wsgeneral.mergeCells('BA3:BC3');
    wsgeneral.getCell('BA' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "BA" + row, title, 14, true);
    wsgeneral.getCell('BA3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "BA" + row, "DICIEMBRE", 10, true, '91cff2');

    wsgeneral.mergeCells('BD3:BF3');
    wsgeneral.getCell('BD' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsgeneral, "BD" + row, title, 14, true);
    wsgeneral.getCell('BD3').font = {
      name: 'ARIAL',
      family: 4,
      size: 10,
      underline: true,
      bold: true
    };
    this.setdatogeneral(wsgeneral, "BD" + row, "TOTAL AÑO", 10, true, '91cff2');

    for (let i = 20; i <= 58; i++) {
      wsgeneral.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    let sumP = 0;
    let sumQ = 0;
    let sumR = 0;
    let sumS = 0;
    let sumT = 0;
    let sumU = 0;
    let sumV = 0;
    let sumW = 0;
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;
    let sumAA = 0;
    let sumAB = 0;
    let sumAC = 0;
    let sumAD = 0;
    let sumAE = 0;
    let sumAF = 0;
    let sumAG = 0;
    let sumAH = 0;
    let sumAI = 0;
    let sumAJ = 0;
    let sumAK = 0;
    let sumAL = 0;
    let sumAM = 0;
    let sumAN = 0;
    let sumAO = 0;
    let sumAP = 0;
    let sumAQ = 0;
    let sumAR = 0;
    let sumAS = 0;
    let sumAT = 0;
    let sumAU = 0;
    let sumAV = 0;
    let sumAW = 0;
    let sumAX = 0;
    let sumAY = 0;
    let sumAZ = 0;
    let sumBA = 0;
    let sumBB = 0;
    let sumBC = 0;
    let sumBD = 0;
    let sumBE = 0;
    let sumBF = 0;
    let sumBG = 0;

    row++;

    this.setdatogeneral(wsgeneral, "B" + row, "JEFATURA", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "C" + row, "NUM. REAL", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "D" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "E" + row, "PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "F" + row, "DEPARTAMENTO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "G" + row, "PROVINCIA(S)", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "H" + row, "DISTRITOS(S)", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "I" + row, "LOCALIDADES", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "J" + row, "POBLACION", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "K" + row, "VIVIENDAS", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "L" + row, "KM RED", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "M" + row, "N° TRANSFORMADORES", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "N" + row, "N° LAMPARAS", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "O" + row, "AÑO PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "P" + row, "COSTO DE INVERSIÓN", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "Q" + row, "PIA", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "R" + row, "PIM", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "S" + row, "DIFERENCIA (PIA-PIM)", 10, true, '91cff2');

    this.setdatogeneral(wsgeneral, "T" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "U" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "V" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "W" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "X" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "Y" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "Z" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AA" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AB" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AC" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AD" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AE" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AF" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AG" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AH" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AI" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AJ" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AK" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AL" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AM" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AN" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AO" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AP" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AQ" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AR" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AS" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AT" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AU" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AV" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AW" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AX" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AY" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "AZ" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BA" + row, "PROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BB" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BC" + row, "REPROGRAMADO", 10, true, '91cff2');

    this.setdatogeneral(wsgeneral, "BD" + row, "INICIAL", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BE" + row, "EJECUTADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BF" + row, "REPROGRAMADO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BG" + row, "DIFERENCIA (PIM-TOTAL AÑO)", 10, true, '91cff2');

    this.setdatogeneral(wsgeneral, "BH" + row, "SITUACION ACTUAL DEL PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BI" + row, "FASE", 10, true, '91cff2');
    this.setdatogeneral(wsgeneral, "BJ" + row, "ESTADO", 10, true, '91cff2');

    for (let i = 2; i <= 62; i++) {
      wsgeneral.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsgeneral.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    detalles.forEach(detalle => {
      row++;

      let periodo1 = (detalle.n_annioprograma * 100) + 1;
      let periodo2 = (detalle.n_annioprograma * 100) + 2;
      let periodo3 = (detalle.n_annioprograma * 100) + 3;
      let periodo4 = (detalle.n_annioprograma * 100) + 4;
      let periodo5 = (detalle.n_annioprograma * 100) + 5;
      let periodo6 = (detalle.n_annioprograma * 100) + 6;
      let periodo7 = (detalle.n_annioprograma * 100) + 7;
      let periodo8 = (detalle.n_annioprograma * 100) + 8;
      let periodo9 = (detalle.n_annioprograma * 100) + 9;
      let periodo10 = (detalle.n_annioprograma * 100) + 10;
      let periodo11 = (detalle.n_annioprograma * 100) + 11;
      let periodo12 = (detalle.n_annioprograma * 100) + 12;
      let totalejecutado = (periodo1 <= periodo ? detalle.n_montoejecene : 0) + (periodo2 <= periodo ? detalle.n_montoejecfeb : 0) +
        (periodo3 <= periodo ? detalle.n_montoejecmar : 0) + (periodo4 <= periodo ? detalle.n_montoejecabr : 0) +
        (periodo5 <= periodo ? detalle.n_montoejecmay : 0) + (periodo6 <= periodo ? detalle.n_montoejecjun : 0) +
        (periodo7 <= periodo ? detalle.n_montoejecjul : 0) + (periodo8 <= periodo ? detalle.n_montoejecago : 0) +
        (periodo9 <= periodo ? detalle.n_montoejecset : 0) + (periodo10 <= periodo ? detalle.n_montoejecoct : 0) +
        (periodo11 <= periodo ? detalle.n_montoejecnov : 0) + (periodo12 <= periodo ? detalle.n_montoejecdic : 0);


      sumP = sumP + detalle.n_costoinversion;
      sumQ = sumQ + detalle.n_presupuestoinicial;
      sumR = sumR + detalle.n_montoprogramadoannio;
      sumS = sumS + detalle.n_diferenciatotal;
      sumT = sumT + detalle.n_montoprogene;
      sumU = sumU + (periodo1 <= periodo ? detalle.n_montoejecene : 0);
      sumV = sumV + detalle.n_montoreprene;
      sumW = sumW + detalle.n_montoprogfeb;
      sumX = sumX + (periodo2 <= periodo ? detalle.n_montoejecfeb : 0);
      sumY = sumY + detalle.n_montoreprfeb;
      sumZ = sumZ + detalle.n_montoprogmar;
      sumAA = sumAA + (periodo3 <= periodo ? detalle.n_montoejecmar : 0);
      sumAB = sumAB + detalle.n_montoreprmar;
      sumAC = sumAC + detalle.n_montoprogabr;
      sumAD = sumAD + (periodo4 <= periodo ? detalle.n_montoejecabr : 0);
      sumAE = sumAE + detalle.n_montoreprabr;
      sumAF = sumAF + detalle.n_montoprogmay;
      sumAG = sumAG + (periodo5 <= periodo ? detalle.n_montoejecmay : 0);
      sumAH = sumAH + detalle.n_montoreprmay;
      sumAI = sumAI + detalle.n_montoprogjun;
      sumAJ = sumAJ + (periodo6 <= periodo ? detalle.n_montoejecjun : 0);
      sumAK = sumAK + detalle.n_montoreprjun;
      sumAL = sumAL + detalle.n_montoprogjul;
      sumAM = sumAM + (periodo7 <= periodo ? detalle.n_montoejecjul : 0);
      sumAN = sumAN + detalle.n_montoreprjul;
      sumAO = sumAO + detalle.n_montoprogago;
      sumAP = sumAP + (periodo8 <= periodo ? detalle.n_montoejecago : 0);
      sumAQ = sumAQ + detalle.n_montoreprago;
      sumAR = sumAR + detalle.n_montoprogset;
      sumAS = sumAS + (periodo9 <= periodo ? detalle.n_montoejecset : 0);
      sumAT = sumAT + detalle.n_montoreprset;
      sumAU = sumAU + detalle.n_montoprogoct;
      sumAV = sumAV + (periodo10 <= periodo ? detalle.n_montoejecoct : 0);
      sumAW = sumAW + detalle.n_montoreproct;
      sumAX = sumAX + detalle.n_montoprognov;
      sumAY = sumAY + (periodo11 <= periodo ? detalle.n_montoejecnov : 0);
      sumAZ = sumAZ + detalle.n_montoreprnov;
      sumBA = sumBA + detalle.n_montoprogdic;
      sumBB = sumBB + (periodo12 <= periodo ? detalle.n_montoejecdic : 0);
      sumBC = sumBC + detalle.n_montoreprdic;
      sumBD = sumBD + detalle.n_totalprogramado;
      sumBE = sumBE + totalejecutado;
      sumBF = sumBF + detalle.n_totalreprogramado;
      sumBG = sumBG + detalle.n_diferenciatotal2;

      this.dato_tabla(wsgeneral, "B", row, detalle.c_areaasignada);
      this.dato_tabla(wsgeneral, "C", row, detalle.c_codigomem);
      this.dato_tabla(wsgeneral, "D", row, detalle.c_codigocui);
      this.dato_tabla(wsgeneral, "E", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsgeneral, "F", row, detalle.c_departamentos);
      this.dato_tabla(wsgeneral, "G", row, detalle.c_provincias);
      this.dato_tabla(wsgeneral, "H", row, detalle.c_distritos);
      this.dato_tabla(wsgeneral, "I", row, detalle.n_localidades);
      this.dato_tabla(wsgeneral, "J", row, detalle.n_poblacion);
      this.dato_tabla(wsgeneral, "K", row, detalle.n_viviendas);
      this.dato_tabla(wsgeneral, "L", row, detalle.n_kmred);
      this.dato_tabla(wsgeneral, "M", row, detalle.n_trafos);
      this.dato_tabla(wsgeneral, "N", row, detalle.n_lamparas);
      this.dato_tabla(wsgeneral, "O", row, detalle.n_annioprograma);
      this.dato_tabla(wsgeneral, "P", row, detalle.n_costoinversion);
      this.dato_tabla(wsgeneral, "Q", row, detalle.n_presupuestoinicial);
      this.dato_tabla(wsgeneral, "R", row, detalle.n_montoprogramadoannio);
      this.dato_tabla(wsgeneral, "S", row, detalle.n_diferenciatotal);

      this.dato_tabla(wsgeneral, "T", row, detalle.n_montoprogene);
      this.dato_tabla(wsgeneral, "U", row, (periodo1 <= periodo ? detalle.n_montoejecene : 0));
      this.dato_tabla(wsgeneral, "V", row, detalle.n_montoreprene);
      this.dato_tabla(wsgeneral, "W", row, detalle.n_montoprogfeb);
      this.dato_tabla(wsgeneral, "X", row, (periodo2 <= periodo ? detalle.n_montoejecfeb : 0));
      this.dato_tabla(wsgeneral, "Y", row, detalle.n_montoreprfeb);
      this.dato_tabla(wsgeneral, "Z", row, detalle.n_montoprogmar);
      this.dato_tabla(wsgeneral, "AA", row, (periodo3 <= periodo ? detalle.n_montoejecmar : 0));
      this.dato_tabla(wsgeneral, "AB", row, detalle.n_montoreprmar);
      this.dato_tabla(wsgeneral, "AC", row, detalle.n_montoprogabr);
      this.dato_tabla(wsgeneral, "AD", row, (periodo4 <= periodo ? detalle.n_montoejecabr : 0));
      this.dato_tabla(wsgeneral, "AE", row, detalle.n_montoreprabr);
      this.dato_tabla(wsgeneral, "AF", row, detalle.n_montoprogmay);
      this.dato_tabla(wsgeneral, "AG", row, (periodo5 <= periodo ? detalle.n_montoejecmay : 0));
      this.dato_tabla(wsgeneral, "AH", row, detalle.n_montoreprmay);
      this.dato_tabla(wsgeneral, "AI", row, detalle.n_montoprogjun);
      this.dato_tabla(wsgeneral, "AJ", row, (periodo6 <= periodo ? detalle.n_montoejecjun : 0));
      this.dato_tabla(wsgeneral, "AK", row, detalle.n_montoreprjun);
      this.dato_tabla(wsgeneral, "AL", row, detalle.n_montoprogjul);
      this.dato_tabla(wsgeneral, "AM", row, (periodo7 <= periodo ? detalle.n_montoejecjul : 0));
      this.dato_tabla(wsgeneral, "AN", row, detalle.n_montoreprjul);
      this.dato_tabla(wsgeneral, "AO", row, detalle.n_montoprogago);
      this.dato_tabla(wsgeneral, "AP", row, (periodo8 <= periodo ? detalle.n_montoejecago : 0));
      this.dato_tabla(wsgeneral, "AQ", row, detalle.n_montoreprago);
      this.dato_tabla(wsgeneral, "AR", row, detalle.n_montoprogset);
      this.dato_tabla(wsgeneral, "AS", row, (periodo9 <= periodo ? detalle.n_montoejecset : 0));
      this.dato_tabla(wsgeneral, "AT", row, detalle.n_montoreprset);
      this.dato_tabla(wsgeneral, "AU", row, detalle.n_montoprogoct);
      this.dato_tabla(wsgeneral, "AV", row, (periodo10 <= periodo ? detalle.n_montoejecoct : 0));
      this.dato_tabla(wsgeneral, "AW", row, detalle.n_montoreproct);
      this.dato_tabla(wsgeneral, "AX", row, detalle.n_montoprognov);
      this.dato_tabla(wsgeneral, "AY", row, (periodo11 <= periodo ? detalle.n_montoejecnov : 0));
      this.dato_tabla(wsgeneral, "AZ", row, detalle.n_montoreprnov);
      this.dato_tabla(wsgeneral, "BA", row, detalle.n_montoprogdic);
      this.dato_tabla(wsgeneral, "BB", row, (periodo12 <= periodo ? detalle.n_montoejecdic : 0));
      this.dato_tabla(wsgeneral, "BC", row, detalle.n_montoreprdic);

      this.dato_tabla(wsgeneral, "BD", row, detalle.n_totalprogramado);
      this.dato_tabla(wsgeneral, "BE", row, totalejecutado);
      this.dato_tabla(wsgeneral, "BF", row, detalle.n_totalreprogramado);
      this.dato_tabla(wsgeneral, "BG", row, detalle.n_diferenciatotal2);

      this.dato_tabla(wsgeneral, "BH", row, detalle.c_situacionactual);
      this.dato_tabla(wsgeneral, "BI", row, detalle.c_fase);
      this.dato_tabla(wsgeneral, "BJ", row, detalle.c_estado);

      for (let i = 2; i <= 62; i++) {
        wsgeneral.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
        wsgeneral.getCell("P" + row).numFmt = '0.00';
        wsgeneral.getCell("Q" + row).numFmt = '0.00';
        wsgeneral.getCell("R" + row).numFmt = '0.00';
        wsgeneral.getCell("S" + row).numFmt = '0.00';
        wsgeneral.getCell("T" + row).numFmt = '0.00';
        wsgeneral.getCell("U" + row).numFmt = '0.00';
        wsgeneral.getCell("V" + row).numFmt = '0.00';
        wsgeneral.getCell("W" + row).numFmt = '0.00';
        wsgeneral.getCell("X" + row).numFmt = '0.00';
        wsgeneral.getCell("Y" + row).numFmt = '0.00';
        wsgeneral.getCell("Z" + row).numFmt = '0.00';
        wsgeneral.getCell("AA" + row).numFmt = '0.00';
        wsgeneral.getCell("AB" + row).numFmt = '0.00';
        wsgeneral.getCell("AC" + row).numFmt = '0.00';
        wsgeneral.getCell("AD" + row).numFmt = '0.00';
        wsgeneral.getCell("AE" + row).numFmt = '0.00';
        wsgeneral.getCell("AF" + row).numFmt = '0.00';
        wsgeneral.getCell("AG" + row).numFmt = '0.00';
        wsgeneral.getCell("AH" + row).numFmt = '0.00';
        wsgeneral.getCell("AI" + row).numFmt = '0.00';
        wsgeneral.getCell("AJ" + row).numFmt = '0.00';
        wsgeneral.getCell("AK" + row).numFmt = '0.00';
        wsgeneral.getCell("AL" + row).numFmt = '0.00';
        wsgeneral.getCell("AM" + row).numFmt = '0.00';
        wsgeneral.getCell("AN" + row).numFmt = '0.00';
        wsgeneral.getCell("AO" + row).numFmt = '0.00';
        wsgeneral.getCell("AP" + row).numFmt = '0.00';
        wsgeneral.getCell("AQ" + row).numFmt = '0.00';
        wsgeneral.getCell("AR" + row).numFmt = '0.00';
        wsgeneral.getCell("AS" + row).numFmt = '0.00';
        wsgeneral.getCell("AT" + row).numFmt = '0.00';
        wsgeneral.getCell("AU" + row).numFmt = '0.00';
        wsgeneral.getCell("AV" + row).numFmt = '0.00';
        wsgeneral.getCell("AW" + row).numFmt = '0.00';
        wsgeneral.getCell("AX" + row).numFmt = '0.00';
        wsgeneral.getCell("AY" + row).numFmt = '0.00';
        wsgeneral.getCell("AZ" + row).numFmt = '0.00';
        wsgeneral.getCell("BA" + row).numFmt = '0.00';
        wsgeneral.getCell("BB" + row).numFmt = '0.00';
        wsgeneral.getCell("BC" + row).numFmt = '0.00';
        wsgeneral.getCell("BD" + row).numFmt = '0.00';
        wsgeneral.getCell("BE" + row).numFmt = '0.00';
        wsgeneral.getCell("BF" + row).numFmt = '0.00';
        wsgeneral.getCell("BG" + row).numFmt = '0.00';
      }
    });

    row++;

    this.dato_tabla(wsgeneral, "P", row, sumP);
    this.dato_tabla(wsgeneral, "Q", row, sumQ);
    this.dato_tabla(wsgeneral, "R", row, sumR);
    this.dato_tabla(wsgeneral, "S", row, sumS);
    this.dato_tabla(wsgeneral, "T", row, sumT);
    this.dato_tabla(wsgeneral, "U", row, sumU);
    this.dato_tabla(wsgeneral, "V", row, sumV);
    this.dato_tabla(wsgeneral, "W", row, sumW);
    this.dato_tabla(wsgeneral, "X", row, sumX);
    this.dato_tabla(wsgeneral, "Y", row, sumY);
    this.dato_tabla(wsgeneral, "Z", row, sumZ);
    this.dato_tabla(wsgeneral, "AA", row, sumAA);
    this.dato_tabla(wsgeneral, "AB", row, sumAB);
    this.dato_tabla(wsgeneral, "AC", row, sumAC);
    this.dato_tabla(wsgeneral, "AD", row, sumAD);
    this.dato_tabla(wsgeneral, "AE", row, sumAE);
    this.dato_tabla(wsgeneral, "AF", row, sumAF);
    this.dato_tabla(wsgeneral, "AG", row, sumAG);
    this.dato_tabla(wsgeneral, "AH", row, sumAH);
    this.dato_tabla(wsgeneral, "AI", row, sumAI);
    this.dato_tabla(wsgeneral, "AJ", row, sumAJ);
    this.dato_tabla(wsgeneral, "AK", row, sumAK);
    this.dato_tabla(wsgeneral, "AL", row, sumAL);
    this.dato_tabla(wsgeneral, "AM", row, sumAM);
    this.dato_tabla(wsgeneral, "AN", row, sumAN);
    this.dato_tabla(wsgeneral, "AO", row, sumAO);
    this.dato_tabla(wsgeneral, "AP", row, sumAP);
    this.dato_tabla(wsgeneral, "AQ", row, sumAQ);
    this.dato_tabla(wsgeneral, "AR", row, sumAR);
    this.dato_tabla(wsgeneral, "AS", row, sumAS);
    this.dato_tabla(wsgeneral, "AT", row, sumAT);
    this.dato_tabla(wsgeneral, "AU", row, sumAU);
    this.dato_tabla(wsgeneral, "AV", row, sumAV);
    this.dato_tabla(wsgeneral, "AW", row, sumAW);
    this.dato_tabla(wsgeneral, "AX", row, sumAX);
    this.dato_tabla(wsgeneral, "AY", row, sumAY);
    this.dato_tabla(wsgeneral, "AZ", row, sumAZ);
    this.dato_tabla(wsgeneral, "BA", row, sumBA);
    this.dato_tabla(wsgeneral, "BB", row, sumBB);
    this.dato_tabla(wsgeneral, "BC", row, sumBC);
    this.dato_tabla(wsgeneral, "BD", row, sumBD);
    this.dato_tabla(wsgeneral, "BE", row, sumBE);
    this.dato_tabla(wsgeneral, "BF", row, sumBF);
    this.dato_tabla(wsgeneral, "BG", row, sumBG);

    wsgeneral.getCell("P" + row).numFmt = '0.00';
    wsgeneral.getCell("Q" + row).numFmt = '0.00';
    wsgeneral.getCell("R" + row).numFmt = '0.00';
    wsgeneral.getCell("S" + row).numFmt = '0.00';
    wsgeneral.getCell("T" + row).numFmt = '0.00';
    wsgeneral.getCell("U" + row).numFmt = '0.00';
    wsgeneral.getCell("V" + row).numFmt = '0.00';
    wsgeneral.getCell("W" + row).numFmt = '0.00';
    wsgeneral.getCell("X" + row).numFmt = '0.00';
    wsgeneral.getCell("Y" + row).numFmt = '0.00';
    wsgeneral.getCell("Z" + row).numFmt = '0.00';
    wsgeneral.getCell("AA" + row).numFmt = '0.00';
    wsgeneral.getCell("AB" + row).numFmt = '0.00';
    wsgeneral.getCell("AC" + row).numFmt = '0.00';
    wsgeneral.getCell("AD" + row).numFmt = '0.00';
    wsgeneral.getCell("AE" + row).numFmt = '0.00';
    wsgeneral.getCell("AF" + row).numFmt = '0.00';
    wsgeneral.getCell("AG" + row).numFmt = '0.00';
    wsgeneral.getCell("AH" + row).numFmt = '0.00';
    wsgeneral.getCell("AI" + row).numFmt = '0.00';
    wsgeneral.getCell("AJ" + row).numFmt = '0.00';
    wsgeneral.getCell("AK" + row).numFmt = '0.00';
    wsgeneral.getCell("AL" + row).numFmt = '0.00';
    wsgeneral.getCell("AM" + row).numFmt = '0.00';
    wsgeneral.getCell("AN" + row).numFmt = '0.00';
    wsgeneral.getCell("AO" + row).numFmt = '0.00';
    wsgeneral.getCell("AP" + row).numFmt = '0.00';
    wsgeneral.getCell("AQ" + row).numFmt = '0.00';
    wsgeneral.getCell("AR" + row).numFmt = '0.00';
    wsgeneral.getCell("AS" + row).numFmt = '0.00';
    wsgeneral.getCell("AT" + row).numFmt = '0.00';
    wsgeneral.getCell("AU" + row).numFmt = '0.00';
    wsgeneral.getCell("AV" + row).numFmt = '0.00';
    wsgeneral.getCell("AW" + row).numFmt = '0.00';
    wsgeneral.getCell("AX" + row).numFmt = '0.00';
    wsgeneral.getCell("AY" + row).numFmt = '0.00';
    wsgeneral.getCell("AZ" + row).numFmt = '0.00';
    wsgeneral.getCell("BA" + row).numFmt = '0.00';
    wsgeneral.getCell("BB" + row).numFmt = '0.00';
    wsgeneral.getCell("BC" + row).numFmt = '0.00';
    wsgeneral.getCell("BD" + row).numFmt = '0.00';
    wsgeneral.getCell("BE" + row).numFmt = '0.00';
    wsgeneral.getCell("BF" + row).numFmt = '0.00';
    wsgeneral.getCell("BG" + row).numFmt = '0.00';

    for (let i = 16; i <= 59; i++) {
      wsgeneral.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'BolsaProyecto.xlsx');
    });
  }

  async generaralldatosadicionales(detalles) {

    let title = 'DATOS ADICIONALES DEL PROYECTO';

    const workbook = new Workbook();
    const wsfase1 = workbook.addWorksheet('ESTUDIO DE PREINVERSION');

    wsfase1.getColumn(1).width = 5;
    wsfase1.getColumn(2).width = 20;
    wsfase1.getColumn(3).width = 20;
    wsfase1.getColumn(4).width = 100;
    wsfase1.getColumn(5).width = 30;
    wsfase1.getColumn(6).width = 30;
    wsfase1.getColumn(7).width = 30;
    wsfase1.getColumn(8).width = 30;
    wsfase1.getColumn(9).width = 30;
    wsfase1.getColumn(10).width = 30;
    wsfase1.getColumn(11).width = 30;
    wsfase1.getColumn(12).width = 30;
    wsfase1.getColumn(13).width = 30;
    wsfase1.getColumn(14).width = 30;
    wsfase1.getColumn(15).width = 30;
    wsfase1.getColumn(16).width = 30;
    wsfase1.getColumn(17).width = 30;
    wsfase1.getColumn(18).width = 30;
    wsfase1.getColumn(19).width = 30;
    wsfase1.getColumn(20).width = 30;
    wsfase1.getColumn(21).width = 30;
    wsfase1.getColumn(22).width = 30;
    wsfase1.getColumn(23).width = 30;
    wsfase1.getColumn(24).width = 30;

    // 1
    let row = 1;
    wsfase1.mergeCells('B1:J1');
    wsfase1.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsfase1, "B" + row, title, 14, true);
    wsfase1.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.setdatogeneral(wsfase1, "B" + row, "NUM. REAL", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "C" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "D" + row, "PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "E" + row, "Jefatura", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "F" + row, "Jefe de Area", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "G" + row, "Coordinador", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "H" + row, "Gerente Ingeniería", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "I" + row, "Jefe Ingeniería", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "J" + row, "LP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "K" + row, "LP Reforzamiento", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "L" + row, "RP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "M" + row, "RP (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "N" + row, "RP (Nro Transformadores)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "O" + row, "RS (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "P" + row, "RS (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "Q" + row, "RS (Nro Luminarias)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "R" + row, "Inversión Incluye IGV", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "S" + row, "Plazo de ejecución", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "T" + row, "Ficha Técnica", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "U" + row, "Relación Localidades", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "V" + row, "RS (Nro Usuarios)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "W" + row, "RS (Población Beneficiada)", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "X" + row, "FASE ACTUAL", 10, true, '91cff2');

    for (let i = 2; i <= 24; i++) {
      wsfase1.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsfase1.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    const detalle1 = detalles.filter(o => o.fase1 == 1);

    detalle1.forEach(detalle => {
      row++;
      this.dato_tabla(wsfase1, "B", row, detalle.c_codigomem);
      this.dato_tabla(wsfase1, "C", row, detalle.c_codigocui);
      this.dato_tabla(wsfase1, "D", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsfase1, "E", row, detalle.f1_a1);
      this.dato_tabla(wsfase1, "F", row, detalle.f1_a2);
      this.dato_tabla(wsfase1, "G", row, detalle.f1_a3);
      this.dato_tabla(wsfase1, "H", row, detalle.f1_a4);
      this.dato_tabla(wsfase1, "I", row, detalle.f1_a5);
      this.dato_tabla(wsfase1, "J", row, detalle.f1_a6);
      this.dato_tabla(wsfase1, "K", row, detalle.f1_a7);
      this.dato_tabla(wsfase1, "L", row, detalle.f1_a8);
      this.dato_tabla(wsfase1, "M", row, detalle.f1_a9);
      this.dato_tabla(wsfase1, "N", row, detalle.f1_a10);
      this.dato_tabla(wsfase1, "O", row, detalle.f1_a11);
      this.dato_tabla(wsfase1, "P", row, detalle.f1_a12);
      this.dato_tabla(wsfase1, "Q", row, detalle.f1_a13);
      this.dato_tabla(wsfase1, "R", row, detalle.f1_a14);
      this.dato_tabla(wsfase1, "S", row, detalle.f1_a15);
      this.dato_tabla(wsfase1, "T", row, detalle.f1_a16);
      this.dato_tabla(wsfase1, "U", row, detalle.f1_a17);
      this.dato_tabla(wsfase1, "V", row, detalle.f1_a78);
      this.dato_tabla(wsfase1, "W", row, detalle.f1_a83);
      if (detalle.n_idgen_fase == 1)
        this.dato_tabla(wsfase1, "X", row, 'ESTUDIO DE PREINVERSION');
      else if (detalle.n_idgen_fase == 2)
        this.dato_tabla(wsfase1, "X", row, 'ESTUDIO DEFINITIVO');
      else if (detalle.n_idgen_fase == 3)
        this.dato_tabla(wsfase1, "X", row, 'EJECUCIÓN');
      else if (detalle.n_idgen_fase == 4)
        this.dato_tabla(wsfase1, "X", row, 'SUPERVISION');
      else if (detalle.n_idgen_fase == 5)
        this.dato_tabla(wsfase1, "X", row, 'CIERRE');

      for (let i = 2; i <= 24; i++) {
        wsfase1.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    const wsfase2 = workbook.addWorksheet('ESTUDIO DEFINITIVO');

    wsfase2.getColumn(1).width = 5;
    wsfase2.getColumn(2).width = 20;
    wsfase2.getColumn(3).width = 20;
    wsfase2.getColumn(4).width = 100;
    wsfase2.getColumn(5).width = 30;
    wsfase2.getColumn(6).width = 30;
    wsfase2.getColumn(7).width = 30;
    wsfase2.getColumn(8).width = 30;
    wsfase2.getColumn(9).width = 30;
    wsfase2.getColumn(10).width = 30;
    wsfase2.getColumn(11).width = 30;
    wsfase2.getColumn(12).width = 30;
    wsfase2.getColumn(13).width = 30;
    wsfase2.getColumn(14).width = 30;
    wsfase2.getColumn(15).width = 30;
    wsfase2.getColumn(16).width = 30;
    wsfase2.getColumn(17).width = 30;
    wsfase2.getColumn(18).width = 30;
    wsfase2.getColumn(19).width = 30;
    wsfase2.getColumn(20).width = 30;
    wsfase2.getColumn(21).width = 30;
    wsfase2.getColumn(22).width = 30;
    wsfase2.getColumn(23).width = 30;
    wsfase2.getColumn(24).width = 30;
    wsfase2.getColumn(25).width = 30;
    wsfase2.getColumn(26).width = 30;

    // 1
    row = 1;
    wsfase2.mergeCells('B1:J1');
    wsfase2.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsfase2, "B" + row, title, 14, true);
    wsfase2.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.setdatogeneral(wsfase2, "B" + row, "NUM. REAL", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "C" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "D" + row, "PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "E" + row, "Jefatura", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "F" + row, "Jefe de Area", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "G" + row, "Coordinador", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "H" + row, "Gerente Ingeniería", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "I" + row, "Jefe Ingeniería", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "J" + row, "LP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "K" + row, "LP Reforzamiento", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "L" + row, "RP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "M" + row, "RP (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "N" + row, "RP (Nro Transformadores)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "O" + row, "RS (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "P" + row, "RS (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "Q" + row, "RS (Nro Luminarias)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "R" + row, "Valor Referencial incl. IGV", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "S" + row, "Plazo de ejecución", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "T" + row, "Ficha Técnica", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "U" + row, "Relación Localidades", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "V" + row, "Entidad licita Suministros, Obra Civiles y Montaje", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "W" + row, "Entidad que administra el Contrato", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "X" + row, "RS (Nro Usuarios)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "Y" + row, "RS (Población Beneficiada)", 10, true, '91cff2');
    this.setdatogeneral(wsfase2, "Z" + row, "FASE ACTUAL", 10, true, '91cff2');

    for (let i = 2; i <= 26; i++) {
      wsfase2.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsfase2.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    const detalle2 = detalles.filter(o => o.fase2 == 1);

    detalle2.forEach(detalle => {
      row++;
      this.dato_tabla(wsfase2, "B", row, detalle.c_codigomem);
      this.dato_tabla(wsfase2, "C", row, detalle.c_codigocui);
      this.dato_tabla(wsfase2, "D", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsfase2, "E", row, detalle.f2_a18);
      this.dato_tabla(wsfase2, "F", row, detalle.f2_a19);
      this.dato_tabla(wsfase2, "G", row, detalle.f2_a20);
      this.dato_tabla(wsfase2, "H", row, detalle.f2_a21);
      this.dato_tabla(wsfase2, "I", row, detalle.f2_a22);
      this.dato_tabla(wsfase2, "J", row, detalle.f2_a23);
      this.dato_tabla(wsfase2, "K", row, detalle.f2_a24);
      this.dato_tabla(wsfase2, "L", row, detalle.f2_a25);
      this.dato_tabla(wsfase2, "M", row, detalle.f2_a26);
      this.dato_tabla(wsfase2, "N", row, detalle.f2_a27);
      this.dato_tabla(wsfase2, "O", row, detalle.f2_a28);
      this.dato_tabla(wsfase2, "P", row, detalle.f2_a29);
      this.dato_tabla(wsfase2, "Q", row, detalle.f2_a30);
      this.dato_tabla(wsfase2, "R", row, detalle.f2_a31);
      this.dato_tabla(wsfase2, "S", row, detalle.f2_a32);
      this.dato_tabla(wsfase2, "T", row, detalle.f2_a33);
      this.dato_tabla(wsfase2, "U", row, detalle.f2_a34);
      this.dato_tabla(wsfase2, "V", row, detalle.f2_a35);
      this.dato_tabla(wsfase2, "W", row, detalle.f2_a36);
      this.dato_tabla(wsfase2, "X", row, detalle.f2_a79);
      this.dato_tabla(wsfase2, "Y", row, detalle.f2_a82);
      if (detalle.n_idgen_fase == 1)
        this.dato_tabla(wsfase2, "Z", row, 'ESTUDIO DE PREINVERSION');
      else if (detalle.n_idgen_fase == 2)
        this.dato_tabla(wsfase2, "Z", row, 'ESTUDIO DEFINITIVO');
      else if (detalle.n_idgen_fase == 3)
        this.dato_tabla(wsfase2, "Z", row, 'EJECUCIÓN');
      else if (detalle.n_idgen_fase == 4)
        this.dato_tabla(wsfase2, "Z", row, 'SUPERVISION');
      else if (detalle.n_idgen_fase == 5)
        this.dato_tabla(wsfase2, "Z", row, 'CIERRE');

      for (let i = 2; i <= 26; i++) {
        wsfase2.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    const wsfase3 = workbook.addWorksheet('EJECUCIÓN');

    wsfase3.getColumn(1).width = 5;
    wsfase3.getColumn(2).width = 20;
    wsfase3.getColumn(3).width = 20;
    wsfase3.getColumn(4).width = 100;
    wsfase3.getColumn(5).width = 30;
    wsfase3.getColumn(6).width = 30;
    wsfase3.getColumn(7).width = 30;
    wsfase3.getColumn(8).width = 30;
    wsfase3.getColumn(9).width = 30;
    wsfase3.getColumn(10).width = 30;
    wsfase3.getColumn(11).width = 30;
    wsfase3.getColumn(12).width = 30;
    wsfase3.getColumn(13).width = 30;
    wsfase3.getColumn(14).width = 30;
    wsfase3.getColumn(15).width = 30;
    wsfase3.getColumn(16).width = 30;
    wsfase3.getColumn(17).width = 30;
    wsfase3.getColumn(18).width = 30;
    wsfase3.getColumn(19).width = 30;
    wsfase3.getColumn(20).width = 30;
    wsfase3.getColumn(21).width = 30;
    wsfase3.getColumn(22).width = 30;
    wsfase3.getColumn(23).width = 30;
    wsfase3.getColumn(24).width = 30;

    // 1
    row = 1;
    wsfase3.mergeCells('B1:J1');
    wsfase3.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsfase3, "B" + row, title, 14, true);
    wsfase3.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.setdatogeneral(wsfase3, "B" + row, "NUM. REAL", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "C" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "D" + row, "PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "E" + row, "Jefatura", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "F" + row, "Jefe de Area", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "G" + row, "Coordinador", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "H" + row, "Gerente Obra", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "I" + row, "Residente Obra", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "J" + row, "LP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "K" + row, "LP Reforzamiento", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "L" + row, "RP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "M" + row, "RP (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "N" + row, "RP (Nro Transformadores)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "O" + row, "RS (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "P" + row, "RS (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "Q" + row, "RS (Nro Luminarias)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "R" + row, "Costo Obra incl. IGV", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "S" + row, "Plazo de ejecución", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "T" + row, "Ficha Técnica", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "U" + row, "Relación Localidades", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "V" + row, "RS (Nro Usuarios)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "W" + row, "RS (Población Beneficiada)", 10, true, '91cff2');
    this.setdatogeneral(wsfase3, "X" + row, "FASE ACTUAL", 10, true, '91cff2');

    for (let i = 2; i <= 24; i++) {
      wsfase3.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsfase3.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    const detalle3 = detalles.filter(o => o.fase3 == 1);

    detalle3.forEach(detalle => {
      row++;
      this.dato_tabla(wsfase3, "B", row, detalle.c_codigomem);
      this.dato_tabla(wsfase3, "C", row, detalle.c_codigocui);
      this.dato_tabla(wsfase3, "D", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsfase3, "E", row, detalle.f3_a37);
      this.dato_tabla(wsfase3, "F", row, detalle.f3_a38);
      this.dato_tabla(wsfase3, "G", row, detalle.f3_a39);
      this.dato_tabla(wsfase3, "H", row, detalle.f3_a40);
      this.dato_tabla(wsfase3, "I", row, detalle.f3_a41);
      this.dato_tabla(wsfase3, "J", row, detalle.f3_a42);
      this.dato_tabla(wsfase3, "K", row, detalle.f3_a43);
      this.dato_tabla(wsfase3, "L", row, detalle.f3_a44);
      this.dato_tabla(wsfase3, "M", row, detalle.f3_a45);
      this.dato_tabla(wsfase3, "N", row, detalle.f3_a46);
      this.dato_tabla(wsfase3, "O", row, detalle.f3_a47);
      this.dato_tabla(wsfase3, "P", row, detalle.f3_a48);
      this.dato_tabla(wsfase3, "Q", row, detalle.f3_a49);
      this.dato_tabla(wsfase3, "R", row, detalle.f3_a50);
      this.dato_tabla(wsfase3, "S", row, detalle.f3_a51);
      this.dato_tabla(wsfase3, "T", row, detalle.f3_a52);
      this.dato_tabla(wsfase3, "U", row, detalle.f3_a53);
      this.dato_tabla(wsfase3, "V", row, detalle.f3_a80);
      this.dato_tabla(wsfase3, "W", row, detalle.f3_a84);
      if (detalle.n_idgen_fase == 1)
        this.dato_tabla(wsfase3, "X", row, 'ESTUDIO DE PREINVERSION');
      else if (detalle.n_idgen_fase == 2)
        this.dato_tabla(wsfase3, "X", row, 'ESTUDIO DEFINITIVO');
      else if (detalle.n_idgen_fase == 3)
        this.dato_tabla(wsfase3, "X", row, 'EJECUCIÓN');
      else if (detalle.n_idgen_fase == 4)
        this.dato_tabla(wsfase3, "X", row, 'SUPERVISION');
      else if (detalle.n_idgen_fase == 5)
        this.dato_tabla(wsfase3, "X", row, 'CIERRE');

      for (let i = 2; i <= 24; i++) {
        wsfase3.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    const wsfase4 = workbook.addWorksheet('SUPERVISION');

    wsfase4.getColumn(1).width = 5;
    wsfase4.getColumn(2).width = 20;
    wsfase4.getColumn(3).width = 20;
    wsfase4.getColumn(4).width = 100;
    wsfase4.getColumn(5).width = 30;
    wsfase4.getColumn(6).width = 30;
    wsfase4.getColumn(7).width = 30;
    wsfase4.getColumn(8).width = 30;
    wsfase4.getColumn(9).width = 30;
    wsfase4.getColumn(10).width = 30;
    wsfase4.getColumn(11).width = 30;
    wsfase4.getColumn(12).width = 30;

    // 1
    row = 1;
    wsfase4.mergeCells('B1:J1');
    wsfase4.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsfase4, "B" + row, title, 14, true);
    wsfase4.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.setdatogeneral(wsfase4, "B" + row, "NUM. REAL", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "C" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "D" + row, "PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "E" + row, "Jefatura", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "F" + row, "Jefe de Area", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "G" + row, "Coordinador", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "H" + row, "Gerente Supervisión", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "I" + row, "Jefe Supervisión", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "J" + row, "Costo Consultoria incl. IGV", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "K" + row, "Plazo de ejecución", 10, true, '91cff2');
    this.setdatogeneral(wsfase4, "L" + row, "FASE ACTUAL", 10, true, '91cff2');

    for (let i = 2; i <= 12; i++) {
      wsfase4.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsfase4.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    const detalle4 = detalles.filter(o => o.fase4 == 1);

    detalle4.forEach(detalle => {
      row++;
      this.dato_tabla(wsfase4, "B", row, detalle.c_codigomem);
      this.dato_tabla(wsfase4, "C", row, detalle.c_codigocui);
      this.dato_tabla(wsfase4, "D", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsfase4, "E", row, detalle.f4_a54);
      this.dato_tabla(wsfase4, "F", row, detalle.f4_a55);
      this.dato_tabla(wsfase4, "G", row, detalle.f4_a56);
      this.dato_tabla(wsfase4, "H", row, detalle.f4_a57);
      this.dato_tabla(wsfase4, "I", row, detalle.f4_a58);
      this.dato_tabla(wsfase4, "J", row, detalle.f4_a59);
      this.dato_tabla(wsfase4, "K", row, detalle.f4_a60);
      if (detalle.n_idgen_fase == 1)
        this.dato_tabla(wsfase4, "L", row, 'ESTUDIO DE PREINVERSION');
      else if (detalle.n_idgen_fase == 2)
        this.dato_tabla(wsfase4, "L", row, 'ESTUDIO DEFINITIVO');
      else if (detalle.n_idgen_fase == 3)
        this.dato_tabla(wsfase4, "L", row, 'EJECUCIÓN');
      else if (detalle.n_idgen_fase == 4)
        this.dato_tabla(wsfase4, "L", row, 'SUPERVISION');
      else if (detalle.n_idgen_fase == 5)
        this.dato_tabla(wsfase4, "L", row, 'CIERRE');

      for (let i = 2; i <= 12; i++) {
        wsfase4.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    const wsfase5 = workbook.addWorksheet('CIERRE');

    wsfase5.getColumn(1).width = 5;
    wsfase5.getColumn(2).width = 20;
    wsfase5.getColumn(3).width = 20;
    wsfase5.getColumn(4).width = 100;
    wsfase5.getColumn(5).width = 30;
    wsfase5.getColumn(6).width = 30;
    wsfase5.getColumn(7).width = 30;
    wsfase5.getColumn(8).width = 30;
    wsfase5.getColumn(9).width = 30;
    wsfase5.getColumn(10).width = 30;
    wsfase5.getColumn(11).width = 30;
    wsfase5.getColumn(12).width = 30;
    wsfase5.getColumn(13).width = 30;
    wsfase5.getColumn(14).width = 30;
    wsfase5.getColumn(15).width = 30;
    wsfase5.getColumn(16).width = 30;
    wsfase5.getColumn(17).width = 30;
    wsfase5.getColumn(18).width = 30;
    wsfase5.getColumn(19).width = 30;
    wsfase5.getColumn(20).width = 30;
    wsfase5.getColumn(21).width = 30;
    wsfase5.getColumn(22).width = 30;
    wsfase5.getColumn(23).width = 30;
    wsfase5.getColumn(24).width = 30;

    // 1
    row = 1;
    wsfase5.mergeCells('B1:J1');
    wsfase5.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsfase5, "B" + row, title, 14, true);
    wsfase5.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.setdatogeneral(wsfase5, "B" + row, "NUM. REAL", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "C" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "D" + row, "PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "E" + row, "Jefatura", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "F" + row, "Jefe de Area", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "G" + row, "Coordinador", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "H" + row, "Gerente Obra", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "I" + row, "Residente Obra", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "J" + row, "LP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "K" + row, "LP Reforzamiento", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "L" + row, "RP (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "M" + row, "RP (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "N" + row, "RP (Nro Transformadores)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "O" + row, "RS (Km)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "P" + row, "RS (Nro Localidades)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "Q" + row, "RS (Nro Luminarias)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "R" + row, "Costo Conforme a Obra Inc. IGV", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "S" + row, "Plazo de ejecución", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "T" + row, "Ficha Técnica", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "U" + row, "Relación Localidades", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "V" + row, "RS (Nro Usuarios)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "W" + row, "RS (Población Beneficiada)", 10, true, '91cff2');
    this.setdatogeneral(wsfase5, "X" + row, "FASE ACTUAL", 10, true, '91cff2');

    for (let i = 2; i <= 24; i++) {
      wsfase5.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsfase5.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    const detalle5 = detalles.filter(o => o.fase5 == 1);

    detalle5.forEach(detalle => {
      row++;
      this.dato_tabla(wsfase5, "B", row, detalle.c_codigomem);
      this.dato_tabla(wsfase5, "C", row, detalle.c_codigocui);
      this.dato_tabla(wsfase5, "D", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsfase5, "E", row, detalle.f5_a61);
      this.dato_tabla(wsfase5, "F", row, detalle.f5_a62);
      this.dato_tabla(wsfase5, "G", row, detalle.f5_a63);
      this.dato_tabla(wsfase5, "H", row, detalle.f5_a64);
      this.dato_tabla(wsfase5, "I", row, detalle.f5_a65);
      this.dato_tabla(wsfase5, "J", row, detalle.f5_a66);
      this.dato_tabla(wsfase5, "K", row, detalle.f5_a67);
      this.dato_tabla(wsfase5, "L", row, detalle.f5_a68);
      this.dato_tabla(wsfase5, "M", row, detalle.f5_a69);
      this.dato_tabla(wsfase5, "N", row, detalle.f5_a70);
      this.dato_tabla(wsfase5, "O", row, detalle.f5_a71);
      this.dato_tabla(wsfase5, "P", row, detalle.f5_a72);
      this.dato_tabla(wsfase5, "Q", row, detalle.f5_a73);
      this.dato_tabla(wsfase5, "R", row, detalle.f5_a74);
      this.dato_tabla(wsfase5, "S", row, detalle.f5_a75);
      this.dato_tabla(wsfase5, "T", row, detalle.f5_a76);
      this.dato_tabla(wsfase5, "U", row, detalle.f5_a77);
      this.dato_tabla(wsfase5, "V", row, detalle.f5_a81);
      this.dato_tabla(wsfase5, "W", row, detalle.f5_a85);
      if (detalle.n_idgen_fase == 1)
        this.dato_tabla(wsfase5, "X", row, 'ESTUDIO DE PREINVERSION');
      else if (detalle.n_idgen_fase == 2)
        this.dato_tabla(wsfase5, "X", row, 'ESTUDIO DEFINITIVO');
      else if (detalle.n_idgen_fase == 3)
        this.dato_tabla(wsfase5, "X", row, 'EJECUCIÓN');
      else if (detalle.n_idgen_fase == 4)
        this.dato_tabla(wsfase5, "X", row, 'SUPERVISION');
      else if (detalle.n_idgen_fase == 5)
        this.dato_tabla(wsfase5, "X", row, 'CIERRE');

      for (let i = 2; i <= 24; i++) {
        wsfase5.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'DatosAdicionales.xlsx');
    });
  }

  async generarUbigeoProyecto(detalles) {

    let title = 'RELACIÓN DE LOCALIDADES';

    const workbook = new Workbook();
    const wsfase1 = workbook.addWorksheet('LOCALIDADES');

    wsfase1.getColumn(1).width = 5;
    wsfase1.getColumn(2).width = 20;
    wsfase1.getColumn(3).width = 20;
    wsfase1.getColumn(4).width = 100;
    wsfase1.getColumn(5).width = 50;
    wsfase1.getColumn(6).width = 50;
    wsfase1.getColumn(7).width = 50;
    wsfase1.getColumn(8).width = 50;

    // 1
    let row = 1;
    wsfase1.mergeCells('B1:G1');
    wsfase1.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(wsfase1, "B" + row, title, 14, true);
    wsfase1.getCell('B1').font = {
      name: 'ARIAL',
      family: 4,
      size: 14,
      underline: true,
      bold: true
    };

    row++;
    row++;

    this.setdatogeneral(wsfase1, "B" + row, "NUM. REAL", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "C" + row, "CUI", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "D" + row, "PROYECTO", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "E" + row, "DEPARTAMENTO", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "F" + row, "PROVINCIA", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "G" + row, "DISTRITO", 10, true, '91cff2');
    this.setdatogeneral(wsfase1, "H" + row, "LOCALIDAD", 10, true, '91cff2');

    for (let i = 2; i <= 8; i++) {
      wsfase1.getRow(row).getCell(i).border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      }
    }

    wsfase1.getRow(row).alignment = { vertical: 'middle', horizontal: 'center' };

    //const detalle1 = detalles.filter(o => o.fase1 == 1);
    let nomdepartamento = "";
    let nomprovincia = "";
    let nomprovinciatxt = "";
    let nomdistrito = "";
    let nomdistritotxt = "";
    let num = 0;

    if (detalles.length > 0) {
      nomdepartamento = detalles[0].c_departamento;
    }

    detalles.forEach(detalle => {

      /*if (nomdepartamento == detalle.c_departamento) {
        num = num + 1;

        if (nomprovincia != detalle.c_provincia) {
          if (nomprovinciatxt == "")
            nomprovinciatxt = detalle.c_provincia;
          else
            nomprovinciatxt = nomprovinciatxt + ", " + detalle.c_provincia;

          nomprovincia = detalle.c_provincia;
        } else {
          nomprovincia = detalle.c_provincia;
        }

        if (nomdistrito != detalle.c_distrito) {
          if (nomdistritotxt == "")
            nomdistritotxt = detalle.c_distrito;
          else
            nomdistritotxt = nomdistritotxt + ", " + detalle.c_distrito;

          nomdistrito = detalle.c_distrito;
        } else {
          nomdistrito = detalle.c_distrito;
        }

      } else {
        num = 1;
        nomdepartamento = detalle.c_departamento;
        nomprovincia = "";
        nomprovinciatxt = "";
        nomdistrito = "";
        nomdistritotxt = "";

        if (nomprovincia != detalle.c_provincia) {
          if (nomprovinciatxt == "")
            nomprovinciatxt = detalle.c_provincia;
          else
            nomprovinciatxt = nomprovinciatxt + ", " + detalle.c_provincia;

          nomprovincia = detalle.c_provincia;
        } else {
          nomprovincia = detalle.c_provincia;
        }

        if (nomdistrito != detalle.c_distrito) {
          if (nomdistritotxt == "")
            nomdistritotxt = detalle.c_distrito;
          else
            nomdistritotxt = nomdistritotxt + ", " + detalle.c_distrito;

          nomdistrito = detalle.c_distrito;
        } else {
          nomdistrito = detalle.c_distrito;
        }
      }

      if (num == 1)
        row++;

      this.dato_tabla(wsfase1, "B", row, detalle.c_codigomem);
      this.dato_tabla(wsfase1, "C", row, detalle.c_codigocui);
      this.dato_tabla(wsfase1, "D", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsfase1, "E", row, detalle.c_departamento);
      this.dato_tabla(wsfase1, "F", row, nomprovinciatxt);
      this.dato_tabla(wsfase1, "G", row, nomdistritotxt);*/

      row++;

      this.dato_tabla(wsfase1, "B", row, detalle.c_codigomem);
      this.dato_tabla(wsfase1, "C", row, detalle.c_codigocui);
      this.dato_tabla(wsfase1, "D", row, detalle.c_nombreproyecto);
      this.dato_tabla(wsfase1, "E", row, detalle.c_departamento);
      this.dato_tabla(wsfase1, "F", row, detalle.c_provincia);
      this.dato_tabla(wsfase1, "G", row, detalle.c_distrito);
      this.dato_tabla(wsfase1, "H", row, detalle.c_centropoblado);

      for (let i = 2; i <= 8; i++) {
        wsfase1.getRow(row).getCell(i).border = {
          left: { style: 'thin' },
          right: { style: 'thin' },
          top: { style: 'thin' },
          bottom: { style: 'thin' },
        }
      }
    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Localidades.xlsx');
    });
  }
}
