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
  pickers_list: {
    url: "modelservice/active/pickers",
    method: "GET",
  },
  change_picker: {
    url: "modelservice/change/picker",
    method: "POST",
  },
};

export function get_orders_list$$(
  vendorType: string,
  onSuccess = (response: any) => {},
  onFails = (response: any) => {}
): void {
  let options: any = {
    method: routes.orders_list.method,
    url: routes.orders_list.url,
  };

  if (vendorType != "all") {
    options.params = {
      vendorType,
    };
  }

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

export function get_pickers_list$$(
  onSuccess = (response: any) => {},
  onFails = (response: any) => {}
): void {
  let options: any = {
    method: routes.pickers_list.method,
    url: routes.pickers_list.url,
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

export function change_picker$$(
  orderId:string,
  pickerId:string,
  onSuccess = (response: any) => {},
  onFails = (response: any) => {}
): void {
  let options: any = {
    method: routes.change_picker.method,
    url: routes.change_picker.url,
    params: {
      orderId,
      pickerId
    }
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
