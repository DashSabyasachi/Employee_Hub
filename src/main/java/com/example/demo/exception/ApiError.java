package com.example.demo.exception;

/** JSON shape of every error the API returns. */
public record ApiError(int status, String message) {
}
