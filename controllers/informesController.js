import PDFDocument from 'pdfkit';
import { pool } from '../database/conexion.js';

export const generarPDFEstadisticas = async (req, res, next) => {
    try {

        const [rows] = await pool.query('CALL generar_estadisticas_turnos()');
        
        const estadisticas = rows[0][0]; 

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=estadisticas_clinica.pdf');

        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(res);

        doc.fontSize(22).text('Reporte General de la Clínica', { align: 'center' });
        doc.moveDown(2); 
        
        doc.fontSize(14).text(`Total de Turnos Registrados: ${estadisticas.total_turnos}`);
        doc.moveDown(0.5);
        doc.text(`Turnos Efectivamente Atendidos: ${estadisticas.turnos_atendidos}`);
        doc.moveDown(0.5);
        doc.text(`Cantidad de Pacientes Registrados: ${estadisticas.total_pacientes}`);
        doc.moveDown(0.5);
        doc.text(`Plantilla de Médicos Activos: ${estadisticas.total_medicos}`);
        doc.moveDown(0.5);
        doc.text(`Obras Sociales Habilitadas: ${estadisticas.total_obras_sociales}`);
        
        doc.moveDown(3);
        doc.fontSize(10).text(`Documento generado el: ${new Date().toLocaleString()}`, { align: 'right' });

        doc.end();

    } catch (error) {
        next(error);
    }
};