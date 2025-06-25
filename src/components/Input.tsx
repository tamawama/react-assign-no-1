import styles from "./Input.module.css";

interface InputProps {
  label: string;
  type?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  step?: string;
  props?: [];
}

export default function Input({
  label,
  type = "text",
  ref,
  step,
  ...props
}: InputProps) {
  let content = (
    <>
      <input ref={ref} type={type} name={label} {...props} step={step} />
    </>
  );
  if (type === "fetching") {
    content = (
      <>
        <p>fetching...</p>
      </>
    );
    return (
      <div className={styles.input}>
        <label>{label}</label>
        {content}
      </div>
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
