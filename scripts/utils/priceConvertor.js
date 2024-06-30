export function priceToDecmo(priceInCents) {
  return (Math.round(priceInCents) / 100).toFixed(2);
}
