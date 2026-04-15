import { useState, useEffect } from "react";

type Props = {
  mode: "create" | "edit";
  initialData?: any;
  onSubmit: (data: any) => void;
};

const CustomerForm = ({ mode, initialData, onSubmit }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    rank: "GOLD",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm(initialData);
    }
  }, [initialData, mode]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">
        {mode === "create" ? "Add" : "Edit"} Customer
      </h2>

      {["name", "email", "phone", "address"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={(form as any)[field]}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
      ))}

      <button
        onClick={() => onSubmit(form)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default CustomerForm;
