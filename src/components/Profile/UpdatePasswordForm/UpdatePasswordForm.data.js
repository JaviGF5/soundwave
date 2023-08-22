import * as Yup from 'yup';


export function initialValues() {
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: "",
    }
}

export function validationSchema() {
    return Yup.object({
        password:
            Yup.string()            
            .max(25, "*Contraseña incorrecta")
            .min(8, "*Contraseña incorrecta")
            .matches(/[0-9]/, "*Contraseña incorrecta")
            .matches(/[A-Za-z]/, "*Contraseña incorrecta")
            .required("*Campo obligatorio"),
        newPassword:
            Yup.string()
            .max(30, "*Máximo 30 carácteres")
            .min(8, "*Mínimo 8 carácteres")
            .matches(/[0-9]/, "*Se requiere al menos un número")
            .matches(/[A-Za-z]/, "*Se requiere al menos una letra")
            .required("*Campo obligatorio"),
        repeatNewPassword:
            Yup.string()
            .max(30, "*Máximo 30 carácteres")
            .min(8, "*Mínimo 8 carácteres")
            .matches(/[0-9]/, "*Se requiere al menos un número")
            .matches(/[A-Za-z]/, "*Se requiere al menos una letra")
            .required("*Campo obligatorio")
            .oneOf([Yup.ref("newPassword")], "La contraseña no coincide"),
    })
}