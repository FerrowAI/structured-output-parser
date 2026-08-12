export interface ParseOptions {
  strict?: boolean;
  fallback?: unknown;
}

export class StructuredParser {
  private schema?: any;

  constructor(schema?: any) {
    this.schema = schema;
  }

  parse(text: string, schema?: any, options: ParseOptions = {}): any {
    const targetSchema = schema || this.schema;

    try {
      return JSON.parse(text);
    } catch {
      // Try to extract JSON object from text
      const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch {
          if (!options.strict && options.fallback !== undefined) {
            return options.fallback;
          }
          throw new Error(`Failed to parse structured output: ${text}`);
        }
      }
      throw new Error(`No JSON found in output: ${text}`);
    }
  }

  validate(data: any, schema: any): boolean {
    if (!schema) return true;
    // Basic validation - can be extended with proper schema validation
    return typeof data === 'object' && data !== null;
  }
}
