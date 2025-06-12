import styles from "./Input.module.css";
export default function Input({
  label,
  type = "text",
  options = null,
  ref,
  ...props
}) {
  let content = (
    <>
      <input ref={ref} type={type} name={label} {...props} />
    </>
  );
  if (options && type === "select") {
    content = (
      <>
        <select name={label} ref={ref}>
          {options.map((option) => {
            return (
              <option
                value={option.value}
                key={`${label}input${option.text}${option.value}`}
              >
                {option.text}
              </option>
            );
          })}
        </select>
      </>
    );
  }
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <br></br>
      {content}
    </div>
  );
}
