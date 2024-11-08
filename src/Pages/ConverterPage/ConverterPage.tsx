import { useEffect, useRef, useState } from 'react'
import Converter from '../../components/Converter/Converter'
import styles from './ConverterPage.module.scss'
import { listCurrency } from '../../types'
import { CurrencyService } from '../../services/reqres/currency'

const ConverterPage = () => {
    const refListCurrency = useRef<listCurrency>({})

    const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('rub')
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('usd')
    const [valueFrom, setValueFrom] = useState(0)
    const [valueTo, setValueTo] = useState(1)
    const [loading, setLoading] = useState(true)

    const handleValueChangeFrom = (valueFrom: number) => {
        if (isNaN(valueFrom) || !refListCurrency.current[selectedCurrencyFrom] || !refListCurrency.current[selectedCurrencyTo]) {
            setValueTo(0)
            setValueFrom(0)
            return
        }

        const price = valueFrom / refListCurrency.current[selectedCurrencyFrom];
        const result = price * refListCurrency.current[selectedCurrencyTo];

        setValueTo(Math.round(result * 100) / 100)
        setValueFrom(valueFrom)
    }

    const handleValueChangeTo = (valueTo: number) => {
        if (isNaN(valueTo) || !refListCurrency.current[selectedCurrencyFrom] || !refListCurrency.current[selectedCurrencyTo]) {
            setValueFrom(0)
            setValueTo(0)
            return
        }

        const result = refListCurrency.current[selectedCurrencyFrom] / refListCurrency.current[selectedCurrencyTo] * valueTo

        setValueFrom(Math.round(result * 100) / 100)
        setValueTo(valueTo)
    }

    const handleCurrencyChangeFrom = (currency: string) => {
        setSelectedCurrencyFrom(currency)
    }

    const handleCurrencyChangeTo = (currency: string) => {
        setSelectedCurrencyTo(currency)
    }

    useEffect(() => {
        CurrencyService.getCurrencyData()
            .then((json) => {
                refListCurrency.current = json.usd;
                handleValueChangeTo(1)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
                alert(error)
            })
    }, [])

    useEffect(() => {
        handleValueChangeFrom(valueFrom);
    }, [selectedCurrencyFrom, selectedCurrencyTo, valueFrom]);

    return (
        <div className={styles.ConverterPage}>
            {
                loading ?
                    <div className={styles.ConverterPage__loader}></div>
                    :
                    <div className={styles.ConverterPage__block}>
                        <Converter
                            listCurrency={refListCurrency.current}
                            selectedCurrency={selectedCurrencyFrom}
                            value={valueFrom}
                            onCurrencyChange={handleCurrencyChangeFrom}
                            onChangeValue={handleValueChangeFrom}
                        />
                        <Converter
                            listCurrency={refListCurrency.current}
                            selectedCurrency={selectedCurrencyTo}
                            value={valueTo}
                            onCurrencyChange={handleCurrencyChangeTo}
                            onChangeValue={handleValueChangeTo}
                        />
                    </div>
            }

        </div>
    )
}

export default ConverterPage