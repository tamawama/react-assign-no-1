import styles from "./Input.module.css";

interface InputProps {
  label: string;
  type: string;
  options: { text: string; value: string | number }[] | null;
  ref?: React.RefObject<HTMLSelectElement | null>;
  props?: [];
}

export default function Select({
  label,
  type = "select",
  options = null,
  ref,
  ...props
}: InputProps) {
  let content = (
    <>
      <p>fetching...</p>
    </>
  );
  if (type !== "fetching" && options) {
    content = (
      <>
        <select name={label} ref={ref} {...props}>
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
