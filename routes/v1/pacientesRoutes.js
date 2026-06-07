import { Router } from "express";
import { check, param } from "express-validator";
import * as pacientesCtrl from "../../controllers/pacientesController.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

router.get("/", pacientesCtrl.getPacientes);

router.get("/:id", [ 
  param("id", "El ID debe ser un número entero").isInt(),
  validarCampos
], pacientesCtrl.getPacienteById);

router.post("/", [
    check("documento", "El número de documento es obligatorio").notEmpty().isInt(),
    check("apellido", "El apellido es obligatorio").notEmpty().isLength({ max: 100 }),
    check("nombres", "El nombre es obligatorio").notEmpty().isLength({ max: 100 }),
    check("email", "El email debe ser válido").notEmpty().isEmail(),
    check("contrasenia", "La contraseña es obligatoria").notEmpty(),
    check("id_obra_social", "El ID de la obra social es obligatorio y debe ser entero").notEmpty().isInt(),
    validarCampos
  ], pacientesCtrl.createPaciente);

router.put(
  "/:id",
  [
    param("id", "El ID debe ser un número entero").isInt(),
    check("documento", "El número de documento debe ser entero").optional().isInt(),
    check("apellido", "El apellido es obligatorio").optional().isLength({ max: 100 }),
    check("nombres", "El nombre es obligatorio").optional().isLength({ max: 100 }),
    check("email", "El email debe ser válido").optional().isEmail(),
    check("id_obra_social", "El ID de la obra social es obligatorio y debe ser entero").optional().isInt(),
    validarCampos,
  ], pacientesCtrl.updatePaciente,
);

router.delete("/:id", [
  param("id", "El ID debe ser un número entero").isInt(),
  validarCampos
], pacientesCtrl.deletePaciente);

export default router;
