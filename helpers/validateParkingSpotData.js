module.exports.validateParkingSpotData = (spotData) => {
    let isValid = true;
    let validatedSpotData = {};
    let allowedValues = [
        { value: 'spotNumber', isRequired: true },
        { value: 'floorNumber', isRequired: true },
    ];

    for (let i = 0, len = allowedValues.length; i < len; i++) {
        const element = allowedValues[i];

        if (spotData[element.value]) {
            validatedSpotData[element.value] = spotData[element.value];
        } else {
            if (element.isRequired) {
                isValid = false;
                break;
            }
        }
    }

    return {
        validatedSpotData,
        isValid
    };
};
