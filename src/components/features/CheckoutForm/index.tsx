import { useState } from 'react';
import { ConfirmModal } from './ConfirmModal';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Label } from '~/components/ui/Label';
import { TextInput } from '~/components/ui/TextInput';
import { Heading1, Heading2 } from '~/components/ui/Heading';
import { RadioButton } from '~/components/ui/RadioButton';

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

const PREFECTURES = [
  { key: 'tokyo', value: '東京都' },
  { key: 'kanagawa', value: '神奈川県' },
  { key: 'saitama', value: '埼玉県' },
  { key: 'chiba', value: '千葉県' },
  { key: 'ibaraki', value: '茨城県' },
  { key: 'tochigi', value: '栃木県' },
  { key: 'gunma', value: '群馬県' },
];

export const CheckoutForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const methods = useForm<FormField>({
    mode: 'onSubmit',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormField> = () => {
    setShowConfirmModal(true);
  };

  return (
    <div className="p-8">
      <Heading1>ご購入手続き</Heading1>
      <div className="mt-8">
        <Heading2>配送先住所</Heading2>
      </div>
      <FormProvider {...methods}>
        <form
          // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-5774089
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <div className="mt-4 mb-8 flex flex-col p-8 outline outline-gray-300">
            <div className="mb-4 flex flex-col gap-2">
              <Label label="氏名" required />
              <div className="flex gap-2">
                <TextInput
                  placeHolder="姓"
                  register={register('firstName', {
                    required: '氏名を入力してください',
                  })}
                />
                <TextInput
                  placeHolder="名"
                  register={register('lastName', {
                    required: '氏名を入力してください',
                  })}
                />
              </div>
              {(errors?.firstName?.message || errors?.lastName?.message) && (
                <p className="text-xs text-red-500">
                  {errors?.firstName?.message || errors?.lastName?.message}
                </p>
              )}
            </div>
            <div className="mb-4 flex max-w-1/3 flex-col gap-2">
              <Label label="電話番号" required />
              <TextInput
                placeHolder="08012345678"
                register={register('phone', {
                  required: '電話番号を入力してください',
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: '電話番号は11桁の数字で入力してください',
                  },
                })}
              />
              {errors?.phone?.message && (
                <p className="text-xs text-red-500">{errors?.phone?.message}</p>
              )}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Label label="郵便番号" required />
              <div className="max-w-1/6">
                <TextInput
                  placeHolder="0000000"
                  register={register('postCode', {
                    required: '電話番号を入力してください',
                    pattern: {
                      value: /^[0-9]{7}$/,
                      message: '郵便番号は7桁の数字で入力してください',
                    },
                  })}
                />
              </div>
              {errors?.postCode?.message && (
                <p className="text-xs text-red-500">
                  {errors?.postCode?.message}
                </p>
              )}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Label label="都道府県" required />
              <div className="rounded p-2 outline outline-gray-300 placeholder:text-gray-300">
                <select className="w-full" {...register('prefecture')}>
                  {PREFECTURES.map((prefecture) => (
                    <option key={prefecture.key} value={prefecture.value}>
                      {prefecture.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Label label="市区町村" required />
              <TextInput
                register={register('city', {
                  required: '市区町村を入力してください',
                })}
              />
              {errors?.city?.message && (
                <p className="text-xs text-red-500">{errors?.city?.message}</p>
              )}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Label label="番地" required />
              <TextInput
                register={register('address', {
                  required: '番地を入力してください',
                })}
              />
              {errors?.address?.message && (
                <p className="text-xs text-red-500">
                  {errors?.address?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label label="建物名・部屋番号" />
              <TextInput register={register('building')} />
            </div>
          </div>
          <div className="mb-4">
            <Heading2>お支払い方法</Heading2>
          </div>
          <div className="mb-2 p-2 outline outline-gray-300">
            <RadioButton
              defaultChecked
              name="クレジットカード(Visa, MasterCard, JCB, American Express)"
              value={'credit'}
              register={register('paymentMethod')}
            />
          </div>
          <div className="mb-2 p-2 outline outline-gray-300">
            <RadioButton
              name="コンビニ決済"
              value={'convenienceStore'}
              register={register('paymentMethod')}
            />
          </div>
          <div className="p-2 outline outline-gray-300">
            <RadioButton
              name="キャリア決済"
              value={'carrierPayment'}
              register={register('paymentMethod')}
            />
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-2">
            <button
              type="submit"
              className="w-1/3 cursor-pointer rounded bg-black px-8 py-2 font-bold text-white"
            >
              次へ進む
            </button>
            <button
              type="button"
              className="w-1/3 cursor-pointer rounded border border-black bg-white px-8 py-2 font-bold text-black"
            >
              戻る
            </button>
          </div>
        </form>
        <ConfirmModal
          isOpen={showConfirmModal}
          handleClose={() => setShowConfirmModal(false)}
          handleConfirm={() => setShowConfirmModal(false)}
        />
      </FormProvider>
    </div>
  );
};
