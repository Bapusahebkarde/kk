import React, { useEffect, useState } from "react";
import { grabStatus } from "../apiCalls";

const PaymentStatus = ({ match }) => {
  const [values, setValues] = useState({
    amount: "",
    error: "",
  });

  const { amount, error } = values;

  useEffect(() => {
    getPaymentStatus(match.params.paymentId);
  }, []);

  const getPaymentStatus = (paymentId) => {
    grabStatus(paymentId).then((respsonse) => {
      if (respsonse.error) {
        setValues({ ...values, error: respsonse.error, amount: "" });
      } else {
        setValues({ ...values, error: "", amount: respsonse.amount });
      }
    });
  };

  return (
    <div>
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      {amount > 0 && (
        <h1 style={{ color: "green" }}>
          Your order of rs {amount / 100} is successfull
        </h1>
      )}
      {!error && !amount && <h1>Loading...</h1>}
    </div>
  );
};

export default PaymentStatus;