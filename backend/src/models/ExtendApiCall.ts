import { ResLogin } from "../shared/protocols/Login/PtlLogin";
declare module 'tsrpc' {
    export interface ApiCall {
        user: ResLogin
    }
}