import {Utils} from "./Utils";
import axios from "axios";
import {BASE_URL} from "../index";
import {ElysiaCustomStatusResponse} from "elysia/dist/error";

export class Auth {
    db: Utils = new Utils();

    checkAuth(id: string, password : string): boolean {
        for (const auth of this.db.getData().user) {
            if (auth.id === id && auth.password === password) {
                return true;
            }
        }
        return false;
    }
}

export async function verifyPermission(cookie: string, module: string): Promise<boolean> {
    try {
        const response = await axios.post(`${BASE_URL}/auth/check`, {
            cookie: cookie,
            module: module
        });
        return response.data === true;
    } catch (error) {
        console.error('Error verifying module:', error);
        return false;
    }
}

export async function checkJWT(cookie: string, module: string, error: (code: number, response?: string) => ElysiaCustomStatusResponse<number, string>) {
    if (!await verifyPermission(cookie, module)) {
        return error(401, 'Unauthorized')
    }
}