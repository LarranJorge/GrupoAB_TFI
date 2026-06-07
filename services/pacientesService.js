import { pacientesDb } from "../database/pacientesDb.js";

export const pacientesService = {
  obtenerTodos: async () => {
    return await pacientesDb.getAll();
  },

  obtenerPorId: async (id) => {
    return await pacientesDb.getById(id);
  },

  registrarPaciente: async (data) => {
    return await pacientesDb.create(data);
  },

  modificarPaciente: async (id, dataUpdate) => {
    console.log("--- Debug PUT ---");
    console.log("ID recibido:", id);
    console.log("Datos recibidos:", dataUpdate);

    return await pacientesDb.update(id, dataUpdate);
  },

  eliminarPaciente: async (id) => {
    return await pacientesDb.softDelete(id);
  },
};
