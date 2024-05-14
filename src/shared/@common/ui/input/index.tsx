import InputBox from './InputBox';
import InputField from './InputField';
import InputLabel from './InputLabel';
import InputLayout from './InputLayout';
import InputMessage from './InputMessage';

const Input = Object.assign(InputLayout, {
  Label: InputLabel,
  Box: InputBox,
  Field: InputField,
  Message: InputMessage,
});

export default Input;
