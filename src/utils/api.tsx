import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
});

const routes: any = {
  orders_list: {
    url: "modelservice/active/orders/list",
    method: "GET",
  },
};

export function get_orders_list$$(
  onSuccess = (response: any) => {},
  onFails = (response: any) => {}
): void {
  let options: any = {
    method: routes.orders_list.method,
    url: routes.orders_list.url,
  };

  instance
    .request(options)
    .then(function (response: any) {
      if (response.data.status) {
        onSuccess(response.data);
      } else {
        onFails(response.data);
      }
    })
    .catch(() => {
      onFails(null);
    });
}
