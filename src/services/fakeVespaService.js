import * as modelliAPI from "./fakeModelService";

const vespe = [
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    modello: {
      _id: "5b21ca3eeb7f6fbccd471818",
      nome: "Piaggio Vespa Granturismo 200",
      cilindrata: 200,
    },
    km: 23000,
    tariffe: 45,
  },
  {
    _id: "5b21ca194b7f6fbccd471816",
    modello: {
      _id: "5b21ca3eeb7f6fbccd471818",
      nome: "Piaggio Vespa Granturismo 200",
      cilindrata: 200,
    },
    km: 12500,
    tariffe: 55,
    mipiace: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    modello: {
      _id: "5b21ca3eeb7f6fbccd471814",
      nome: "Piaggio Vespa PX 125",
      cilindrata: 125,
    },
    km: 1,
    tariffe: 70,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    modello: {
      _id: "5b21ca3eeb7f6fbccd471820",
      nome: "Noleggio Vespa 50",
      cilindrata: 50,
    },
    km: 6754,
    tariffe: 50,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    modello: {
      _id: "5b21ca57eb7f6fbccd47182a",
      nome: "Vespa Sprint 125 3V Sport",
      cilindrata: 124,
    },
    km: 0,
    tariffe: 85,
    mipiace: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    modello: {
      _id: "5b21ca3eeb7f6fbccd471818",
      nome: "Piaggio Vespa Granturismo 200",
      cilindrata: 200,
    },
    km: 2000,
    tariffe: 50,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    modello: {
      _id: "5b21ca3eeb7f6fbccd471820",
      nome: "Noleggio Vespa 50",
      cilindrata: 50,
    },
    km: 7000,
    tariffe: 55,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    modello: {
      _id: "5b21ca57eb7f6fbccd47182a",
      nome: "Vespa Sprint 125 3V Sport",
      cilindrata: 124,
    },
    km: 3205,
    tariffe: 75,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    modello: {
      _id: "5b21ca3eeb7f6fbccd471818",
      nome: "Piaggio Vespa Granturismo 200",
      cilindrata: 200,
    },
    km: 500,
    tariffe: 70,
  },
];

export function getVespe() {
  return vespe;
}

export function getVespa(id) {
  return vespe.find(v => v._id === id);
}

export function saveVespa(vespa) {
  let vespaInDb = vespe.find(v => v._id === vespa._id) || {};
  vespaInDb.km = vespa.km;
  vespaInDb.modello = modelliAPI.modelli.find(m => m._id === vespa.modelloId);
  vespaInDb.tariffe = vespa.tariffe;

  if (!vespaInDb._id) {
    vespaInDb._id = Date.now();
    vespe.push(vespaInDb);
  }

  return vespaInDb;
}

export function deleteVespa(id) {
  let vespaInDb = vespe.find(v => v._id === id);
  vespe.splice(vespe.indexOf(vespaInDb), 1);
  return vespaInDb;
}
