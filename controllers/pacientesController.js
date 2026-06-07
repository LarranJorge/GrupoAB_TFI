import { pacientesService } from "../services/pacientesService.js";

export const getPacientes = async (req, res) => {
  try {
    const pacientes = await pacientesService.obtenerTodos();
    res.status(200).json({ estado: true, data: pacientes });
  } catch (error) {
    res
      .status(500)
      .json({ estado: false, msg: "Error al obtener los pacientes" });
  }
};

export const getPacienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await pacientesService.obtenerPorId(id);

    if (!paciente) {
      return res
        .status(404)
        .json({ estado: false, msg: "Paciente no encontrado" });
    }

    res.status(200).json({ estado: true, data: paciente });
  } catch (error) {
    res
      .status(500)
      .json({ estado: false, msg: "Error al obtener el paciente" });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const id = await pacientesService.registrarPaciente(req.body);
    res
      .status(201)
      .json({ estado: true, msg: `Paciente registrado con éxito. ID: ${id}` });
  } catch (error) {
    res
      .status(500)
      .json({ estado: false, msg: "Error al registrar el paciente" });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { documento, apellido, nombres, email, foto_path, id_obra_social } =
      req.body;

    const actualizado = await pacientesService.modificarPaciente(id, {
      documento,
      apellido,
      nombres,
      email,
      foto_path,
      id_obra_social,
    });

    if (!actualizado) {
      return res
        .status(404)
        .json({ estado: false, msg: "No se encontró el paciente para editar" });
    }

    res
      .status(200)
      .json({ estado: true, msg: "Paciente actualizado correctamente" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ estado: false, msg: error.message });
    }

    res
      .status(500)
      .json({ estado: false, msg: "Error al actualizar el paciente" });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await pacientesService.eliminarPaciente(id);

    if (!eliminado) {
      return res
        .status(404)
        .json({ estado: false, msg: "No se encontró el paciente" });
    }
    res
      .status(200)
      .json({ estado: true, msg: "Paciente dado de baja correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ estado: false, msg: "Error al eliminar el paciente" });
  }
};
