import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/Landing/LandingPage";
import { SearchResultPage } from "./pages/SearchResult/SearchResultPage";

export const Path = {
  HOME: "/",
  SEARCHRESULT: "/searchresults",
  SEARCHLOG: "/searchlog",
};

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/searchresults" element={<SearchResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export { Router };
