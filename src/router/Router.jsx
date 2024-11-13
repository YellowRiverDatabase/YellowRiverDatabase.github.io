import { Route, Routes } from "react-router";
import { Home } from "../pages/Home";
import { MkDownTemplate } from "../pages/essays/MkDownTemplate";
import { Contributors } from "../pages/essays/Contributors";
import { Page404 } from "../pages/Page404";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/db-history"
        element={
          <MkDownTemplate
            url={
              "https://raw.githubusercontent.com/YellowRiverDatabase/Documentation/refs/heads/main/database-history.md"
            }
          />
        }
      />
      <Route
        path="/db-description"
        element={
          <MkDownTemplate
            url={
              "https://raw.githubusercontent.com/YellowRiverDatabase/Documentation/refs/heads/main/table-descriptions.md"
            }
          />
        }
      />
      <Route
        path="/how-to-build"
        element={
          <MkDownTemplate
            url={
              "https://raw.githubusercontent.com/YellowRiverDatabase/Documentation/refs/heads/main/how-to-build.md"
            }
          />
        }
      />
      <Route path="/about-us" element={<Contributors />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
