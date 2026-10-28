type QuantityControlProps = {
  /** Nombre d'exemplaires actuel */
  quantity: number;
  /** Appelé avec +1 ou -1 */
  onChange: (delta: number) => void;
};

export function QuantityControl({ quantity, onChange }: QuantityControlProps) {
  return (
    <div className="quantity-control">
      <button type="button" aria-label="Retirer un exemplaire" onClick={() => onChange(-1)} disabled={quantity === 0}>−</button>
      <strong>{quantity}</strong>
      <button type="button" aria-label="Ajouter un exemplaire" onClick={() => onChange(1)}>+</button>
    </div>
  );
}
