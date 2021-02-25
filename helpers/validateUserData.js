const { generatePasswordHash } = require('./generatePasswordHash');

/**
 * Validate user data
 * @param userData data
 * @param isAdmin is admin data or user data
 * @returns {{isValid: boolean, validatedUserData: {}}}
 */
module.exports.validateUserData = (userData, isAdmin) => {
    let isValid = true;
    let validatedUserData = {};
    let allowedValues = [
        { value: 'firstName', isRequired: true },
        { value: 'lastName', isRequired: true },
        { value: 'email', isRequired: true },
        { value: 'password', isRequired: true }
    ];


    for (let i = 0, len = allowedValues.length; i < len; i++) {
        const element = allowedValues[i];

        if (userData[element.value]) {
            validatedUserData[element.value] = userData[element.value];
        } else {
            if (element.isRequired) {
                isValid = false;
                break;
            }
        }
    }

    if (isValid) {
        validatedUserData.role = isAdmin === true ? 'Admin' : 'User';
        validatedUserData.password = generatePasswordHash(validatedUserData.password);
    }

    return {
        validatedUserData,
        isValid
    };
};
