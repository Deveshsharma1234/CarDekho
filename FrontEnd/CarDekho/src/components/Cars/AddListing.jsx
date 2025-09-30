import React, { useState } from "react";
import useListCar from "../../hooks/cars/useListCar";


const AddListing = () => {
  const [formData, setFormData] = useState({
    ModelId: "",
    RegistrationYear: "",
    Mileage: "",
    Price: "",
    CityId: "",
    Description: "",
  });
  const [images, setImages] = useState([]);
  const { listCar, loading, error, success } = useListCar();

  // input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // file input handler
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await listCar(formData, images);
  };

  return (
   <div className="max-w-3xl mx-auto mt-10">
  <div className="card bg-base-100 shadow-xl p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Car Listing</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ModelId */}
      <input
        type="number"
        name="ModelId"
        placeholder="Model Id"
        value={formData.ModelId}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      {/* Registration Year */}
      <input
        type="number"
        name="RegistrationYear"
        placeholder="Registration Year"
        value={formData.RegistrationYear}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      {/* Mileage */}
      <input
        type="number"
        name="Mileage"
        placeholder="Mileage"
        value={formData.Mileage}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      {/* Price */}
      <input
        type="number"
        name="Price"
        placeholder="Price"
        value={formData.Price}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      {/* CityId */}
      <input
        type="number"
        name="CityId"
        placeholder="City Id"
        value={formData.CityId}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      {/* Description */}
      <textarea
        name="Description"
        placeholder="Description"
        value={formData.Description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
        rows="4"
        required
      ></textarea>

      {/* Images */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>

    {error && <p className="mt-4 text-error">{error}</p>}
    {success && <p className="mt-4 text-success">{success}</p>}
  </div>
</div>

  );
};

export default AddListing;
