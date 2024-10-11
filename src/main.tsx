import { createRoot } from "react-dom/client";
import App from "./pages/Recipes/App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import Loading from "./components/Loading/Loading.tsx";
import { Route, Routes } from "react-router-dom";
import RecipeInfo from "./pages/RecipeInfo/RecipeInfo.tsx";
import { BrowserRouter } from "react-router-dom";
import Books from "./pages/Books/Books.tsx";
import BookInfo from "./pages/BookInfo/BookInfo.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <App />
              </Suspense>
            }
          />
          <Route
            path="/recipes"
            element={
              <Suspense fallback={<Loading />}>
                <App />
              </Suspense>
            }
          />
          <Route path="/recipes/:id" element={<RecipeInfo />} />
          <Route path="/books/:id" element={<BookInfo />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
