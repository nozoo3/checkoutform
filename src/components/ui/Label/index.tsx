type Props = {
  label: string;
  required?: boolean;
};

export const Label = ({ label, required }: Props) => (
  <div className="flex items-center gap-2">
    <label className="text-xs text-gray-500">{label}</label>
    {required && (
      <p className="rounded bg-red-500 px-0.5 text-xs text-white">必須</p>
    )}
  </div>
);
