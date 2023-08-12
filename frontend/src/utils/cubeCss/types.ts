export interface Props_CubeCSS {
	blockClass?: string;
	compostClass?: string;
	utilClass?: string;
}

export interface Props_CubeCSS_API {
	extend: (_block: string, _compost: string, _util: string) => Props_CubeCSS_API;
    toString: () => string;
}