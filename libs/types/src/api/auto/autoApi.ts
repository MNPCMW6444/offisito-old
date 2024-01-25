export declare namespace Paths {
    namespace Api {
        namespace Get {
            namespace Responses {
                export interface $200 {
                }
            }
        }
    }
    namespace ApiAuthLog {
        namespace Get {
            namespace Responses {
                export interface $200 {
                }
                export interface $401 {
                }
                export interface $500 {
                }
            }
        }
    }
    namespace ApiAuthLogIn {
        namespace Post {
            export interface RequestBody {
                /**
                 * example:
                 * any
                 */
                email?: any;
                /**
                 * example:
                 * any
                 */
                password?: any;
            }
            namespace Responses {
                export interface $400 {
                }
                export interface $401 {
                }
                export interface $402 {
                }
                export interface $500 {
                }
            }
        }
    }
    namespace ApiAuthLogOut {
        namespace Get {
            namespace Responses {
                export interface $500 {
                }
            }
        }
    }
    namespace ApiAuthRegisterFin {
        namespace Post {
            export interface RequestBody {
                /**
                 * example:
                 * any
                 */
                key?: any;
                /**
                 * example:
                 * any
                 */
                fullName?: any;
                /**
                 * example:
                 * any
                 */
                password?: any;
                /**
                 * example:
                 * any
                 */
                passwordAgain?: any;
                /**
                 * example:
                 * any
                 */
                type?: any;
            }
            namespace Responses {
                export interface $400 {
                }
                export interface $500 {
                }
            }
        }
    }
    namespace ApiAuthRegisterReq {
        namespace Post {
            export interface RequestBody {
                /**
                 * example:
                 * any
                 */
                email?: any;
                /**
                 * example:
                 * any
                 */
                client?: any;
            }
            namespace Responses {
                export interface $200 {
                }
                export interface $400 {
                }
                export interface $500 {
                }
            }
        }
    }
    namespace ApiHostAssetsCreate {
        namespace Post {
            export interface RequestBody {
                /**
                 * example:
                 * any
                 */
                a?: any;
                /**
                 * example:
                 * any
                 */
                b?: any;
                /**
                 * example:
                 * any
                 */
                c?: any;
                /**
                 * example:
                 * any
                 */
                d?: any;
            }
            namespace Responses {
                export interface $200 {
                }
            }
        }
    }
    namespace _ {
        namespace Get {
            namespace Responses {
                export interface $200 {
                }
            }
        }
    }
}
