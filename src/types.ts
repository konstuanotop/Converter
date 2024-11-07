export interface listCurrency {
    [key: string]: number;
}

export type ApiService<Params = unknown, Response = unknown> = (params: Params) => Promise<Response>