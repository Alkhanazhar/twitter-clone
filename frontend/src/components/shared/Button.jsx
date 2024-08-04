/* eslint-disable react/prop-types */
const Button = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
