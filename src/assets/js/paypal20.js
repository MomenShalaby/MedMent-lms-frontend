const baseUrl20 = 'http://localhost:8000/api';
const token20 = JSON.parse(localStorage.getItem('token'));
// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    style: {
      layout: "horizontal",
      color: "silver",
      tagline: "false",
      label: "buynow",
    },

    // Call your server to set up the transaction
    createOrder: function (data, actions) {
      return fetch(`${baseUrl20}/payment/paypal/create-order`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          //   user token زودي كمان
          'Authorization': `Bearer ${token20}`,

        },
        body: JSON.stringify({
          value: 20,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (orderData) {
          return orderData.id;
        });
    },

    // Call your server to finalize the transaction
    onApprove: function (data, actions) {
      return fetch(`${baseUrl20}/payment/paypal/capture-order`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          'Authorization': `Bearer ${token20}`,

        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (orderData) {
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you

          // This example reads a v2/checkout/orders capture response, propagated from the server
          // You could use a different API or structure for your 'orderData'
          var errorDetail =
            Array.isArray(orderData.details) && orderData.details[0];

          if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
            return actions.restart(); // Recoverable state, per:
            // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
          }

          if (errorDetail) {
            let errorMessage = "Sorry, your transaction could not be processed.";
            if (errorDetail.description)
              msg += "\n\n" + errorDetail.description;
            if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";

            //
            //
            // e3mly hna el error msg bdl el alert
            // return alert(msg); // Show a failure message (try to avoid alerts in production environments)
            //
            //
          }

          // Successful capture! For demo purposes:
          //   console.log(
          //     "Capture result",
          //     orderData,
          //     JSON.stringify(orderData, null, 2)
          //   );
          //   var transaction = orderData.purchase_units[0].payments.captures[0];

          //   e3mly hna saf7a aw msg ll success payment bdl el alert
          const successMessage = 'Payment transaction performed successfully';


          // Replace the above to show a success message within this page, e.g.
          // const element = document.getElementById('paypal-button-container');
          // element.innerHTML = '';
          // element.innerHTML = '<h3>Thank you for your payment!</h3>';
          // Or go to another URL:  actions.redirect('thank_you.html');
        });
    },

    onCancel: function (data) {
      const cancelMessage = 'Payment transaction cancelled';
    },
  })
  .render("#paypal-button-container-20");
