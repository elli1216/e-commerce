import { PlusIcon } from "lucide-react";

export const addButton = (): React.JSX.Element => {
  return (
    <button className="flex items-center justify-center gap-2 rounded-lg p-2 cursor-pointer">
      <PlusIcon className="w-6 h-6" />
      <p className="text-sm font-semibold">Add Product</p>
    </button>
  );
};
