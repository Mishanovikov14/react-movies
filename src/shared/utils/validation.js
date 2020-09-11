export const ALPHABETIC_REG_EXP = /^[a-z]+$/i;
export const NUMERIC_REG_EXP = /^[0-9]+$/;
export const EMAIL_REG_EXP = /^[a-z_\-0-9.]+@[a-z]+\.[a-z]{2,3}$/i;

export const validation = {
    alphabetic(regExp, recivedValue) {
       if (regExp.test(recivedValue)) return null;

       if (recivedValue === '') return;

       return 'Provided value should be alphabetic only.';
    },

    numeric(regExp, recivedValue) {
        if (regExp.test(recivedValue)) return null;

        if (recivedValue === '') return ;

        return 'Provided value should be numeric only.';
    },

    email(regExp, recivedValue) {
        if (regExp.test(recivedValue)) return null;

        if (recivedValue === '') return;

        return 'Provided value should be an email adress.';
    },

    min(expectedValue, recivedValue) {
        if (recivedValue >= expectedValue) return null;

        if (recivedValue === '') return;

        return `Provided value should be minimum ${expectedValue}.`;
    },

    max(expectedValue, recivedValue) {
        if (recivedValue <= expectedValue) return null;

        if (recivedValue === '') return;

        return `Provided value should be maximum ${expectedValue}.`;
    }, 


    minLength(expectedValue, recivedValue) {
        if (recivedValue.length >= expectedValue) return null;

        if (recivedValue === '') return;

        return `Provided value should be at least ${expectedValue} characters.`;
    }
};