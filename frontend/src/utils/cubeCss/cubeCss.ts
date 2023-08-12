import type { Props_CubeCSS, Props_CubeCSS_API } from './types';

export function cubeCss(block: string, compost: string, util: string): Props_CubeCSS_API {
	return {
		extend: (_block: string, _compost: string, _util: string) => {
			return cubeCss(
				`${block} ${_block}`, 
				`${compost} ${_compost}`, 
				`${util} ${_util}`,
			)
		},
		toString: () => `[ ${block} ] [ ${compost} ] [ ${util} ]`
	}
}