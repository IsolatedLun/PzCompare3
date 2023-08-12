export interface DB_Model {
	id: number;
	date_created: string;
}

export type Some<T> = T | null;
export type Enum = Record<string | number, string | number>;