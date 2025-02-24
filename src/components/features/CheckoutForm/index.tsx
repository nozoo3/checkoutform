import { useForm, FormProvider } from 'react-hook-form';
import { Label } from '~/components/ui/Label';
import { TextInput } from '~/components/ui/TextInput';
import { Heading1, Heading2 } from '~/components/ui/Heading';

type PaymentMethod = 'credit' | 'carrierPayment' | 'convenienceStore';

export type FormField = {
  firstName: string;
  lastName: string;
  phone: number;
  postCode: number;
  prefecture: string;
  city: string;
  address: string;
  building: string | number;
  paymentMethod: PaymentMethod;
};

export const CheckoutForm = () => {
  const methods = useForm<FormField>({
    mode: 'onSubmit',
  });
  const { register } = methods;

  return (
    <div className="p-8">
      <Heading1>ご購入手続き</Heading1>
      <div className="mt-8">
        <Heading2>配送先住所</Heading2>
      </div>
      <FormProvider {...methods}>
        <form className="mt-4 flex flex-col p-8 outline outline-gray-300">
          <div className="mb-4 flex flex-col gap-2">
            <Label label="氏名" required />
            <div className="flex gap-2">
              <TextInput placeHolder="姓" register={register('firstName')} />
              <TextInput placeHolder="名" register={register('lastName')} />
            </div>
          </div>
          <div className="mb-4 flex max-w-1/3 flex-col gap-2">
            <Label label="電話番号" required />
            <TextInput placeHolder="08012345678" register={register('phone')} />
          </div>
          <div className="mb-4 flex max-w-1/6 flex-col gap-2">
            <Label label="郵便番号" required />
            <TextInput placeHolder="0000000" register={register('postCode')} />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Label label="都道府県" required />
            {/* Add Select component */}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Label label="市区町村" required />
            <TextInput register={register('city')} />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Label label="番地" required />
            <TextInput register={register('address')} />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Label label="建物名・部屋番号" />
            <TextInput register={register('building')} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
