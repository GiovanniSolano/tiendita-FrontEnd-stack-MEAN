export class Usuario {

    nombre: String;
    fechaNacimiento: Date;
    role?: String;
    telefono: String;
    correo: String;
    password?: String;
    uid?: String;

    constructor(pNombre: String, pFechaNacimiento: Date, pRole: String, pTelefono: String,
         pCorreo: String, pPassword: String, pUid: String) {                

        this.nombre = pNombre;
        this.fechaNacimiento = pFechaNacimiento;
        this.role = pRole;
        this.telefono = pTelefono;
        this.correo = pCorreo;
        this.password = pPassword;
        this.uid = pUid;

    }

}