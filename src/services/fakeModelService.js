export const modelli = [
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    nome: "Piaggio Vespa Granturismo 200",
    cilindrata: 200,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    nome: "Piaggio Vespa PX 125",
    cilindrata: 125,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    nome: "Noleggio Vespa 50",
    cilindrata: 50,
  },
  {
    _id: "5b21ca57eb7f6fbccd47182a",
    nome: "Vespa Sprint 125 3V Sport",
    cilindrata: 124,
  },
];

export function getModelli() {
  return modelli.filter(m => m);
}
