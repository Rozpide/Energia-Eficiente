import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const StripeCheckoutButton = ({ price }) => {
    const { store, actions } = useContext(Context);

}