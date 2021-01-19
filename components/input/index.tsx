import BaseInput from './input';
import Password from './password';
import Phone from './phone';

export type InputType = typeof BaseInput & {
  Password: typeof Password;
  Phone: typeof Phone;
};

const Input: InputType = BaseInput as InputType;

(Input as InputType).Password = Password;
(Input as InputType).Phone = Phone;

export default Input;