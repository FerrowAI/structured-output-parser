# Structured Output Parser

Parse and validate JSON from LLM responses with zero runtime overhead.

```javascript
const parser = new StructuredParser(schema);
const result = parser.parse(llmOutput);
// Type-safe, validated result
```

## Why
- LLMs sometimes return invalid JSON
- Manual parsing = crashes
- This catches, fixes, and validates

## Features
- ✓ Auto-repair malformed JSON
- ✓ Schema validation (Zod-compatible)
- ✓ Detailed error messages
- ✓ TypeScript-first
- ✓ Works with Claude, GPT, Llama

## Example
```javascript
const schema = z.object({ name: z.string(), age: z.number() });
const text = 'name: "John", age: "30"}'; // Invalid JSON
const data = parser.parse(text, schema); // Fixed & validated
```

## License: MIT
