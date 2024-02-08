
export type crudResponse<T> ={

    success: boolean;
    data?: T;
    error?: string;
    msg?: string
}