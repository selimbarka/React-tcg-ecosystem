import { z } from "zod";
import { CardSchema, type NewCard } from "../domain/card";
import { http } from "./http";

export const fetchCards = () => http("/cards", z.array(CardSchema));

export const fetchCard = (id: string) => http(`/cards/${id}`, CardSchema);

export const createCard = (card: NewCard) =>
  http("/cards", CardSchema, { method: "POST", body: JSON.stringify(card) });

export const updateCard = (id: string, changes: Partial<NewCard>) =>
  http(`/cards/${id}`, CardSchema, { method: "PATCH", body: JSON.stringify(changes) });

export const deleteCard = (id: string) => http(`/cards/${id}`, z.unknown(), { method: "DELETE" });
