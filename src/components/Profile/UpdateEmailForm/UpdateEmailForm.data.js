import * as Yup from 'yup';


export function initialValues() {
    return {
        email: "",
        password: "",
    }
}

export function validationSchema() {
    return Yup.object({
        email: 
            Yup.string()
            .max(40, "*Máximo 40 carácteres")
            .email("*No es un correo válido")
            .required("*Campo obligatorio"),
        password:
            Yup.string()            
            .max(25, "*Contraseña incorrecta")
            .min(8, "*Contraseña incorrecta")
            .matches(/[0-9]/, "*Contraseña incorrecta")
            .matches(/[A-Za-z]/, "*Contraseña incorrecta")
            .required("*Campo obligatorio"),
    })
}