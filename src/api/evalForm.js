import { API } from 'aws-amplify';

export const submitEvalForm = async (formData) => {
  try {
    const result = await API.post('eval-lambda', import.meta.env.VITE_EVAL_RESOURCE, {
      headers: {
        "x-api-key": import.meta.env.VITE_EVAL_KEY,
      },
      body: formData,
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};