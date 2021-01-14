class FetchError extends Error {
  public response: Response;
  public data: string;
  constructor(...params: any) {
    // Passer les arguments restants (incluant ceux spécifiques au vendeur) au constructeur parent
    super(...params);

    // Maintenir dans la pile une trace adéquate de l'endroit où l'erreur a été déclenchée (disponible seulement en V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
  }
}

export default async function fetcher(...args: [RequestInfo, RequestInit?]) {
  try {
    const response = await fetch(...args);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new FetchError(response.statusText);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
