export const handleError = (message: string, error: unknown) => {
  if (error instanceof Error) {
    console.error(`${message}: ${error.message}`, error.stack)
  } else {
    console.error(message, error)
  }
}
