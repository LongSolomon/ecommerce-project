import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaList } from "react-icons/fa";

const CategoryList = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editing, setEditing] = useState(false);

  const { data: categories, refetch, isLoading } = useFetchCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateCategory({
          categoryId: selectedCategory._id,
          name,
        }).unwrap();
        toast.success("Category updated successfully");
        setEditing(false);
      } else {
        await createCategory({ name }).unwrap();
        toast.success("Category created successfully");
      }
      setName("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Category Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <FaPlus className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                {editing ? "Edit Category" : "Create Category"}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editing ? "Update Category" : "Create Category"}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setName("");
                      setSelectedCategory(null);
                    }}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column - Categories List */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <FaList className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Categories ({categories?.length || 0})
              </h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : categories?.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No categories found
              </div>
            ) : (
              <div className="space-y-4">
                {categories?.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {category.name}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;