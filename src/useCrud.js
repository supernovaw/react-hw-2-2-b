import { useState, useEffect } from 'react';

export default function useCrud(url) {
  // hmm will god send me to hell for reassigning a parameter like that?
  if (!url.endsWith("/")) url += "/";

  const [state, setState] = useState({ notes: null, error: null, isLoading: true });

  const displayNotes = notes => setState({ notes, error: null, isLoading: false });
  const indicateError = error => setState(p => ({ ...p, error, isLoading: false }));
  const indicateLoading = () => setState(p => ({ ...p, error: null, isLoading: true }));
  const indicateSuccess = () => setState(p => ({ ...p, error: null, isLoading: false }));
  const indicateHttp = response => {
    if (response.ok) indicateSuccess(); else indicateError(response.status + " / " + response.statusText);
  };

  const readAll = () => {
    indicateLoading();
    fetch(url)
      .then(r => {
        if (r.ok) return r.json();
        else indicateHttp(r);
      })
      .then(n => { if (n) displayNotes(n) })
      .catch(indicateError);
  };

  const create = (content) => {
    indicateLoading();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: new Headers({ "Content-Type": "application/json" })
    })
      .then(indicateHttp)
      .catch(indicateError)
      .finally(readAll);
  };

  const update = () => { throw new Error("unimplemented") }

  const del = (id) => {
    indicateLoading();
    fetch(url + id, { method: "DELETE" })
      .then(indicateHttp)
      .catch(indicateError)
      .finally(readAll);
  };

  useEffect(() => readAll(), []); // load all on mount
  return [state.notes, state.error, state.isLoading, { create, readAll, update, del }];
}