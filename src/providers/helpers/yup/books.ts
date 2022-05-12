import * as yup from 'yup';

export const yupCreateBookInput = yup.object().shape({
  name: yup.string().required(),
  imageUrl: yup.string().url(),
  amount: yup.number().required().positive().integer(),
});

export const yupUpdateBookAmountInput = yup.object().shape({
  amount: yup.number().required().positive().integer(),
});
