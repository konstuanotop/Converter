import { useEffect, useRef, useState } from 'react'
import Converter from '../../components/Converter/Converter'
import styles from './ConverterPage.module.scss'
import { listCurrency } from '../../types'

const ConverterPage = () => {
    const refListCurrency = useRef<listCurrency>({})

    const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('rub')
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('usd')
    const [valueFrom, setValueFrom] = useState(0)
    const [valueTo, setValueTo] = useState(1)

    // При вводе значения в input надо произвести вычисления значения валюты и отобразить результат в правой колонке учитыевая какие выбраны валюты в обеих колонках

    const onChangeValueFrom = (valueFrom: number) => {
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

    const onChangeValueTo = (valueTo: number) => {
        if (isNaN(valueTo) || !refListCurrency.current[selectedCurrencyFrom] || !refListCurrency.current[selectedCurrencyTo]) {
            setValueFrom(0)
            setValueTo(0)
            return
        }

        const result = refListCurrency.current[selectedCurrencyFrom] / refListCurrency.current[selectedCurrencyTo] * valueTo

        setValueFrom(Math.round(result * 100) / 100)
        setValueTo(valueTo)
    }

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
            .then((res) => res.json())
            .then((json) => {
                refListCurrency.current = json.usd
                onChangeValueTo(1)
            })
    }, [])

    useEffect(() => {
        onChangeValueFrom(valueFrom);
    }, [selectedCurrencyFrom, valueFrom]);

    useEffect(() => {
        onChangeValueFrom(valueFrom);
    }, [selectedCurrencyTo, valueFrom]);


    return (
        <div className={styles.ConverterPage}>
            <Converter listCurrency={refListCurrency.current} selectedCurrency={selectedCurrencyFrom} setSelectedCurrency={setSelectedCurrencyFrom} value={valueFrom} setValue={setValueFrom} onChangeValue={onChangeValueFrom} />
            <Converter listCurrency={refListCurrency.current} selectedCurrency={selectedCurrencyTo} setSelectedCurrency={setSelectedCurrencyTo} value={valueTo} setValue={setValueTo} onChangeValue={onChangeValueTo} />
        </div>
    )
}

export default ConverterPage