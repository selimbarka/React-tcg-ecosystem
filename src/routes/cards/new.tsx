import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAddCard } from "../../api/mutations";
import { AddCardForm } from "../../components/AddCardForm";
import { Panel } from "../../components/Panel";

export const Route = createFileRoute("/cards/new")({
  component: NewCardPage,
});

function NewCardPage() {
  const addCard = useAddCard();
  const navigate = useNavigate();

  return (
    <Panel title="Ajouter une carte">
      <AddCardForm
        onAdd={(card) =>
          addCard.mutate(card, {
            onSuccess: (created) =>
              navigate({ to: "/cards/$cardId", params: { cardId: created.id } }),
          })
        }
      />
      {addCard.isError && <p className="error">L'ajout a échoué : {addCard.error.message}</p>}
    </Panel>
  );
}
