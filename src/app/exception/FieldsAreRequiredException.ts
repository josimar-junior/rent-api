export default class FieldsAreRequiredException extends Error {
    constructor(message: string) {
        super(message);
    }
}