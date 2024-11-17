import {} from "../BCore.exports";
export class Exception {
    static Build(message, options, type = "Error") {
        const ErrorClass = {
            SyntaxError: SyntaxError,
            ReferenceError: ReferenceError,
            TypeError: TypeError,
            Error: Error,
        }[type];
        const error = new ErrorClass(message, { cause: options?.cause });
        if (options?.code)
            error.code = options.code;
        Error.captureStackTrace(error, options?.skip_stack ? () => { } : Exception.Build);
        if (options?.skip_stack) {
            const stack = error.stack?.split("\n");
            if (stack)
                error.stack = [stack[0], ...stack.slice(options.skip_stack + 1)].join("\n");
        }
        throw error;
    }
    static BuildWithContext(message, context, type = "Error") {
        const context_str = JSON.stringify(context, null, 2);
        const full_message = `${message}\nContext:\n${context_str}`;
        const ErrorClass = {
            SyntaxError: SyntaxError,
            ReferenceError: ReferenceError,
            TypeError: TypeError,
            Error: Error,
        }[type];
        const error = new ErrorClass(full_message);
        Error.captureStackTrace(error, Exception.BuildWithContext);
        throw error;
    }
}
