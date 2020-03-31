package edu.pucmm.practica10.utils;

public class JsonResponse {
    private Object data;

    public JsonResponse(Object data) {
        this.data = data;
    }

    public Object getData() {
        return data;
    }

    public JsonResponse setData(Object data) {
        this.data = data;
        return this;
    }

    private boolean hasError(Integer code) {
        if (code >= 200 && code <= 299) {
            return false;
        }
        if (code >= 300 && code <= 399) {
            return false;
        }
        if (code >= 400 && code <= 499) {
            return true;
        }
        if (code >= 500 && code <= 599) {
            return true;
        }
        return true;
    }
}
