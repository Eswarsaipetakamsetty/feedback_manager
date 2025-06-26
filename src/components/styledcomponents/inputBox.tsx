import styles from './styles/inputBox.module.css'

type InputProps={
    id:string,
    title:string,
    type:string,
    name : string,
    placeHolder : string,
    onChange : (e:string) => void,
    backgroundColor?:string,
    titleFontSize?:string,
    titleFontColor?:string,
}

function InputBox({id, title, type, name, placeHolder, onChange, backgroundColor, titleFontSize, titleFontColor}: InputProps) {
    return(
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id} style={{ fontSize: titleFontSize, color: titleFontColor }}>
                {title}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                placeholder={placeHolder}
                onChange={(e) => onChange(e.target.value)}
                style={{ backgroundColor }}
                className={styles.inputBox}
            />
        </div>
    )
}

export default InputBox