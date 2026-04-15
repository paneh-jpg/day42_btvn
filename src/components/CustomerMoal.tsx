type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomerModal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center float">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        {children}
        <button onClick={onClose} className="mt-4 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomerModal;
