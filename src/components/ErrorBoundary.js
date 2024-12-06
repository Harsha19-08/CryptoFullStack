function fallbackRender({ error, resetErrorBoundary }) {
    
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }
  export default fallbackRender;

// function ErrorFallback({error, resetErrorBoundary}){
//     return (
//         <div role="alert">
//             <p>Something went wrong</p>
//             <pre>{error.message}</pre>
//             <button onClick={resetErrorBoundary}>Try Again</button>
//         </div>
//     )
// }
// export default ErrorFallback;