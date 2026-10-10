export interface TableCSVOptions {
	data: Record<string, unknown>[];
	delimiter?: string;
    filename?: string;
	includeHeaders?: boolean;
}

export class TableCSV {
	private data: Record<string, unknown>[];
    private filename: string = "table.csv";
	private delimiter: string;
	private includeHeaders: boolean;

	constructor({
		data,
		delimiter = ",",
        filename,
		includeHeaders = true,
	}: TableCSVOptions) {
		this.data = data;
		this.delimiter = delimiter;
		this.includeHeaders = includeHeaders;
        if (!filename?.endsWith(".csv")) {
            this.filename = filename + ".csv";
        }
	}

	toCSV(): string {
		if (!this.data.length) return "";

		const escape = (value: unknown) => {
			const str = String(value ?? "");
			return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
		};

		const headers = Object.keys(this.data[0]);

		const rows = this.data.map((row) =>
			headers.map((key) => escape(row[key])).join(this.delimiter),
		);

		if (this.includeHeaders) {
			rows.unshift(headers.map(escape).join(this.delimiter));
		}

		return rows.join("\r\n");
	}

	download(): void {
		const blob = new Blob(["\uFEFF", this.toCSV()], {
			type: "text/csv;charset=utf-8;",
		});

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		link.download = this.filename;
		link.click();

		URL.revokeObjectURL(url);
	}
}
