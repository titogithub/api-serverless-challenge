import { isClassValidatorError } from '../../../../common/middleware/middyErrorHandler.middleware';
import { validate } from '../request';

export const validBodyRequest = {
  dni: 1,
  nombre: 'nombre',
  edad: 1,
  cargo: 'cargo',
};

describe('Validate create empleado body', () => {
  it('should throw an error when body is invalid', async () => {
    const invalidBodyRequest = {
      nombre: 'nombre',
      edad: 1,
      cargo: 'cargo',
    };

    try {
      await validate(invalidBodyRequest);
      expect(false).toBe(true);
    } catch (error) {
      expect(isClassValidatorError(error)).toBeTruthy();
    }
  });

  it('should not throw an error when body is valid', async () => {
    try {
      const createEmpeladoDTO = await validate(validBodyRequest);
      expect(createEmpeladoDTO).toMatchObject(validBodyRequest)
    } catch (error) {
      expect(false).toBe(true);
    }
  });
});
