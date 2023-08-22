import * as Yup from 'yup';

export function initialValues(name) {
    return {
       displayName: name || "",
    }
}

export function validationSchema() {
    return Yup.object({
        displayName: 
            Yup.string()
            .max(25, "*Máximo 25 carácteres")
            .required("*Campo obligatorio"),
    })
}