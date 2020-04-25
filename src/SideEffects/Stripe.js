// @flow

export type Card = {
  number: string,
  month: string,
  year: string,
  cvc: string,
};

export type EditableCard = {
  month: string,
  year: string,
};

export type Address = {
  city: string,
  country: string,
  line1: string,
  line2?: string,
  postal_code: string,
  state: string,
};

export type BillingDetails = {
  address: Address,
  email?: string,
  name: string,
  phone?: string,
};

export const createPaymentMethod = (
  card: Card,
  billingDetails: BillingDetails,
) => {
  return (dispatch: any, getState: any, manager: Object) => {
    return manager.Request({
      url: 'https://api.stripe.com/v1/payment_methods',
      method: 'POST-STRIPE',
      body: {
        type: 'card',
        'card[number]': card.number,
        'card[exp_month]': card.month,
        'card[exp_year]': card.year,
        'card[cvc]': card.cvc,
        'billing_details[email]': billingDetails.email,
        'billing_details[name]': billingDetails.name,
        'billing_details[phone]': billingDetails.phone,
        'billing_details[address][city]': billingDetails.address.city,
        'billing_details[address][country]': billingDetails.address.country,
        'billing_details[address][line1]': billingDetails.address.line1,
        'billing_details[address][line2]': billingDetails.address.line2,
        'billing_details[address][postal_code]':
          billingDetails.address.postal_code,
        'billing_details[address][state]': billingDetails.address.state,
      },
      token: manager.stripeConfig.publishable_key,
      dispatch,
      loadingId: 'create-stripe',
      disableCheck: true,
    });
  };
};

export const updatePaymentMethod = (
  card: EditableCard,
  billingDetails: BillingDetails,
) => {
  return (dispatch: any, getState: any, manager: Object) => {
    return manager.Request({
      url: `https://api.stripe.com/v1/payment_methods/${
        getState().user.cardSelected
      }`,
      method: 'POST-STRIPE',
      body: {
        'card[exp_month]': card.month,
        'card[exp_year]': card.year,
        'billing_details[email]': billingDetails.email,
        'billing_details[name]': billingDetails.name,
        'billing_details[phone]': billingDetails.phone,
        'billing_details[address][city]': billingDetails.address.city,
        'billing_details[address][country]': billingDetails.address.country,
        'billing_details[address][line1]': billingDetails.address.line1,
        'billing_details[address][line2]': billingDetails.address.line2,
        'billing_details[address][postal_code]':
          billingDetails.address.postal_code,
        'billing_details[address][state]': billingDetails.address.state,
      },
      token: manager.stripeConfig.secret_key,
      dispatch,
      loadingId: 'update-stripe',
      disableCheck: true,
    });
  };
};

export const deletePaymentMethod = () => {
  return (dispatch: any, getState: any, manager: Object) => {
    return manager.Request({
      url: `https://api.stripe.com/v1/payment_methods/${
        getState().user.cardSelected
      }/detach`,
      method: 'POST-STRIPE',
      token: manager.stripeConfig.secret_key,
      dispatch,
      loadingId: 'delete-stripe',
      disableCheck: true,
    });
  };
};
