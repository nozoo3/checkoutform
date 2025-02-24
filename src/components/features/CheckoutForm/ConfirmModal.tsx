import Modal from 'react-modal';
import { useFormContext } from 'react-hook-form';
import { FormField } from '.';
import { Heading2 } from '~/components/ui/Heading';
import { formatPhoneNumber, formatPostCode } from './utils';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const PAYMENT_METHODS = {
  credit: 'クレジットカード(Visa, MasterCard, JCB, American Express)',
  carrierPayment: 'キャリア決済',
  convenienceStore: 'コンビニ決済',
} as const;

export const ConfirmModal = ({ isOpen, handleClose }: Props) => {
  const methods = useFormContext<FormField>();
  const { getValues } = methods;

  const paymentMethodKey = getValues('paymentMethod');
  const paymentMethodValue =
    PAYMENT_METHODS[paymentMethodKey as keyof typeof PAYMENT_METHODS];
  const fullName = `${getValues('firstName')} ${getValues('lastName')} 様`;
  const postCode = `〒${formatPostCode(String(getValues('postCode')))}`;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      minWidth: '70%',
    },
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={handleClose}>
      <div className="mb-4">
        <div className="flex items-center justify-between p-2">
          <p className="text-sm font-bold">購入内容確認</p>
          <button className="cursor-pointer" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="w-full border border-gray-300"></div>
      </div>
      <div className="p-8">
        <div className="mb-4">
          <Heading2>お支払い方法</Heading2>
        </div>
        <div className="mb-4 p-2 outline outline-gray-300">
          <p>{paymentMethodValue}</p>
        </div>
        <div className="mb-4">
          <Heading2>配送先</Heading2>
        </div>
        <div className="p-2 outline outline-gray-300">
          <p className="font-bold">{fullName}</p>
          <p>{formatPhoneNumber(String(getValues('phone')))}</p>
          <p>{postCode}</p>
          <div className="flex">
            <p>{getValues('prefecture')}</p>
            <p>{getValues('city')}</p>
            <p>{getValues('address')}</p>
            <p>{getValues('building')}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-2">
          <button
            type="submit"
            className="w-1/3 cursor-pointer rounded bg-black px-8 py-2 font-bold text-white"
          >
            注文確定する
          </button>
          <button
            className="w-1/3 cursor-pointer rounded border border-black bg-white px-8 py-2 font-bold text-black"
            onClick={handleClose}
          >
            戻る
          </button>
        </div>
      </div>
    </Modal>
  );
};
