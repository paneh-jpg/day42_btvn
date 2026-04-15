import { useEffect, useState } from "react";
import { getCustomersApi } from "../api/customerApi";
import CustomerModal from "../components/CustomerMoal";
import CustomerForm from "../components/CustomerForm";
import { createCustomerApi } from "../api/customerApi";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { deleteCustomerApi } from "../api/customerApi";
import { updateCustomerApi } from "../api/customerApi";

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");

    if (!confirmDelete) return;

    try {
      await deleteCustomerApi(id);
      toast.success("Xoá thành công");
      fetchCustomers();
    } catch (error) {
      console.log(error);
      toast.error("Xoá thất bại");
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomersApi();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex gap-5">
        {" "}
        <h1 className="text-2xl mb-4">Customers</h1>
        <button
          onClick={() => {
            setMode("create");
            setSelectedCustomer(null);
            setIsOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 mb-8 rounded"
        >
          Add Customer
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 mb-8 rounded"
        >
          Logout
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Rank</th>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>
          {customers.map((c, index) => (
            <tr key={index} className="border-t">
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>{c.rank}</td>
              <td className="space-x-2">
                <button
                  onClick={() => {
                    setMode("edit");
                    setSelectedCustomer(c);
                    setIsOpen(true);
                  }}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomerModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CustomerForm
          mode={mode}
          initialData={selectedCustomer}
          onSubmit={async (formData) => {
            try {
              const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                rank: formData.rank || "GOLD",
              };

              if (mode === "create") {
                await createCustomerApi(payload);
                toast.success("Thêm thành công");
              } else {
                await updateCustomerApi(selectedCustomer.id, payload);
                toast.success("Cập nhật thành công");
              }

              setIsOpen(false);
              fetchCustomers();
            } catch (error: any) {
              console.log(error.response?.data);
              toast.error("Lỗi");
            }
          }}
        />
      </CustomerModal>
    </div>
  );
};

export default Customers;
