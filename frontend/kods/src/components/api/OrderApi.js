// eslint-disable-next-line
import { baseUrl } from "./Url";
import axios from "axios";
import { useQuery } from "react-query";

const orders = baseUrl + "/Orders";

export async function CreateOrder(request) {
  await axios
    .post(orders, request)

    .then((response) => {
      console.error(response);
      alert("Order success!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error fetching create order data");
    });
}

const fetchOrders = async () => {
  const response = await axios.get(orders);
  return response.data;
};

export function useOrders() {
  return useQuery("orders", fetchOrders, {
    onError: (error) => {
      console.error(error);
      alert("Error fetching orders data");
    },
  });
}
