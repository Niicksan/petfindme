import { FormGroup, ValidatorFn } from "@angular/forms";

export function comparePasswordsValidator(givenPassword: string, givenRepass: string): ValidatorFn {
    return (control) => {
        const group = control as FormGroup;
        const password = group.get(givenPassword);
        const repass = group.get(givenRepass)
        return password?.value === repass?.value ? null : { comparePasswordsValidator: true };
    };
}