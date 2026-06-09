import { pool } from './conexion.js';

export const turnosReservasDb = {

    create: async (turnoReserva) => {
        const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } = turnoReserva;
        const query = `
            INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]);
        if (result.affectedRows === 0) return null;
        return result.insertId;
    },

    getByMedico: async (id_usuario) => {
        const query = `
            SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atendido,
                   CONCAT(up.nombres, ' ', up.apellido) AS paciente
            FROM usuarios AS u
            INNER JOIN medicos AS m ON m.id_usuario = u.id_usuario
            INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
            INNER JOIN pacientes AS p ON p.id_paciente = tr.id_paciente
            INNER JOIN usuarios AS up ON up.id_usuario = p.id_usuario
            WHERE u.id_usuario = ? AND tr.activo = 1
        `;
        const [rows] = await pool.execute(query, [id_usuario]);
        return rows;
    },

    getByPaciente: async (id_usuario) => {
        const query = `
            SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atendido,
                   CONCAT(um.nombres, ' ', um.apellido) AS medico
            FROM usuarios AS u
            INNER JOIN pacientes AS p ON p.id_usuario = u.id_usuario
            INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
            INNER JOIN medicos AS m ON m.id_medico = tr.id_medico
            INNER JOIN usuarios AS um ON um.id_usuario = m.id_usuario
            WHERE u.id_usuario = ? AND tr.activo = 1
        `;
        const [rows] = await pool.execute(query, [id_usuario]);
        return rows;
    },

    getById: async (id) => {
        const query = `SELECT * FROM turnos_reservas WHERE id_turno_reserva = ? AND activo = 1`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    marcarAtendido: async (id_turno_reserva) => {
        const query = `UPDATE turnos_reservas SET atendido = 1 WHERE id_turno_reserva = ? AND activo = 1`;
        const [result] = await pool.execute(query, [id_turno_reserva]);
        return result.affectedRows > 0;
    },

    softDelete: async (id_turno_reserva) => {
    const query = `UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ?`;
    const [result] = await pool.execute(query, [id_turno_reserva]);
    return result.affectedRows > 0;
    }
};