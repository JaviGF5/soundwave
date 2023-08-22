import * as Yup from 'yup';

export function initialValues() {
    return {
        username: "",
        email: "",
        password: "",
    }
}

export function validationSchema() {
    return Yup.object({
        username: 
            Yup.string()
            .max(25, "*Máximo 25 carácteres")
            .required("*Campo obligatorio"),
        email: 
            Yup.string()
            .max(40, "*Máximo 40 carácteres")
            .email("*No es un correo válido")
            .required("*Campo obligatorio"),
        password: 
            Yup.string()
            .max(30, "*Máximo 30 carácteres")
            .min(8, "*Mínimo 8 carácteres")
            .matches(/[0-9]/, "*Se requiere al menos un número")
            .matches(/[A-Za-z]/, "*Se requiere al menos una letra")
            .required("*Campo obligatorio"),
        
    })
}


