import {
  ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

export function ErrorBoundry() {
  const error = useRouteError();
  let content = <h1>Unknown Error</h1>;
  if (isRouteErrorResponse(error)) {
    content = (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    content = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
  return content;
}
