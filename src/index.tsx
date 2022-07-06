import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { DefaultContextProvider } from "./contexts/DefaultContext";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "./contexts/AuthContext";
import { createClient } from "@supabase/supabase-js";
import { Provider } from "react-supabase";

const client = createClient(
  "https://hawphvafdddzppaodijn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd3BodmFmZGRkenBwYW9kaWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUxMzQxNTksImV4cCI6MTk3MDcxMDE1OX0.zwb1Ner93QxQv_SBoyfYm2YEHywnoBaCzE1zVEYb8yQ",
  { persistSession: true, autoRefreshToken: true, localStorage }
);

const container = document.getElementById("root");
container &&
  createRoot(container).render(
    <Provider value={client}>
      <AuthProvider>
        <DefaultContextProvider>
          <App />
        </DefaultContextProvider>
      </AuthProvider>
    </Provider>
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
