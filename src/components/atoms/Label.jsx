function Label(props) {
  return (
    <label htmlFor={props.htmlFor} className="form-label">
      {props.text}
    </label>
  );
}

export default Label;
