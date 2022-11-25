import { object, string, number } from 'yup';
class Schema {
    constructor() {
        this.shape = object().shape({
            username: string().required(),
            passwordHash: string().required().min(3),
            role: string().oneOf(['manager', 'developer'])
        });
    }
    async validate(data) {
        await this.shape.validate(data);
    }
}
export default Schema;
