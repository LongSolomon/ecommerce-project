import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { FaTruck, FaCreditCard, FaBox, FaReceipt } from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <ProgressSteps step1 step2 step3 />
        </div>

        {cart.cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Message>Your cart is empty</Message>
            <Link 
              to="/shop"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <FaBox className="text-blue-500 text-2xl mr-3" />
                  <h2 className="text-xl font-bold">Order Items</h2>
                </div>
                
                <div className="space-y-4">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-grow">
                        <Link 
                          to={`/product/${item.product}`}
                          className="text-lg font-medium hover:text-blue-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-gray-600">Quantity: {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${(item.qty * item.price).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div>
                  <div className="flex items-center mb-4">
                    <FaReceipt className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-xl font-bold">Order Summary</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">${cart.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">${cart.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">${cart.taxPrice}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${cart.totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center mb-4">
                    <FaTruck className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-xl font-bold">Shipping</h2>
                  </div>
                  <p className="text-gray-600">
                    {cart.shippingAddress.address},<br />
                    {cart.shippingAddress.city} {cart.shippingAddress.postalCode},<br />
                    {cart.shippingAddress.country}
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center mb-4">
                    <FaCreditCard className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-xl font-bold">Payment Method</h2>
                  </div>
                  <p className="text-gray-600">{cart.paymentMethod}</p>
                </div>

                {error && (
                  <div className="border-t pt-6">
                    <Message variant="danger">{error.data.message}</Message>
                  </div>
                )}

                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader small />
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;