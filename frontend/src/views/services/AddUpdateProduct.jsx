import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { asyncAddUpdateProduct } from "@/store/Actions/productAction";

const AddUpdateProduct = ({ setisOpen, editRow, setEditRow, setReload, reloadList }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    if (editRow._id) {
      setFormData(editRow);
    } else {
      setFormData({ name: "", imageUrl: "", price: "", description: "", stock: "" });
    }
  }, [editRow]);

  const validateForm = ({ name, price, description, imageUrl, stock }) => {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!name || !price || !description || !imageUrl || !stock) {
      alert("All fields are required!");
      return false;
    }
    if (!urlRegex.test(imageUrl)) {
      alert("Invalid URL!");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    dispatch(asyncAddUpdateProduct(formData));
    setReload(!!reloadList);
     handleCloseModal();
  };

  const handleCloseModal = () => {
    setisOpen(false);
    setEditRow({});
    setFormData({ name: "", imageUrl: "", price: "", description: "" });
  };

  return (
    <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[exo2]">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <h4 className="text-xl text-gray-800 font-bold text-center mb-4">
          {editRow._id ? "Update" : "Add"} Product
        </h4>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Product Name", name: "name", type: "text", placeholder: "Enter Product Name" },
            { label: "Product Stock", name: "stock", type: "text", placeholder: "Enter Product Stock" },

            { label: "Product Price", name: "price", type: "text", placeholder: "Enter Product Price" },
            {
              label: "Product Description",
              name: "description",
              type: "textarea",
              placeholder: "Enter Product Description",
              rows: 3,
            },
            { label: "Product Image URL", name: "imageUrl", type: "text", placeholder: "Enter Product Image URL" },
          ].map(({ label, name, type, ...rest }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-gray-800 font-medium text-sm">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="px-3 py-2 mt-1 bg-gray-100 text-gray-800 w-full text-sm outline-none rounded-md focus:ring-2 focus:ring-gray-800 resize-none placeholder-gray-800"
                  {...rest}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="px-3 py-2 mt-1 bg-gray-100 text-gray-800 w-full text-sm outline-none rounded-md focus:ring-2 focus:ring-gray-800 placeholder-gray-800"
                  {...rest}
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 w-full rounded-md text-white text-sm bg-gray-800 hover:bg-gray-800 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};



export default AddUpdateProduct;
