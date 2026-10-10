# table-csv

A lightweight vibecoded TypeScript library for converting TypeScript objects into CSV files and downloading them directly in the browser.

## Installation

```bash
npm install table-csv
```

## Usage

### Basic example

```typescript
import { TableCSV } from 'table-csv';

const data = [
  { name: 'Amine', age: 28, city: 'Algiers' },
  { name: 'Daniel', age: 25, city: 'Paris' },
  { name: 'Aziz', age: 30, city: 'Cairo' }
];

const csv = new TableCSV({ data });

// Generate CSV content
console.log(csv.toCSV());

// Download as a CSV file
csv.download('users.csv');
```

### Configuration

Pass options to the constructor:

```typescript
const csv = new TableCSV({
  data,
  filename: "records.csv",
  delimiter: ';',
  includeHeaders: true,
});
```

| Option | Type | Default | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>[]` | Required | Array of objects to convert |
| `filename` | `string` | `table.csv` | Filename for the generated CSV file |
| `delimiter` | `string` | `,` | Character separating CSV fields |
| `includeHeaders` | `boolean` | `true` | Whether to include column headers |

## API

### `new TableCSV(options)`

Creates a CSV generator instance.

### `toCSV(): string`

Returns the generated CSV content as a string. Useful for previewing, processing, or sending the result elsewhere.

```typescript
const content = csv.toCSV();
```

### `download(filename?: string): void`

Downloads the generated CSV file in the browser.

```typescript
csv.download('report.csv');
```

The default filename is `table.csv`.

## Features

- TypeScript support and declaration files
- Configurable field delimiter
- Optional column headers
- CSV field escaping for commas, quotes, and newlines
- Browser-based file downloads
- UTF-8 BOM for improved compatibility with spreadsheet applications

## Development

Build the library:

```bash
npm run build
```

Create a package archive for local testing:

```bash
npm pack
```

Install the generated `.tgz` file in another project to test the package.

## Requirements

- Node.js
- A modern browser for the `download()` method

`toCSV()` can also be used in environments where browser APIs are unavailable.

## License

MIT
