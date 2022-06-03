import path from 'path';
import { TsrpcConfig } from 'tsrpc-cli';

const tsrpcConf: TsrpcConfig = {
    // Generate ServiceProto
    proto: [
        {
            ptlDir: 'src/shared/protocols', // Protocol dir
            output: 'src/shared/protocols/serviceProto.ts', // Path for generated ServiceProto
            apiDir: 'src/api',   // API dir
            newPtlTemplate: (basename, ptlPath, ptlDir) => `
import { BaseRequest, BaseResponse, BaseConf } from "./${path.relative(path.dirname(ptlPath), path.join(ptlDir, 'Base')).replace(/\\/g, '/')}";

/**
 * ${basename} 请求-[XXX]
 */
export interface Req${basename} extends BaseRequest {

}

/**
 * ${basename} 返回-[XXX]
 */
export interface Res${basename} extends BaseResponse {

}

export const conf: BaseConf = {
    needLogin: true
} 
`,
            docDir: 'docs'
        },
    ],
    // Sync shared code
    sync: [
        {
            from: 'src/shared',
            to: '../frontend/src/shared',
            type: 'copy'     // Change this to 'copy' if your environment not support symlink
        }
    ],
    // Dev server
    dev: {
        autoProto: true,        // Auto regenerate proto
        autoSync: true,         // Auto sync when file changed
        autoApi: true,          // Auto create API when ServiceProto updated
        watch: 'src',           // Restart dev server when these files changed
        entry: 'src/index.ts',  // Dev server command: node -r ts-node/register {entry}
    },
    // Build config
    build: {
        autoProto: true,        // Auto generate proto before build
        autoSync: true,         // Auto sync before build
        autoApi: true,          // Auto generate API before build
        outDir: 'dist',         // Clean this dir before build
    }
}
export default tsrpcConf;