import { z } from 'zod';
import { createEnv } from '../../src/utils/envValidator';

// Define some schemas to test with
const validSchema = z.object({
  API_KEY: z.string(),
  PORT: z.number().min(1).max(65535),
});

describe('createEnv', () => {
  it('should return runtime values when skipValidation is true', () => {
    const env = createEnv({
      envSchema: validSchema,
      runtimeValues: { API_KEY: 'abc123', PORT: 3000 },
      skipValidation: true,
    });

    expect(env).toEqual({ API_KEY: 'abc123', PORT: 3000 });
  });

  it('should validate and return data if runtime values are valid', () => {
    const env = createEnv({
      envSchema: validSchema,
      runtimeValues: { API_KEY: 'abc123', PORT: 3000 },
      skipValidation: false,
    });

    expect(env).toEqual({ API_KEY: 'abc123', PORT: 3000 });
  });

  it('should throw an error if runtime values are invalid', () => {
    expect(() =>
      createEnv({
        envSchema: validSchema,
        runtimeValues: { API_KEY: 123, PORT: 'not-a-number' },
        skipValidation: false,
      }),
    ).toThrowErrorMatchingSnapshot();
  });

  it('should handle optional fields correctly', () => {
    const schemaWithOptional = z.object({
      API_KEY: z.string().optional(),
      PORT: z.number().min(1).max(65535).optional(),
    });

    const env = createEnv({
      envSchema: schemaWithOptional,
      runtimeValues: {
        API_KEY: undefined,
        PORT: undefined,
      },
      skipValidation: false,
    });

    expect(env).toEqual({});
  });

  it('should throw an error if a required field is missing', () => {
    expect(() =>
      createEnv({
        envSchema: validSchema,
        runtimeValues: { API_KEY: undefined, PORT: 3000 },
        skipValidation: false,
      }),
    ).toThrowErrorMatchingSnapshot();
  });

  it('should pass with a schema expecting specific value types', () => {
    const strictSchema = z.object({
      MODE: z.enum(['development', 'production']),
      ENABLE_FEATURE: z.boolean(),
    });

    const env = createEnv({
      envSchema: strictSchema,
      runtimeValues: { MODE: 'development', ENABLE_FEATURE: true },
      skipValidation: false,
    });

    expect(env).toEqual({ MODE: 'development', ENABLE_FEATURE: true });
  });

  it('should throw if schema validation fails for nested structures', () => {
    const nestedSchema = z.object({
      CONFIG: z.object({
        HOST: z.string().url(),
        PORT: z.number().int(),
      }),
    });

    expect(() =>
      createEnv({
        envSchema: nestedSchema,
        runtimeValues: { CONFIG: { HOST: 'invalid-url', PORT: 3000 } },
        skipValidation: false,
      }),
    ).toThrowErrorMatchingSnapshot();
  });
});
