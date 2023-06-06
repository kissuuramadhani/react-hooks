import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  requestExt: null,
  identifier: null,
};

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
        return {
            loading: true,
            error: null,
            data: null,
            requestExt: null,
            identifier: action.identifier
        };
    case "RESPONSE":
      return {
        ...currHttpState,
        loading: false,
        data: action.responseData,
        requestExt: action.requestExt,
    };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
        return initialState;
    default:
      throw new Error("Should not Fetch Data");
  }
};

const useHttpHooks = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clearIngredients = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

    const sendRequest = useCallback((url, method, body, requestExt, reqIdentifier) => {
        dispatchHttp({ type: 'SEND', identifier: reqIdentifier });
        fetch(url,
            {
                method: method,
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return response.json();
            }).then(responseData => {
                dispatchHttp({ type: 'RESPONSE', responseData: responseData, requestExt: requestExt });
            }).catch((error) => {
                dispatchHttp({ type: "ERROR", errorData: error.message });
            });
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        requestExt: httpState.requestExt,
        reqIdentifier: httpState.identifier,
        clear: clearIngredients
    };
};

export default useHttpHooks;
