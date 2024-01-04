const prettyStringify = (value: any) => {
  if (typeof value === "string") {
    return value;
  } else {
    return JSON.stringify(value);
  }
};

export const extractErrorMessage = (error: any) => {
  if (error.response?.data) {
    let errorData = error.response.data;
    try {
      errorData = JSON.parse(errorData);
    } catch {
      // Skip any errors
    }

    if (errorData.message) {
      return prettyStringify(errorData.message);
    }
    if (errorData.error) {
      return prettyStringify(errorData.error);
    }
    if (errorData.detail) {
      return prettyStringify(errorData.detail);
    }
    if (errorData.errors) {
      return prettyStringify(errorData.errors);
    }

    return prettyStringify(errorData);
  } else if (error.message) {
    return prettyStringify(error.message);
  } else {
    return prettyStringify(error);
  }
};


