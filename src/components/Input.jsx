import styles from "./Input.module.css";
export default function Input({ label, type = "text", ref, ...props }) {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <br></br>
      <input ref={ref} type={type} {...props} />
    </div>
  );
}
