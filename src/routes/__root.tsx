import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { cardQueries } from "../api/queries";
import { FavoritesCount } from "../components/FavoritesCount";
import { Summary } from "../components/Summary";
import { collectionValue, formatPrice } from "../domain/card";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: () => <p className="hint">Page introuvable.</p>,
});

function RootLayout() {
  const { data: cards = [] } = useQuery(cardQueries.list());
  useDocumentTitle(`Ma collection (${formatPrice(collectionValue(cards))})`);

  return (
    <main className="app">
      <header className="app-header">
        <h1><Link to="/">Ma collection TCG</Link></h1>
        <Summary cards={cards} />
        <FavoritesCount />
      </header>

      <nav className="nav">
        <Link to="/" activeOptions={{ exact: true }}>Collection</Link>
        <Link to="/favorites">Favoris</Link>
        <Link to="/cards/new">Ajouter une carte</Link>
      </nav>

      <Outlet />
      <TanStackRouterDevtools />
    </main>
  );
}
