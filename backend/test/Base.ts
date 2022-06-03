import { EncryptUtil } from '../src/shared/utils/EncryptUtil'
import { serviceProto, ServiceType } from '../src/shared/protocols/serviceProto';
import { BaseHttpClient, HttpClient } from 'tsrpc';
import { ResLogin } from '../src/shared/protocols/Login/PtlLogin';


export class TestApiClient {
    private static __instance?: TestApiClient;

    static get instance(): TestApiClient {

        if (!this.__instance) {

            this.__instance = new TestApiClient()

        }

        return this.__instance

    }

    private _client: BaseHttpClient<ServiceType>;

    constructor() {
        this._client = new HttpClient(serviceProto, {
            server: 'https://api.walkidz.com/release/'
            // server: 'http://127.0.0.1:9000'
        })

        // this._client.flows.preSendBufferFlow.push(v => {
        //     v.buf = EncryptUtil.encrypt(v.buf)
        //     return v;
        // })

        // this._client.flows.preRecvBufferFlow.push(v => {
        //     v.buf = EncryptUtil.decrypt(v.buf)
        //     return v
        // })

    }

    resLogin?: ResLogin;

    callApi: HttpClient<ServiceType>['callApi'] = (apiName, req) => {
        if (this.resLogin) {
            req.sso = this.resLogin.sso
            // req.userId = 'oDfcY69wA2QERN9mBhuMOvCFsPxQ'
        }
        return this._client.callApi(apiName, req);
    }

    async login() {

        let ret = await this._client.callApi('Login/TestLogin', {
            userId: 'oDfcY69wA2QERN9mBhuMOvCFsPxQ'
        })

        if (ret.isSucc) {
            this.resLogin = ret.res
        }

        return this.resLogin;
    }

}