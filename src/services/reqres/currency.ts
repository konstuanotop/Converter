import { ApiService } from "../../types";


type CurrencyResponse = {
    usd: {
        [key: string]: number;
    }
}

type CurrencyServiceMethods = {
    getCurrencyData: ApiService<void, CurrencyResponse>
}

export const CurrencyService: CurrencyServiceMethods = {
    getCurrencyData: async () => {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
        if (!response.ok) {
            throw new Error('Ошибка получения данных')
        }
        return response.json()
    }
}