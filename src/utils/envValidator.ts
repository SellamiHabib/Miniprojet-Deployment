import type { z, ZodType } from "zod";

type EnvSchema = Record<string, ZodType<any, any>>;

interface CreateEnvParams<D extends EnvSchema> {
  envSchema: z.ZodObject<D>;
  runtimeValues: { [K in keyof D]: any };
  skipValidation: boolean;
}

export function createEnv<T extends EnvSchema>(
  params: CreateEnvParams<T>,
): z.infer<z.ZodObject<T>> {
  const { envSchema, runtimeValues } = params;

  if (params.skipValidation) {
    return runtimeValues as any;
  }
  // 1. Validate the runtimeValues with zod
  const validationResult = envSchema.safeParse(runtimeValues);

  if (!validationResult.success) {
    throw new Error(validationResult.error.toString());
  }
  // 2. Return a typed response
  return validationResult.data;
}
