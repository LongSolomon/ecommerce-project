const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="w-20 h-10 confirm">
            <p>
              {buttonText}
            </p>
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="w-20 h-10 cancel"
            >
              <p>
                Delete
              </p>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;