import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  name: string;
  value: string;
  register: UseFormRegisterReturn;
  defaultChecked?: boolean;
};
export const RadioButton = ({
  name,
  value,
  register,
  defaultChecked,
}: Props) => (
  <div className="flex w-full gap-2">
    <input
      className="accent-blue-500"
      type="radio"
      value={value}
      {...register}
      defaultChecked={defaultChecked}
    />
    <label className="text-sm">{name}</label>
  </div>
);
