# Structured Output Parser

Extract JSON from LLM text output, with a fallback if it can't be parsed.

```javascript
const parser = new StructuredParser();
const result = parser.parse(llmOutput);
```

## Why

LLMs sometimes wrap JSON in prose, markdown fences, or return slightly malformed JSON. Manually handling that on every call is annoying.

## What it does

- Tries `JSON.parse()` on the raw text first.
- If that fails, looks for the first `{...}` or `[...]` block in the text and tries parsing that.
- If both fail and you passed a `fallback` option, returns the fallback instead of throwing.
- If both fail and there's no fallback, throws an `Error` with the original text.

## What it does NOT do

- It does not validate against a schema. The `schema` argument to `.parse()` is accepted but currently unused — pass it if you want (e.g. for your own future integration), but nothing in this library checks the parsed data against it.
- No Zod integration, despite earlier versions of this README claiming one. If you want schema validation, run the parsed result through your own validator (Zod, Ajv, etc.) after calling `.parse()`.

## Example

```javascript
const parser = new StructuredParser();
const text = 'Sure, here you go: {"name": "John", "age": 30}';
const data = parser.parse(text); // { name: "John", age: 30 }

// with a fallback
const safe = parser.parse('not json at all', undefined, { fallback: {} }); // {}
```

## License: MIT

---

Sponsored by [Ferrow](https://ferrow.ai)

---
Part of the [ferrow-toolkit](https://github.com/Ruzylo-cloud/ferrow-toolkit) collection · Sponsored by [Ferrow](https://ferrow.ai)
