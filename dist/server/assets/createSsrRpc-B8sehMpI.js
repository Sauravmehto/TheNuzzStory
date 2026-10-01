import { n as TSS_SERVER_FUNCTION, r as getServerFnById } from "../server.js";
import { u as supabase } from "./catalog-db-DaRD-zQ5.js";
//#region src/lib/admin/session.ts
async function getAccessToken() {
	const { data } = await supabase.auth.getSession();
	return data.session?.access_token ?? null;
}
//#endregion
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { getAccessToken as n, createSsrRpc as t };
