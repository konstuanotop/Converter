import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { listCurrency } from '../../types';
import styles from './Converter.module.scss'

interface ConverterProps {
    listCurrency: listCurrency;
    selectedCurrency: string;
    setSelectedCurrency: Dispatch<SetStateAction<string>>;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    onChangeValue: (value: number) => void;
}

const Converter: React.FC<ConverterProps> = ({ listCurrency, selectedCurrency, setSelectedCurrency, value, setValue, onChangeValue }) => {

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
        onChangeValue(Number(e.target.value))
    }

    const handleChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value)
    }

    return (
        <div className={styles.Converter}>
            <div className={styles.Converter__block}>
                <div className={styles.Converter__block_currency}>
                    <form className={styles.Converter__block_currency_form}>
                        <label className={styles.Converter__block_currency_form_title}>Валюта: </label>
                        <select
                            className={styles.Converter__block_currency_form_select}
                            name='currency'
                            value={selectedCurrency}
                            onChange={(e) => handleChangeCurrency(e)}
                        >
                            {
                                Object.entries(listCurrency).map(([name]) => (
                                    <option key={name} value={name}>{name}</option>
                                ))
                            }
                        </select>
                    </form>
                </div>
                <div className={styles.Converter__block_value}>
                    <input
                        className={styles.Converter__block_value_input}
                        type='number'
                        value={value}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Converter