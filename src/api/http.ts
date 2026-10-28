import { z } from "zod";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export async function http<T>(
  path: string,
  schema: z.ZodType<T>,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    throw new HttpError(response.status, `HTTP ${response.status}`);
  }
  const text = await response.text();
  const data: unknown = text === "" ? undefined : JSON.parse(text);
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(z.prettifyError(result.error));
    throw new Error("réponse inattendue du serveur");
  }
  return result.data;
}
