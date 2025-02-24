import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  placeHolder?: string;
  register: UseFormRegisterReturn;
};
export const TextInput = ({ placeHolder, register }: Props) => (
  <input
    className="w-full rounded p-2 outline outline-gray-300 placeholder:text-gray-300"
    placeholder={placeHolder}
    {...register}
  />
);
