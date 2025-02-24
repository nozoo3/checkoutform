import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  name: string;
  value: string;
  register: UseFormRegisterReturn;
};
export const RadioButton = ({ name, value, register }: Props) => (
  <div className="flex w-full gap-2">
    <input
      className="accent-blue-500"
      type="radio"
      value={value}
      {...register}
    />
    <label className="text-sm">{name}</label>
  </div>
);
