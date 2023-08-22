import * as Yup from 'yup';


export function initialValues() {
    return {
        file: null,
        artist: "",
        name: "",
    }
}

export function validationSchema() {
    return Yup.object({
        file: 
            Yup.string()
            .required("Campo obligatorio"),
        artist:
            Yup.string()
            .required("Campo obligatorio"),
        name:
            Yup.string()
            .max(40, "*Máximo 40 carácteres")
            .required("Campo obligatorio"),
        })
}